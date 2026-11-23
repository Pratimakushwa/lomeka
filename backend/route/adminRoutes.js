import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'lomeka_super_secret_key_change_me';

// Helper: Agar DB mein ek bhi admin nahi hai, toh .env se pehla Super Admin banaye
async function ensureInitialAdmin() {
  const count = await Admin.countDocuments();
  if (count > 0) return;

  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD;

  if (envEmail && envPassword) {
    const passwordHash = await bcrypt.hash(envPassword, 10);
    await Admin.create({
      name: 'Owner Admin',
      email: envEmail,
      passwordHash,
      role: 'superadmin',
      isActive: true,
    });
  }
}

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    await ensureInitialAdmin();

    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password are required.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || !admin.isActive) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.cookie('admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: err.message || 'Login failed.' });
  }
});

// GET /api/admin/me
router.get('/me', requireAdmin, (req, res) => {
  return res.json({
    success: true,
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
});

// POST /api/admin/logout
router.post('/logout', (_req, res) => {
  res.clearCookie('admin_token');
  return res.json({ success: true });
});

// GET /api/admin/list (Saare admins ki list)
router.get('/list', requireAdmin, async (_req, res) => {
  try {
    const admins = await Admin.find()
      .select('-passwordHash')
      .sort({ createdAt: -1 });
    return res.json({ success: true, admins });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/admin/create (Naya admin account banane ke liye)
router.post('/create', requireAdmin, async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    const role = req.body?.role === 'superadmin' ? 'superadmin' : 'manager';

    if (!name || !email || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Name, valid email, and at least 6-character password required.',
      });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: 'An admin with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const created = await Admin.create({
      name,
      email,
      passwordHash,
      role,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      admin: {
        id: created._id,
        name: created.name,
        email: created.email,
        role: created.role,
        isActive: created.isActive,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/admin/change-password (Apna password badalne ke liye)
router.patch('/change-password', requireAdmin, async (req, res) => {
  try {
    const currentPassword = String(req.body?.currentPassword || '');
    const newPassword = String(req.body?.newPassword || '');

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters.',
      });
    }

    const admin = await Admin.findById(req.admin._id);
    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Current password is incorrect.' });
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    await admin.save();

    return res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/:id (Kisi dusre admin ko hatane ke liye)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    if (String(req.admin._id) === String(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: 'You cannot delete your own account.' });
    }

    await Admin.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;