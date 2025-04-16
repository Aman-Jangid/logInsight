import "dotenv/config";

const environment = process.env.ENVIRONMENT || "development";

const databaseName = {
  development: ["loginsight_dev"],
  testing: ["loginsight_test"],
  production: ["loginsight_prod"],
}[environment];

export const config = {
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: databaseName,
  },
};
