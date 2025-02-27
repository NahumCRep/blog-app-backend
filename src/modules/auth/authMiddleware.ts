import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: any, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // get token from header 'Authorization'

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access, token not provided' });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    (req as any).user = decoded;
    next();
  });
};

// module.exports = authMiddleware;
export default authMiddleware;