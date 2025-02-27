// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import { IUser } from '../types/auth-types';

// Función para generar el token JWT
const generateToken = (user: IUser) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET: not defined');
    
    return jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
};

module.exports = {
    generateToken
};