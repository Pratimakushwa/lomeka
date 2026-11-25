const isProduction = process.env.NODE_ENV === 'production';

const cookieName = 'lomeka_admin';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  path: '/',
};

function getJwtSecret() {
  return process.env.JWT_SECRET || '';
}

module.exports = {
  cookieName,
  cookieOptions,
  getJwtSecret,
  isProduction,
};
