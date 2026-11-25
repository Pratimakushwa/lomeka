const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const { cookieName, cookieOptions, getJwtSecret } = require('../config/auth');

async function requireAdmin(req, res, next) {
  const token = req.cookies[cookieName];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please log in.',
    });
  }

  let payload;

  try {
    payload = jwt.verify(token, getJwtSecret(), {
      algorithms: ['HS256'],
      issuer: 'lomeka-backend',
      audience: 'lomeka-admin',
    });
  } catch {
    res.clearCookie(cookieName, cookieOptions);

    return res.status(401).json({
      success: false,
      message: 'Session expired. Please log in again.',
    });
  }

  if (
    typeof payload.sub !== 'string' ||
    !mongoose.isValidObjectId(payload.sub)
  ) {
    return res.status(401).json({
      success: false,
      message: 'Invalid session. Please log in again.',
    });
  }

  try {
    const admin = await Admin.findById(payload.sub);

    if (!admin || admin.isActive === false) {
      res.clearCookie(cookieName, cookieOptions);

      return res.status(401).json({
        success: false,
        message: 'Please log in again.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
}

function requireSuperAdmin(req, res, next) {
  if (req.admin?.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: 'Only a superadmin can perform this action.',
    });
  }

  next();
}

module.exports = {
  requireAdmin,
  requireSuperAdmin,
};
