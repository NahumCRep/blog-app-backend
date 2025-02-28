import dbPool from "../db";
import { createUpdateTrigger } from "../util/createUpdateTrigger";

const createUsersTable = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, 
      uuid UUID UNIQUE NOT NULL,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100),
      correo VARCHAR(100) UNIQUE NOT NULL,
      role VARCHAR(50),
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
    `;
    
    await dbPool.query(createTableQuery);
    console.log("Tabla 'users' creada o ya existe.");
};


export const runUserMigrations = async () => {
    await createUsersTable();
    await createUpdateTrigger("users");
};

