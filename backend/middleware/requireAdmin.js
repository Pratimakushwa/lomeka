import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'lomeka_super_secret_key_change_me';

export async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.admin_token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not logged in.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-passwordHash');

    if (!admin || !admin.isActive) {
      return res
        .status(401)
        .json({ success: false, message: 'Admin account inactive or not found.' });
    }

    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired session.' });
  }
}