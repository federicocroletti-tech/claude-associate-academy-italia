import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { app } from "./server.js";

test("the health endpoint reports the running Academy service", async (context) => {
  const server = app.listen(0);
  await once(server, "listening");
  context.after(
    () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  );

  const address = server.address();
  assert.ok(address && typeof address !== "string");

  const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok",
    app: "claude-associate-academy-italia",
  });

  const progressResponse = await fetch(
    `http://127.0.0.1:${address.port}/api/progress`,
  );
  assert.equal(progressResponse.status, 404);
});
