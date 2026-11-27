// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcryptjs');
// const crypto = require('crypto');
// const path = require('path');

// const createProductRouter = require('./route/productRoutes');
// const createAdminRouter = require('./route/adminRoutes');
// const { requireAdmin } = require('./middleware/requireAdmin');
// const createInitialAdmin = require('./services/bootstrapAdmin');
// const { getJwtSecret } = require('./config/auth');

// require('dotenv').config({
//   path: path.join(__dirname, '.env'),
// });

// const app = express();

// const port = Number(process.env.PORT || 5000);
// const host = process.env.HOST || (process.env.NODE_ENV === 'production' ? '127.0.0.1' : '0.0.0.0');
// const allowedOrigins = (
//   process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174'
// )
//   .split(',')
//   .map((origin) => origin.trim())
//   .filter(Boolean);

// app.disable('x-powered-by');

// // Required behind Nginx/Caddy so rate-limit and secure cookies see real client IPs.
// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1);
// }

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error('Not allowed by CORS'));
//     },
//     credentials: true,
//   }),
// );

// app.use(express.json({ limit: '25mb' }));
// app.use(express.urlencoded({ extended: true, limit: '25mb' }));
// app.use(cookieParser());

// app.get('/api/health', (req, res) => {
//   const connected = mongoose.connection.readyState === 1;

//   res.status(connected ? 200 : 503).json({
//     success: connected,
//     message: connected
//       ? 'LOMEKA backend and MongoDB connected successfully.'
//       : 'MongoDB connection unavailable.',
//   });
// });

// app.use('/api/admin', (req, res, next) => {
//   res.set('Cache-Control', 'no-store');

//   const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
//   const origin = req.get('origin');

//   if (
//     !safeMethods.includes(req.method) &&
//     origin &&
//     !allowedOrigins.includes(origin)
//   ) {
//     return res.status(403).json({
//       success: false,
//       message: 'Request origin is not allowed.',
//     });
//   }

//   next();
// });

// const dummyPasswordHashRef = { value: '' };

// app.use('/api/products', createProductRouter(requireAdmin));
// app.use('/api/admin', createAdminRouter(dummyPasswordHashRef));

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'API route not found.',
//   });
// });

// app.use((error, req, res, next) => {
//   if (res.headersSent) return next(error);

//   console.error('API error:', error.name);

//   const rawStatus = error.status || error.statusCode;
//   const status = [400, 413].includes(rawStatus) ? rawStatus : 500;

//   const messages = {
//     400: 'Invalid request data.',
//     413: 'Request is too large.',
//     500: 'Something went wrong. Please try again.',
//   };

//   res.status(status).json({
//     success: false,
//     message: messages[status],
//   });
// });

// async function startServer() {
//   if (!process.env.MONGODB_URI) {
//     console.error('Add MONGODB_URI to backend/.env.');
//     process.exitCode = 1;
//     return;
//   }

//   const jwtSecret = getJwtSecret();

//   if (jwtSecret.length < 48 || jwtSecret === 'YOUR_GENERATED_SECRET_HERE') {
//     console.error('Add the generated JWT_SECRET to backend/.env.');
//     process.exitCode = 1;
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       serverSelectionTimeoutMS: 10000,
//       family: 4,
//     });

//     console.log('MongoDB connected successfully.');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.name);
//     process.exitCode = 1;
//     return;
//   }

//   try {
//     await createInitialAdmin();

//     dummyPasswordHashRef.value = await bcrypt.hash(
//       crypto.randomBytes(32).toString('hex'),
//       12,
//     );
//   } catch (error) {
//     console.error('Admin setup failed:', error.message);
//     await mongoose.disconnect();
//     process.exitCode = 1;
//     return;
//   }

//   const server = app.listen(port, host, () => {
//     console.log(`Backend running on http://${host}:${port}`);
//   });

//   server.on('error', async (error) => {
//     console.error('Server start error:', error.code);
//     await mongoose.disconnect();
//     process.exitCode = 1;
//   });

//   let stopping = false;

//   function shutdown() {
//     if (stopping) return;
//     stopping = true;

//     const timeout = setTimeout(() => process.exit(1), 10000);
//     timeout.unref();

//     server.close(async () => {
//       await mongoose.disconnect();
//       clearTimeout(timeout);
//       process.exit(0);
//     });
//   }

//   process.on('SIGINT', shutdown);
//   process.on('SIGTERM', shutdown);
// }

// startServer();
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const createProductRouter = require('./route/productRoutes');
const createAdminRouter = require('./route/adminRoutes');
const { requireAdmin } = require('./middleware/requireAdmin');
const createInitialAdmin = require('./services/bootstrapAdmin');
const { getJwtSecret } = require('./config/auth');

const app = express();

const port = Number(process.env.PORT || 5000);
const host =
  process.env.HOST || (process.env.NODE_ENV === 'production' ? '127.0.0.1' : '0.0.0.0');
const allowedOrigins = (
  process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');

// Required behind Nginx/Caddy so rate-limit and secure cookies see real client IPs.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

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

const dummyPasswordHashRef = { value: '' };

app.use('/api/products', createProductRouter(requireAdmin));
app.use('/api/admin', createAdminRouter(dummyPasswordHashRef));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.',
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  console.error('API error:', error);

  const rawStatus = error.status || error.statusCode;
  const status = [400, 413].includes(rawStatus) ? rawStatus : 500;

  const messages = {
    400: 'Invalid request data.',
    413: 'Request is too large.',
    500: 'Something went wrong. Please try again.',
  };

  res.status(status).json({
    success: false,
    message:
      process.env.NODE_ENV !== 'production' && error?.message
        ? error.message
        : messages[status],
  });
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.error('Add MONGODB_URI to backend/.env.');
    process.exitCode = 1;
    return;
  }

  const jwtSecret = getJwtSecret();

  if (jwtSecret.length < 48 || jwtSecret === 'YOUR_GENERATED_SECRET_HERE') {
    console.error('Add the generated JWT_SECRET to backend/.env.');
    process.exitCode = 1;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exitCode = 1;
    return;
  }

  try {
    await createInitialAdmin();

    dummyPasswordHashRef.value = await bcrypt.hash(
      crypto.randomBytes(32).toString('hex'),
      12,
    );
  } catch (error) {
    console.error('Admin setup failed:', error);
    await mongoose.disconnect();
    process.exitCode = 1;
    return;
  }

  const server = app.listen(port, host, () => {
    console.log(`Backend running on http://${host}:${port}`);
  });

  server.on('error', async (error) => {
    console.error('Server start error:', error);
    await mongoose.disconnect();
    process.exitCode = 1;
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
