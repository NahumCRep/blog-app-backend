import { TTablesValidNames } from "../../types/db.types";
import dbPool from "../db";

export const createUpdateTrigger = async (tableName: TTablesValidNames) => {
    const createTriggerQuery = `
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updatedAt = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
    `;
    
    await dbPool.query(createTriggerQuery);
    console.log("Trigger 'set_updated_at' creado.");
};
