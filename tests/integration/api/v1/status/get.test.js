test("GET to /api/v1/status retornando 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpadatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpadatedAt);
  expect(responseBody.dependecies.database.version).toEqual(16.0);
  expect(responseBody.dependecies.database.max_connections);
  expect(responseBody.dependecies.database.opened_connections).toEqual(1);
});
