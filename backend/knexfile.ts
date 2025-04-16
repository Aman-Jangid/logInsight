import { knex, type Knex } from "knex";
import { config } from "./src/configs/db_config";

// Base configuration for all environments
const baseKnexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  } as Knex.StaticConnectionConfig,
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
    extension: "ts",
  },
};

// Environment-specific configurations
const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    ...baseKnexConfig,
    connection: {
      ...(baseKnexConfig.connection as object),
      database: "loginsight_dev", // database for development
    },
  },
  testing: {
    ...baseKnexConfig,
    connection: {
      ...(baseKnexConfig.connection as object),
      database: "loginsight_test", // database for testing
    },
  },
  production: {
    ...baseKnexConfig,
    connection: {
      ...(baseKnexConfig.connection as object),
      database: "loginsight_prod", // database for production
    },
  },
};

export default knexConfig;
