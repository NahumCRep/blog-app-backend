import { Pool } from "pg";

const dbPool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: (process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432)
});

dbPool.on("connect", () => {
    console.log("Database Connection Established!!")
})

export default dbPool;
