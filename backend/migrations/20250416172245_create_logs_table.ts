import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("logs", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
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
    // soft delete
    table.timestamp("deleted_at").nullable();

    table.index(["userId"], "idx_logs_user");
    table.index(["userId", "timestamp"], "idx_user_timestamp");
    table.index(["level", "source"]);
    table.index(["created_at"]);
  });
}
