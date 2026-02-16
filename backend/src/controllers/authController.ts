import { randomUUID, scryptSync, timingSafeEqual } from 'crypto';
import { Request, Response } from 'express';
import { getDb } from '../db';

type UserDocument = {
  _id: string;
  name: string;
  login: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: Date;
};

type AuthPayload = {
  name?: string;
  login?: string;
  email?: string;
  password?: string;
};

const hashPassword = (password: string, salt: string) =>
  scryptSync(password, salt, 64).toString('hex');

const verifyPassword = (password: string, salt: string, hash: string) => {
  const inputHash = Buffer.from(hashPassword(password, salt), 'hex');
  const savedHash = Buffer.from(hash, 'hex');

  if (inputHash.length !== savedHash.length) {
    return false;
  }

  return timingSafeEqual(inputHash, savedHash);
};

const validateFields = ({ name, login, email, password }: AuthPayload) => {
  if (!name || !login || !email || !password) {
    return 'Все поля (Имя, Логин, Почта, Пароль) обязательны';
  }

  if (password.length < 6) {
    return 'Пароль должен быть не короче 6 символов';
  }

  return null;
};

export const register = async (req: Request, res: Response) => {
  const payload = req.body as AuthPayload;
  const validationError = validateFields(payload);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const usersCollection = getDb().collection<UserDocument>('users');
  const existingUser = await usersCollection.findOne({
    $or: [{ login: payload.login }, { email: payload.email }],
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: 'Пользователь с таким логином или почтой уже существует' });
  }

  const salt = randomUUID();
  const passwordHash = hashPassword(payload.password!, salt);

  const user: UserDocument = {
    _id: randomUUID(),
    name: payload.name!,
    login: payload.login!,
    email: payload.email!,
    passwordHash,
    passwordSalt: salt,
    createdAt: new Date(),
  };

  await usersCollection.insertOne(user);

  return res.status(201).json({
    message: 'Регистрация выполнена успешно',
    user: {
      id: user._id,
      name: user.name,
      login: user.login,
      email: user.email,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const payload = req.body as AuthPayload;
  const validationError = validateFields(payload);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const usersCollection = getDb().collection<UserDocument>('users');
  const user = await usersCollection.findOne({
    login: payload.login,
    email: payload.email,
    name: payload.name,
  });

  if (!user) {
    return res.status(401).json({ message: 'Неверные данные для входа' });
  }

  const isValidPassword = verifyPassword(
    payload.password!,
    user.passwordSalt,
    user.passwordHash,
  );

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Неверные данные для входа' });
  }

  return res.json({
    message: 'Авторизация выполнена успешно',
    user: {
      id: user._id,
      name: user.name,
      login: user.login,
      email: user.email,
    },
  });
};
