import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).json({});
  let token = authorization.split(' ')[1];
  try {
    const decode = await jwt.verify(
      token,
      process.env.LOGIN_JWT_TOKEN as string
    );
    req.body = decode;
    next();
  } catch (error: any) {
    res.status(401).json({ status: 401, err: 'Invalid token' });
  }
};
