const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { rateLimit } = require('express-rate-limit');
const path = require('path');
const createProductRouter = require('./route/productRoutes');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

const app = express();

const port = Number(process.env.PORT || 5000);
const allowedOrigins = (
  process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const jwtSecret = process.env.JWT_SECRET || '';
const isProduction = process.env.NODE_ENV === 'production';

const cookieName = 'lomeka_admin';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  path: '/',
};

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: 'Admin',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['superadmin', 'manager'],
      default: 'manager',
    },
  },
  { timestamps: true },
);

const Admin =
  mongoose.models.Admin || mongoose.model('Admin', adminSchema);

app.disable('x-powered-by');

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    message: connected
      ? 'LOMEKA backend and MongoDB connected successfully.'
      : 'MongoDB connection unavailable.',
  });
});

// Admin responses contain private account information.
app.use('/api/admin', (req, res, next) => {
  res.set('Cache-Control', 'no-store');

  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  const origin = req.get('origin');

  if (
    !safeMethods.includes(req.method) &&
    origin &&
    !allowedOrigins.includes(origin)
  ) {
    return res.status(403).json({
      success: false,
      message: 'Request origin is not allowed.',
    });
  }

  next();
});

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

let dummyPasswordHash;

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
    payload = jwt.verify(token, jwtSecret, {
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

    if (!admin) {
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

app.use('/api/products', createProductRouter(requireAdmin));

app.post('/api/admin/login', loginLimiter, async (req, res, next) => {
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
    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select('+passwordHash');

    const validPassword = await bcrypt.compare(
      password,
      admin?.passwordHash || dummyPasswordHash,
    );

    if (!admin || !validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email or password is incorrect.',
      });
    }

    const token = jwt.sign({}, jwtSecret, {
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

app.get('/api/admin/me', requireAdmin, (req, res) => {
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

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie(cookieName, cookieOptions);

  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
});

app.get('/api/admin/list', requireAdmin, async (req, res, next) => {
  try {
    const admins = await Admin.find()
      .select('name email role createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      admins,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/create', requireAdmin, async (req, res, next) => {
  const { name, email, password, role } = req.body || {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanRole = role === 'superadmin' ? 'superadmin' : 'manager';

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
      role: cleanRole,
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

app.patch('/api/admin/change-password', requireAdmin, async (req, res, next) => {
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
      message: 'New password must be at least 6 characters (max 72 bytes).',
    });
  }

  try {
    const admin = await Admin.findById(req.admin._id).select('+passwordHash');
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
});

app.delete('/api/admin/:id', requireAdmin, async (req, res, next) => {
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
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.',
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  console.error('API error:', error.name);

  const rawStatus = error.status || error.statusCode;
  const status = [400, 413].includes(rawStatus) ? rawStatus : 500;

  const messages = {
    400: 'Invalid request data.',
    413: 'Request is too large.',
    500: 'Something went wrong. Please try again.',
  };

  res.status(status).json({
    success: false,
    message: messages[status],
  });
});

async function createInitialAdmin() {
  await Admin.init();

  const existingAdmin = await Admin.exists({});

  if (existingAdmin) {
    console.log('Admin account is ready.');
    return;
  }

  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || '';

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    password.length < 12 ||
    Buffer.byteLength(password, 'utf8') > 72
  ) {
    throw new Error(
      'Set a valid ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env. Use at least 12 characters and at most 72 UTF-8 bytes for the password.',
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await Admin.updateOne(
      { email },
      {
        $setOnInsert: {
          name: 'Owner Admin',
          email,
          passwordHash,
          role: 'superadmin',
        },
      },
      { upsert: true, runValidators: true },
    );
  } catch (error) {
    if (error.code !== 11000) throw error;
  }

  console.log('Admin account is ready.');
}

async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.error('Add MONGODB_URI to backend/.env.');
    process.exitCode = 1;
    return;
  }

  if (
    jwtSecret.length < 48 ||
    jwtSecret === 'YOUR_GENERATED_SECRET_HERE'
  ) {
    console.error('Add the generated JWT_SECRET to backend/.env.');
    process.exitCode = 1;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.name);
    process.exitCode = 1;
    return;
  }

  try {
    await createInitialAdmin();

    dummyPasswordHash = await bcrypt.hash(
      crypto.randomBytes(32).toString('hex'),
      12,
    );
  } catch (error) {
    console.error('Admin setup failed:', error.message);
    await mongoose.disconnect();
    process.exitCode = 1;
    return;
  }

  const server = app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });

  server.on('error', async (error) => {
    console.error('Server start error:', error.code);
    await mongoose.disconnect();
    process.exitCode = 1;
  });
await mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  family: 4,
});
  let stopping = false;

  function shutdown() {
    if (stopping) return;
    stopping = true;

    const timeout = setTimeout(() => process.exit(1), 10000);
    timeout.unref();

    server.close(async () => {
      await mongoose.disconnect();
      clearTimeout(timeout);
      process.exit(0);
    });
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer();