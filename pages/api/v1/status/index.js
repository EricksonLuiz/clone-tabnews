import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionConsult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionConsult.rows[0].server_version;
  const databaseMaxConnectionsConsult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionValue = databaseMaxConnectionsConsult.rows[0];

  const databaseName = process.env.POSTGRES_DB;

  const databaseOpenedConnectionsConsult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsConsult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionValue,
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
