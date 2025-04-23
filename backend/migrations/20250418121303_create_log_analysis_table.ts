import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("log_analysis", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.jsonb("log_ids").notNullable(); // store multiple log IDs
    table.text("query_used").notNullable();
    table.text("summary").notNullable();
    table.string("application").notNullable();
    table.text("cause").notNullable();
    table.text("solution").notNullable();
    table.text("patterns").notNullable();
    table.string("model_name").notNullable();
    table
      .jsonb("raw_response")
      .notNullable()
      .defaultTo(knex.raw("'{}'::jsonb"));
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();

    table.index(["log_ids"], "idx_log_ids");
    table.index(["created_at"]);
    table.index(["log_ids", "created_at"], "idx_log_ids_created_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("log_analysis");
}
