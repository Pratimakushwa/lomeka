// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const { rateLimit } = require('express-rate-limit');
// const Admin = require('../models/Admin');
// const {
//   requireAdmin,
//   requireSuperAdmin,
// } = require('../middleware/requireAdmin');
// const {
//   cookieName,
//   cookieOptions,
//   getJwtSecret,
// } = require('../config/auth');

// function createAdminRouter(dummyPasswordHashRef) {
//   const router = express.Router();

//   const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     limit: 10,
//     standardHeaders: 'draft-7',
//     legacyHeaders: false,
//     skipSuccessfulRequests: true,
//     message: {
//       success: false,
//       message: 'Too many login attempts. Please try again later.',
//     },
//   });

//   router.post('/login', loginLimiter, async (req, res, next) => {
//     const { email, password } = req.body || {};

//     if (
//       typeof email !== 'string' ||
//       typeof password !== 'string' ||
//       email.length > 254 ||
//       password.length === 0 ||
//       Buffer.byteLength(password, 'utf8') > 72
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Enter a valid email and password.',
//       });
//     }

//     try {
//       const admin = await Admin.findOne({
//         email: email.trim().toLowerCase(),
//       }).select('+passwordHash');

//       const validPassword = await bcrypt.compare(
//         password,
//         admin?.passwordHash || dummyPasswordHashRef.value,
//       );

//       if (!admin || admin.isActive === false || !validPassword) {
//         return res.status(401).json({
//           success: false,
//           message: 'Email or password is incorrect.',
//         });
//       }

//       const token = jwt.sign({}, getJwtSecret(), {
//         algorithm: 'HS256',
//         subject: String(admin._id),
//         issuer: 'lomeka-backend',
//         audience: 'lomeka-admin',
//         expiresIn: '8h',
//       });

//       res.cookie(cookieName, token, {
//         ...cookieOptions,
//         maxAge: 8 * 60 * 60 * 1000,
//       });

//       res.json({
//         success: true,
//         admin: {
//           id: String(admin._id),
//           name: admin.name || 'Admin',
//           email: admin.email,
//           role: admin.role || 'manager',
//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   });

//   router.get('/me', requireAdmin, (req, res) => {
//     res.json({
//       success: true,
//       admin: {
//         id: String(req.admin._id),
//         name: req.admin.name || 'Admin',
//         email: req.admin.email,
//         role: req.admin.role || 'manager',
//       },
//     });
//   });

//   router.post('/logout', (req, res) => {
//     res.clearCookie(cookieName, cookieOptions);

//     res.json({
//       success: true,
//       message: 'Logged out successfully.',
//     });
//   });

//   router.get('/list', requireAdmin, requireSuperAdmin, async (req, res, next) => {
//     try {
//       const admins = await Admin.find()
//         .select('name email role isActive createdAt')
//         .sort({ createdAt: -1 });

//       res.json({
//         success: true,
//         admins,
//       });
//     } catch (error) {
//       next(error);
//     }
//   });

//   router.post('/create', requireAdmin, async (req, res, next) => {
//     const { name, email, password, role } = req.body || {};
//     const cleanName = typeof name === 'string' ? name.trim() : '';
//     const cleanEmail =
//       typeof email === 'string' ? email.trim().toLowerCase() : '';
//     const requestedRole = role === 'superadmin' ? 'superadmin' : 'manager';

//     if (requestedRole === 'superadmin' && req.admin.role !== 'superadmin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Only a superadmin can create another superadmin.',
//       });
//     }

//     if (
//       !cleanName ||
//       cleanName.length > 80 ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
//       cleanEmail.length > 254 ||
//       typeof password !== 'string' ||
//       password.length < 6 ||
//       Buffer.byteLength(password, 'utf8') > 72
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'Provide a valid name, email, and a password of at least 6 characters (max 72 bytes).',
//       });
//     }

//     try {
//       const exists = await Admin.exists({ email: cleanEmail });
//       if (exists) {
//         return res.status(409).json({
//           success: false,
//           message: 'An admin with this email already exists.',
//         });
//       }

//       const passwordHash = await bcrypt.hash(password, 12);
//       const created = await Admin.create({
//         name: cleanName,
//         email: cleanEmail,
//         passwordHash,
//         role: requestedRole,
//         isActive: true,
//       });

//       res.status(201).json({
//         success: true,
//         admin: {
//           id: String(created._id),
//           name: created.name,
//           email: created.email,
//           role: created.role,
//         },
//       });
//     } catch (error) {
//       if (error.code === 11000) {
//         return res.status(409).json({
//           success: false,
//           message: 'An admin with this email already exists.',
//         });
//       }
//       next(error);
//     }
//   });

//   router.patch(
//     '/change-password',
//     requireAdmin,
//     async (req, res, next) => {
//       const { currentPassword, newPassword } = req.body || {};

//       if (
//         typeof currentPassword !== 'string' ||
//         typeof newPassword !== 'string' ||
//         currentPassword.length === 0 ||
//         newPassword.length < 6 ||
//         Buffer.byteLength(newPassword, 'utf8') > 72
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             'New password must be at least 6 characters (max 72 bytes).',
//         });
//       }

//       try {
//         const admin = await Admin.findById(req.admin._id).select(
//           '+passwordHash',
//         );
//         if (!admin) {
//           return res.status(404).json({
//             success: false,
//             message: 'Admin account not found.',
//           });
//         }

//         const validCurrent = await bcrypt.compare(
//           currentPassword,
//           admin.passwordHash,
//         );
//         if (!validCurrent) {
//           return res.status(401).json({
//             success: false,
//             message: 'Current password is incorrect.',
//           });
//         }

//         admin.passwordHash = await bcrypt.hash(newPassword, 12);
//         await admin.save();

//         res.json({
//           success: true,
//           message: 'Password updated successfully.',
//         });
//       } catch (error) {
//         next(error);
//       }
//     },
//   );

//   router.delete(
//     '/:id',
//     requireAdmin,
//     requireSuperAdmin,
//     async (req, res, next) => {
//       const { id } = req.params;

//       if (!mongoose.isValidObjectId(id)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid admin ID.',
//         });
//       }

//       if (String(req.admin._id) === id) {
//         return res.status(400).json({
//           success: false,
//           message: 'You cannot delete your own account.',
//         });
//       }

//       try {
//         await Admin.findByIdAndDelete(id);
//         res.json({
//           success: true,
//           message: 'Admin removed.',
//         });
//       } catch (error) {
//         next(error);
//       }
//     },
//   );

//   return router;
// }

// module.exports = createAdminRouter;


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { rateLimit } = require('express-rate-limit');
const Admin = require('../models/Admin');
const {
  requireAdmin,
  requireSuperAdmin,
} = require('../middleware/requireAdmin');
const {
  cookieName,
  cookieOptions,
  getJwtSecret,
} = require('../config/auth');

const FALLBACK_DUMMY_HASH = bcrypt.hashSync(
  crypto.randomBytes(24).toString('hex'),
  10,
);

function createAdminRouter(dummyPasswordHashRef = { value: '' }) {
  const router = express.Router();

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: {
      success: false,
      message: 'Too many login attempts. Please try again later.',
    },
  });

  router.post('/login', loginLimiter, async (req, res, next) => {
    const { email, password } = req.body || {};

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      email.length > 254 ||
      password.length === 0 ||
      Buffer.byteLength(password, 'utf8') > 72
    ) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid email and password.',
      });
    }

    try {
      const secret = getJwtSecret();
      if (!secret || secret.length < 16) {
        return res.status(500).json({
          success: false,
          message: 'Server authentication secret is not configured.',
        });
      }

      const admin = await Admin.findOne({
        email: email.trim().toLowerCase(),
      }).select('+passwordHash');

      const hashToCompare =
        admin?.passwordHash ||
        dummyPasswordHashRef?.value ||
        FALLBACK_DUMMY_HASH;

      const validPassword = await bcrypt.compare(password, hashToCompare);

      if (!admin || admin.isActive === false || !validPassword) {
        return res.status(401).json({
          success: false,
          message: 'Email or password is incorrect.',
        });
      }

      const token = jwt.sign({}, secret, {
        algorithm: 'HS256',
        subject: String(admin._id),
        issuer: 'lomeka-backend',
        audience: 'lomeka-admin',
        expiresIn: '8h',
      });

      res.cookie(cookieName, token, {
        ...cookieOptions,
        maxAge: 8 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        admin: {
          id: String(admin._id),
          name: admin.name || 'Admin',
          email: admin.email,
          role: admin.role || 'manager',
        },
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/me', requireAdmin, (req, res) => {
    res.json({
      success: true,
      admin: {
        id: String(req.admin._id),
        name: req.admin.name || 'Admin',
        email: req.admin.email,
        role: req.admin.role || 'manager',
      },
    });
  });

  router.post('/logout', (req, res) => {
    res.clearCookie(cookieName, cookieOptions);

    res.json({
      success: true,
      message: 'Logged out successfully.',
    });
  });

  router.get('/list', requireAdmin, requireSuperAdmin, async (req, res, next) => {
    try {
      const admins = await Admin.find()
        .select('name email role isActive createdAt')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        admins,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/create', requireAdmin, async (req, res, next) => {
    const { name, email, password, role } = req.body || {};
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail =
      typeof email === 'string' ? email.trim().toLowerCase() : '';
    const requestedRole = role === 'superadmin' ? 'superadmin' : 'manager';

    if (requestedRole === 'superadmin' && req.admin.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Only a superadmin can create another superadmin.',
      });
    }

    if (
      !cleanName ||
      cleanName.length > 80 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
      cleanEmail.length > 254 ||
      typeof password !== 'string' ||
      password.length < 6 ||
      Buffer.byteLength(password, 'utf8') > 72
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Provide a valid name, email, and a password of at least 6 characters (max 72 bytes).',
      });
    }

    try {
      const exists = await Admin.exists({ email: cleanEmail });
      if (exists) {
        return res.status(409).json({
          success: false,
          message: 'An admin with this email already exists.',
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const created = await Admin.create({
        name: cleanName,
        email: cleanEmail,
        passwordHash,
        role: requestedRole,
        isActive: true,
      });

      res.status(201).json({
        success: true,
        admin: {
          id: String(created._id),
          name: created.name,
          email: created.email,
          role: created.role,
        },
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'An admin with this email already exists.',
        });
      }
      next(error);
    }
  });

  router.patch(
    '/change-password',
    requireAdmin,
    async (req, res, next) => {
      const { currentPassword, newPassword } = req.body || {};

      if (
        typeof currentPassword !== 'string' ||
        typeof newPassword !== 'string' ||
        currentPassword.length === 0 ||
        newPassword.length < 6 ||
        Buffer.byteLength(newPassword, 'utf8') > 72
      ) {
        return res.status(400).json({
          success: false,
          message:
            'New password must be at least 6 characters (max 72 bytes).',
        });
      }

      try {
        const admin = await Admin.findById(req.admin._id).select(
          '+passwordHash',
        );
        if (!admin) {
          return res.status(404).json({
            success: false,
            message: 'Admin account not found.',
          });
        }

        const validCurrent = await bcrypt.compare(
          currentPassword,
          admin.passwordHash,
        );
        if (!validCurrent) {
          return res.status(401).json({
            success: false,
            message: 'Current password is incorrect.',
          });
        }

        admin.passwordHash = await bcrypt.hash(newPassword, 12);
        await admin.save();

        res.json({
          success: true,
          message: 'Password updated successfully.',
        });
      } catch (error) {
        next(error);
      }
    },
  );

  router.delete(
    '/:id',
    requireAdmin,
    requireSuperAdmin,
    async (req, res, next) => {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid admin ID.',
        });
      }

      if (String(req.admin._id) === id) {
        return res.status(400).json({
          success: false,
          message: 'You cannot delete your own account.',
        });
      }

      try {
        await Admin.findByIdAndDelete(id);
        res.json({
          success: true,
          message: 'Admin removed.',
        });
      } catch (error) {
        next(error);
      }
    },
  );

  return router;
}

module.exports = createAdminRouter;