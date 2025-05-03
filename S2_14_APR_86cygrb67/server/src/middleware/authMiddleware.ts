import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types';
console.log('first')

export interface AuthRequest extends Request {
  user?: UserPayload;
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log(req.headers)
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log(token)
    return res.status(401).json({ message: 'Not token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};