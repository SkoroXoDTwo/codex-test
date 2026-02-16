import { app } from './app';
import { env } from './config/env';
import { connectToDb } from './db';

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(env.port, () => {
      console.log(`Backend is running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Cannot start backend:', error);
    process.exit(1);
  }
};

void startServer();
