import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("log_analysis", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("log_id")
      .notNullable()
      .references("id")
      .inTable("logs")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("summary").notNullable();
    table.text("cause").notNullable();
    table.text("solution").notNullable();
    table.string("model_name").notNullable();
    table.jsonb("raw_response").notNullable().defaultTo({});
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();

    table.index(["log_id"]);
    table.index(["created_at"]);
    table.index(["log_id", "created_at"], "idx_log_id_created_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("log_analysis");
}
