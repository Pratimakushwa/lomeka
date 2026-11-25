const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

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
          isActive: true,
        },
      },
      { upsert: true, runValidators: true },
    );
  } catch (error) {
    if (error.code !== 11000) throw error;
  }

  console.log('Admin account is ready.');
}

module.exports = createInitialAdmin;
