export default {
  port: process.env.PORT || 8080,
  ip: process.env.HOST || '0.0.0.0',
  mysql: {
    namedb: process.env.MYSQL_DB || 'coolmatedb',
    port: parseInt(process.env.MYSQL_PORT ?? '3306'),
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Admin@123',
  },
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/post-clean-code'
  },
  redis: {
    uri: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237'
};