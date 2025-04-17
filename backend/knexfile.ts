import { type Knex } from "knex";
import { config } from "./src/configs/db_config";

// Base configuration for all environments
const baseKnexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
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
      database: "loginsight_dev",
    },
  },
  testing: {
    ...baseKnexConfig,
    seeds: {
      directory: "./seeds",
    },
    connection: {
      ...(baseKnexConfig.connection as object),
      database: "loginsight_test",
    },
  },
  production: {
    ...baseKnexConfig,
    connection: {
      ...(baseKnexConfig.connection as object),
      database: "loginsight_prod",
    },
  },
};

const environment = process.env.ENVIRONMENT || "development";
const knexConfigForEnv = knexConfig[environment];

if (!knexConfigForEnv) {
  throw new Error(
    `Knex configuration for environment "${environment}" is missing.`
  );
}

export default knexConfigForEnv;
