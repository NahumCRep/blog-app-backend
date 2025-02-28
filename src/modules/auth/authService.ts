import bcrypt from 'bcryptjs';
import dbPool from '../../database/db'; 
import AppError from '../../utils/appError';
import { IRegisterData } from '../../types/auth-types';
import { v4 as uuidv4 } from 'uuid';
import { statusCodes } from '../../constants/statusCodes';
import { generateToken } from '../../utils/tokenUtils';

const registerUser = async (newUser: IRegisterData) => {
  try {
    const { firstName, lastName, email, password, role } = newUser;
    const uuid = uuidv4();

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (uuid, firstName, lastName, correo, role, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, uuid, firstName, lastName, correo, role, createdAt, updatedAt;
    `;
    const values = [uuid, firstName, lastName, email, role, hashedPassword];

    const result = await dbPool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new AppError('User registration failed', statusCodes.BAD_REQUEST);
  }
};

const loginUser = async (email: string, password: string) => {
    try {
      const result = await dbPool.query('SELECT * FROM users WHERE correo = $1', [email]);
  
      if (result.rows.length === 0) {
        throw new AppError('Invalid email or password', statusCodes.NOT_FOUND);
      }
  
      const user = result.rows[0];
  
      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        throw new AppError('Invalid email or password', statusCodes.NOT_FOUND);
      }
  
      const token = generateToken({ id: user.id, email: user.email, role: user.role  });
  
      return {
        user: {
          uuid: user.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.correo,
          role: user.role
        },
        token
      };
    } catch (error: any) {
      throw new AppError(error.message || 'Error logging in', statusCodes.BAD_REQUEST);
    }
  };

export {
    registerUser,
    loginUser
}


