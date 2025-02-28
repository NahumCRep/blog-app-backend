import dbPool from "../db";
import { runUserMigrations } from "./userMigrations";

const runMigrations = async () => {
    try {
        await runUserMigrations();
    } catch (err) {
        console.error("Error al ejecutar migraciones: ", err);
    }
};

export default runMigrations;