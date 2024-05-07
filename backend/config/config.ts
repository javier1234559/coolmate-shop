import dotenv from "dotenv";
dotenv.config();

export default {
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'localhost',
  mysql: {
    namedb: process.env.MYSQL_DB || 'coolmatedb',
    port: parseInt(process.env.MYSQL_PORT ?? '3306'),
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Admin@123',
  },
  redis: {
    uri: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  jwtSecret: process.env.JWT_SECRET || 'secret',
  refreshSecrect: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
  googleClientID: process.env.GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID',
  cloudinary: {
    cloud_name: process.env.CLOUDYNARY_NAME || 'YOUR_CLOUD',
    api_key: process.env.CLOUDYNARY_API_KEY,
    api_secret: process.env.CLOUDYNARY_API_SECRET,
  }
};