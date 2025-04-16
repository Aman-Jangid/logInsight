import "dotenv/config";

import * as pgtools from "pgtools";

// Validate required environment variables
const requiredEnvVars = [
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "ENVIRONMENT",
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is not set.`);
  }
});

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
};

const environment = process.env.ENVIRONMENT || "development";

const databaseNames = {
  development: ["loginsight_dev"],
  testing: ["loginsight_test"],
  production: ["loginsight_prod"],
}[environment];

if (!databaseNames) {
  throw new Error(`Unknown environment: ${environment}`);
}

console.log(`Starting database creation for environment: ${environment}`);
console.log(`Host: ${config.host}`);
console.log(`Port: ${config.port}`);
console.log(`User: ${config.user}`);
console.log(`Databases: ${databaseNames.join(", ")}`);

// Create databases
(async () => {
  let hasError = false;

  for (const db_name of databaseNames) {
    try {
      await pgtools.createdb(config, db_name);
      console.log(`Database "${db_name}" created successfully.`);
    } catch (err: any) {
      hasError = true;
      if (err.name === "duplicate_database") {
        console.log(`Database "${db_name}" already exists.`);
      } else {
        console.error(`Error creating database "${db_name}":`, err);
      }
    }
  }

  if (hasError) {
    process.exit(1);
  }
})();
