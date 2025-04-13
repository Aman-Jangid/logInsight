import { knex, type Knex } from "knex";
import { config } from "./src/configs/db_config";

const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: config.db.host || "localhost",
    port: config.db.port || 5432,
    user: config.db.user || "loginsight",
    password: config.db.password || "loginsight",
    database: config.db.database || "loginsight",
  },
  // useNullAsDefault: true,
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
    extension: "ts",
  },
};

export default knexConfig;
