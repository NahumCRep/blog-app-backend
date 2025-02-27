import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // get token from header 'Authorization'

  if (!token) {
    res.status(401).json({ message: 'Unauthorized access, token not provided' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return; 
    }
    (req as any).user = decoded;
    next();
  });
};

// module.exports = authMiddleware;
export default authMiddleware;