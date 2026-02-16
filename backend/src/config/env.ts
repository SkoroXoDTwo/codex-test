import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongoUri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/test-case-service',
  mongoDbName: process.env.MONGO_DB_NAME ?? 'test-case-service',
};
