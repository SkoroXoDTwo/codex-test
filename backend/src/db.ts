import { MongoClient } from 'mongodb';
import { env } from './config/env';

const client = new MongoClient(env.mongoUri);

export const connectToDb = async () => {
  await client.connect();
  return client.db(env.mongoDbName);
};

export const getDb = () => client.db(env.mongoDbName);
