import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .dropTableIfExists("users") // just for development
    .createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password_hash").notNullable();
      table.boolean("is_verified").defaultTo(false);
      table.timestamp("verified_at").nullable();
      table.string("verification_token").nullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
