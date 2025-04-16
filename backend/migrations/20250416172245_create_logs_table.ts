import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("logs", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.timestamp("timestamp").notNullable();
    table.string("level").notNullable();
    table.string("message").notNullable();
    table.string("source").notNullable();
    table.string("type").notNullable();
    table.json("metadata").nullable();
    table.string("environment").notNullable();
    table.uuid("userId").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("logs");
}
