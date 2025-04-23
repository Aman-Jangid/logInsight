import type { Knex } from "knex";
import { Log } from "../src/models/Log";

export async function seed(knex: Knex): Promise<void> {
  const logs = require("../data/sample/logs.json");

  const users = await knex("users").select("id");

  await knex("logs")
    .del()
    .insert(
      logs.map((log: Log, i: number) => ({
        ...log,
        userId: users[i % users.length].id,
        metadata:
          typeof log.metadata === "string"
            ? JSON.parse(log.metadata)
            : log.metadata,
      }))
    );
}
