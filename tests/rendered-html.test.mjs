import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const TEST_HOST = "swipe-portal.example.com";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: {
        accept: "text/html",
        host: TEST_HOST,
        "x-forwarded-host": TEST_HOST,
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portal shell without caching the page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(
    response.headers.get("cache-control"),
    "private, no-cache, no-store, max-age=0, must-revalidate",
  );
  assert.equal(response.headers.get("cdn-cache-control"), "no-store");
  assert.equal(response.headers.get("cloudflare-cdn-cache-control"), "no-store");

  const html = await response.text();
  assert.match(html, /<title>Swipe Portal<\/title>/i);
  assert.match(html, /Choose a brand/);
  assert.match(html, /Choose a campaign/);
  assert.match(html, /No campaign selected/);
  assert.match(html, /Today is always highlighted/);
  assert.match(html, /aria-current="date"/);
  assert.ok(
    html.includes(`https://${TEST_HOST}/og.png`),
    "expected the social card image to use the request host",
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Codex is working/i);
});

test("ships the sample data and the brand/campaign/date deep-link contract", async () => {
  const [data, view, layout, page] = await Promise.all([
    readFile(new URL("../app/swipe-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/SwipePortalView.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  // Sample data: two campaigns across three brands, with one empty brand.
  assert.match(data, /brand: "Acme Coaching"/);
  assert.match(data, /name: "Welcome Sequence"/);
  assert.match(data, /brand: "Northwind Studio"/);
  assert.match(data, /name: "Product Launch"/);
  assert.match(data, /"Placeholder Brand"/);
  assert.equal((data.match(/subject: "/g) ?? []).length, 8);
  assert.equal((data.match(/date: "2026-/g) ?? []).length, 8);
  assert.match(data, /\{\{first_name\}\}/);

  // Deep-link contract used by shared calendar links.
  assert.match(view, /params\.get\("brand"\)/);
  assert.match(view, /params\.get\("campaign"\)/);
  assert.match(view, /params\.get\("date"\)/);
  assert.match(view, /campaign\.brand === requestedBrand/);
  assert.match(view, /campaign\.name === requestedCampaign/);
  assert.match(view, /swipe\.date === requestedDate/);

  // Portal-level settings drive the shell copy.
  assert.match(layout, /portalConfig\.title/);
  assert.match(page, /portalConfig/);
  assert.match(page, /from "\.\/swipe-data"/);
  assert.match(view, /config\.fromName/);
});

test("keeps page responses fresh without disabling hashed asset caching", async () => {
  const worker = await readFile(new URL("../worker/index.ts", import.meta.url), "utf8");
  assert.match(worker, /contentType\.startsWith\("text\/html"\)/);
  assert.match(worker, /contentType\.startsWith\("text\/x-component"\)/);
  assert.doesNotMatch(worker, /_next\/static/);
});

test("ships no personal or brand-specific data", async () => {
  // Content files only. LICENSE/README/AGENTS.md intentionally credit the
  // template author, so they are out of scope for this guard.
  const banned = [
    "mikefilsaime",
    "filsaime",
    "groovefunnels",
    "clickcampaigns",
    "winningwithai",
    "thewebclass",
    "perfectus",
    "nick morgan",
    "alex goen",
    "affiliate_id=4325477",
    "scaleplus",
    "courses.gg",
  ];

  const root = new URL("../", import.meta.url);

  async function collect(relativeDir) {
    const output = [];
    for (const entry of await readdir(new URL(relativeDir, root), { withFileTypes: true })) {
      const child = `${relativeDir}/${entry.name}`;
      if (entry.isDirectory()) output.push(...(await collect(child)));
      else output.push(child);
    }
    return output;
  }

  const files = [];
  for (const dir of ["app", "worker", "db", "build", "examples", "resources"]) {
    files.push(...(await collect(dir)));
  }

  // Fail loudly if the scan ever stops finding real files.
  assert.ok(files.length >= 10, `expected to scan project files, scanned ${files.length}`);

  for (const file of files) {
    const body = await readFile(new URL(file, root), "utf8");
    for (const term of banned) {
      assert.ok(
        !body.toLowerCase().includes(term),
        `${file} still contains personal/brand data: ${term}`,
      );
    }
  }

  const publicFiles = await readdir(new URL("public", root));
  assert.ok(
    !publicFiles.some((name) => /headshot|portrait|mike|nick/i.test(name)),
    "public/ must not contain personal images",
  );
});
