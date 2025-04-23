import { Knex } from "knex";
import * as bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  const data: Object[] = [];
  for (let i = 0; i < 15; i++) {
    const random = Math.random().toString(36).substring(2, 10);
    const passwordHash = await bcrypt.hash("password123", 10); // Default password for all

    data.push({
      id: crypto.randomUUID(),
      name: `random_${random}`,
      email: `random_${random}@email.com`,
      password_hash: passwordHash,
      is_verified: false,
      verified_at: null,
      verification_token: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  await knex("users").insert(data);
}
