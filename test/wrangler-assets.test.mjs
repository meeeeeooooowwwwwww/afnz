import test from "node:test";
import assert from "node:assert/strict";
import { unstable_startWorker } from "wrangler";

let worker;

test.before(async () => {
  worker = await unstable_startWorker({ config: "wrangler.toml" });
});

test.after(async () => {
  if (worker) await worker.dispose();
});

for (const [route, marker] of [
  ["/", "Business development for companies adapting to AI and change."],
  ["/about", "Commercial development built around real operating work."],
  ["/services", "Business / Commercial Development"],
  ["/services/business-commercial-development", "Turn a messy commercial problem into a clear development programme."]
]) {
  test("real Wrangler asset routing serves "+route+" without redirect", async () => {
    const response = await worker.fetch("http://example.com"+route);
    assert.equal(response.status, 200);
    assert.equal(response.redirected, false);
    const body = await response.text();
    assert.ok(body.includes(marker));
  });
}
