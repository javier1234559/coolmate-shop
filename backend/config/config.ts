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
  googleClientID: process.env.GOOGLE_CLIENT_ID!,
  vnpay: {
    vnp_TmnCode: process.env.VN_PAY_TMN_CODE,
    vnp_HashSecret: process.env.VN_PAY_HASH_SECRET,
    vnpUrl: process.env.VN_PAY_URL,
    returnUrl: process.env.VN_PAY_RETURN_URL
  },
  ngrok_URL: process.env.NGROK_URL || 'https://emerging-lark-amazingly.ngrok-free.app',
  zalopay: {
    appid: process.env.ZALO_APP_ID,
    key1: process.env.ZALO_KEY1!,
    key2: process.env.ZALO_KEY2!,
    returnUrl: process.env.ZALO_RETURN_URL,
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
  },
  momo: {
    accessKey: process.env.MOMO_ACCESS_KEY!,
    secretKey: process.env.MOMO_SECRET_KEY!,
    partnerCode: 'MOMO',
    redirectUrl: process.env.MOMO_REDIRECT_URL,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDYNARY_NAME,
    api_key: process.env.CLOUDYNARY_API_KEY,
    api_secret: process.env.CLOUDYNARY_API_SECRET,
  }
};