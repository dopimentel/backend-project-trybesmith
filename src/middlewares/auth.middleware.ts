import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwt.util';
import UserModel from '../database/models/user.model';

const extractToken = (bearerToken: string) => bearerToken.split(' ')[1];

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const token = extractToken(req.headers.authorization);
    const decoded = jwtUtil.verify(token);
    const user = await UserModel.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default authMiddleware;