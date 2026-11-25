module.exports = {
  apps: [
    {
      name: 'lomeka-api',
      cwd: '/var/www/projects/lomeka/backend',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 9090,
      },
      max_memory_restart: '400M',
      time: true,
    },
  ],
};
