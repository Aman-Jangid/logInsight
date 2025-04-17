import type { Knex } from "knex";
import { Log } from "../src/models/Log";

export async function seed(knex: Knex): Promise<void> {
  const logs = require("../data/sample/logs.json");

  await knex("logs")
    .del()
    .insert(
      logs.map((log: Log) => ({
        ...log,
        metadata: JSON.stringify(log.metadata),
      }))
    );
}
