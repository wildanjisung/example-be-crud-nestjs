export default () => ({
  env: process.env.APP_ENV,
  server: {
    protocol: process.env.SERVER_PROTOCOL || 'http',
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT, 10) || 3001,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  }
});
