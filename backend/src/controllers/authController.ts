import { Request, Response } from 'express';

export const login = (_req: Request, res: Response) => {
  res.status(501).json({ message: 'Login is not implemented yet' });
};

export const register = (_req: Request, res: Response) => {
  res.status(501).json({ message: 'Registration is not implemented yet' });
};
