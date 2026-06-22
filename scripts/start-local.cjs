const path = require('path');
const { startServer } = require('next/dist/server/lib/start-server');

startServer({
  dir: path.resolve(__dirname, '..'),
  port: 3000,
  hostname: '127.0.0.1',
  isDev: true,
  allowRetry: false,
  keepAliveTimeout: 5000,
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
