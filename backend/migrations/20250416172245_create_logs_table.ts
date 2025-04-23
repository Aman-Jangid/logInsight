import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    trx.schema.dropTableIfExists("logs"); // just for development
    await ensureExtensions(trx);
    await verifyUsersTable(trx);
    await createLogsTable(trx);
    await convertToHypertable(trx);
    await addVectorColumnAndIndex(trx);
    await addPartialIndexForSoftDeletes(trx);
  });
}

// Helper functions

// ensure required extensions
async function ensureExtensions(trx: Knex.Transaction): Promise<void> {
  await trx.raw("CREATE EXTENSION IF NOT EXISTS vector;");
  await trx.raw("CREATE EXTENSION IF NOT EXISTS timescaledb;");
}
// verify the existence of the users table
async function verifyUsersTable(trx: Knex.Transaction): Promise<void> {
  const hasUsersTable = await trx.schema.hasTable("users");
  if (!hasUsersTable) {
    throw new Error("Users table does not exist");
  }
}
// create the logs table
async function createLogsTable(trx: Knex.Transaction): Promise<void> {
  await trx.schema.createTable("logs", (table) => {
    table.uuid("id").primary().defaultTo(trx.raw("gen_random_uuid()"));
    table.timestamp("timestamp").notNullable();
    table
      .enum("level", ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"])
      .notNullable();
    table.string("message").notNullable();
    table
      .enum("source", ["SERVER", "APPLICATION", "AUTH", "NETWORK", "DATABASE"])
      .notNullable();
    table.string("type").notNullable();
    table.jsonb("metadata").nullable();
    table.string("environment").notNullable();
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();

    table.index(["userId"], "idx_logs_user");
    table.index(["userId", "timestamp"], "idx_user_timestamp");
    table.index(["level", "source"]);
    table.index(["created_at"]);
  });
}
// convert the logs table to a hypertable
async function convertToHypertable(trx: Knex.Transaction): Promise<void> {
  await trx.raw(
    "SELECT create_hypertable('logs', 'timestamp', chunk_time_interval => INTERVAL '1 day');"
  );
}
// add a vector column and create a vector index
async function addVectorColumnAndIndex(trx: Knex.Transaction): Promise<void> {
  await trx.schema.alterTable("logs", (table) => {
    table.specificType("vector", "vector(1536)").nullable();
  });

  const isProduction = process.env.NODE_ENV === "production";
  const lists = isProduction ? 200 : 50;
  await trx.raw(
    `CREATE INDEX ON logs USING ivfflat (vector) WITH (lists = ${lists});`
  );
}
// add a partial index for soft deletes
async function addPartialIndexForSoftDeletes(
  trx: Knex.Transaction
): Promise<void> {
  await trx.raw(
    "CREATE INDEX idx_logs_deleted_at ON logs (deleted_at) WHERE deleted_at IS NOT NULL;"
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    await trx.raw("DROP INDEX IF EXISTS logs_vector_idx;");
    await trx.raw("DROP INDEX IF EXISTS idx_logs_deleted_at;");
    await trx.schema.alterTable("logs", (table) => {
      table.dropColumn("vector");
    });
    await trx.schema.dropTableIfExists("logs");
  });
}
