import knex from "knex";
import knexConfig from "../../knexfile";

const knexInstance = knex(knexConfig);

export interface Log {
  id?: string;
  timestamp: string;
  level: string;
  message: string;
  source: string;
  type: string;
  metadata: string;
  environment: string;
  userId: string;
}

export const LogModel = {
  async store(logData: Log): Promise<Log> {
    const {
      timestamp,
      level,
      message,
      source,
      type,
      metadata,
      environment,
      userId,
    } = logData;

    if (!timestamp || !level || !message || !source || !type || !userId) {
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
          metadata: JSON.stringify(metadata),
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
};
