import knex, { Knex } from "knex";
import knexConfigForEnv from "../../knexfile";

const knexInstance: Knex = knex(knexConfigForEnv);

const patterns = [
  { name: "Timeout Errors", regex: /timeout/i },
  { name: "Database Errors", regex: /database/i },
  {
    name: "High Response Time",
    condition: (log: any) => log.metadata?.response_time_ms > 1000,
  },
];

function matchPatterns(logs: any[]) {
  return logs.map((log) => {
    const matches = patterns
      .filter((pattern) =>
        pattern.regex
          ? pattern.regex.test(log.message)
          : pattern.condition && pattern.condition(log)
      )
      .map((pattern) => pattern.name);

    return { ...log, matches };
  });
}

export const filterLogs = async () => {
  const logs = await knexInstance("logs")
    .select("*")
    .where("timestamp", ">=", knexInstance.raw("NOW() - INTERVAL '4 year'"))
    .andWhere("level", "IN", ["ERROR", "WARN"])
    .returning("*");

  const analysis = matchPatterns(logs).map((log) => ({
    log_ids: [log.id],
    query_used: "SELECT * FROM logs WHERE ...",
    summary: `Pattern(s) matched: ${log.matches.join(", ")}`,
    application: log.source,
    cause: "Investigate the root cause based on the pattern.",
    solution: "Apply fixes based on the identified issue.",
    patterns: log.matches,
    model_name: "Pattern Matching v1",
    raw_response: log,
  }));

  console.log(analysis);
};
