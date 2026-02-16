import { Router } from 'express';
import { authRoutes } from './authRoutes';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

apiRouter.use('/auth', authRoutes);
