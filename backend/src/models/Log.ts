import knex from "knex";
import knexConfig from "../../knexfile";

const knexInstance = knex(knexConfig);

export interface LogDTO {
  timestamp: string;
  level: string;
  message: string;
  source: string;
  type: string;
  metadata: string;
  environment: string;
}

export interface Log extends LogDTO {
  id: string;
  userId: string;
}

export const LogModel = {
  async store(logData: LogDTO, userId: string): Promise<Log> {
    const { timestamp, level, message, source, type, metadata, environment } =
      logData;

    if (!timestamp || !level || !message || !source || !type) {
      throw new Error("Missing required fields for log entry");
    }

    try {
      const [log] = await knexInstance<Log>("logs")
        .insert({
          timestamp,
          level,
          message,
          source,
          type,
          metadata,
          environment,
          userId,
        })
        .returning("*");

      return log;
    } catch (error) {
      console.error("Error storing log:", error);
      throw new Error("Failed to store log");
    }
  },
  async fetchAll(): Promise<Log[]> {
    try {
      const logs = await knexInstance<Log>("logs")
        .select("*")
        .whereNull("deleted_at")
        .orderBy("created_at");
      return logs;
    } catch (error) {
      console.error("Error fetching logs: ", error);
    }
  },
  async fetchById(id: string): Promise<Log> {
    try {
      const log = await knexInstance<Log>("logs")
        .where({ id })
        .whereNull("deleted_at")
        .first();
      return log;
    } catch (error) {
      console.error(`Error fetching log with id ${id} : `, error);
    }
  },
  async deleteById(id: string): Promise<boolean> {
    try {
      const res = await knexInstance<Log>("logs")
        .where({ id })
        .update("deleted_at", Date.now());
      return res > 0;
    } catch (error) {
      console.error(`Error deleting log with id ${id} :`, error);
      return false;
    }
  },
};
