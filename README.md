# Swipe Portal — open-source template

A small, self-contained **calendar of copy-ready email and text swipes**.

Pick a brand, pick a campaign, click a dated swatch, and the email is right there
— subject, preview text, and the full body with a one-click **rich copy** or
**HTML source** copy. It is the simplest way to keep a swipe file somewhere you
will actually use it.

![Swipe Portal](./public/og.png)

This repository is a **template**. It ships with generic sample campaigns and no
personal data, so you can make it yours in a few minutes.

MIT licensed. Built for [Sites](https://chatgpt.com/) (Cloudflare Workers via
[vinext](https://github.com/cloudflare/vinext)).

---

## The fast path: hand it to Codex and say "publish this to Sites"

This template is designed to be dropped into an AI coding agent.

1. Get the code onto your machine (clone, or download the ZIP from GitHub).
2. Open that folder in Codex.
3. Put your swipes in `app/swipe-data.ts` (see below).
4. Say:

   > Publish this site to Sites.

Codex reads [`AGENTS.md`](./AGENTS.md), installs dependencies, builds, creates a
new Sites project, deploys it, and hands you back a live URL. You do not need to
configure hosting, accounts, or a domain first.

---

## Make it yours

Almost everything lives in three small files:

| File | What to change |
| --- | --- |
| `app/portal-config.ts` | Portal title, eyebrow, tagline, and the **From** name on every swipe |
| `app/swipe-data.ts` | Your brands, campaigns, and swipes |
| `app/globals.css` | Colors, fonts, spacing (CSS variables at the top) |

### Adding a swipe

`app/swipe-data.ts` is just data. Add a campaign to the `campaigns` array:

```ts
{
  brand: "Acme Coaching",
  name: "Welcome Sequence",
  startDate: "2026-01-05",
  swipes: [
    {
      date: "2026-01-05",     // ISO date — this is what places it on the calendar
      day: "Monday",
      shortDate: "Jan 5",
      angle: "Welcome",
      subject: "Welcome — here's where to start",
      preview: "Everything you need for your first week.",
      html: `<p>Hi {{first_name}},</p><p>...</p>`,
    },
  ],
}
```

Notes:

- A brand with no campaigns renders the built-in empty state — handy as a placeholder.
- The **Text** tab is wired up but the sample ships email swipes only.
- `{{first_name}}` and any other merge tags are passed through untouched, so your
  email platform can fill them in.
- Shared links support deep links:
  `?brand=Acme%20Coaching&campaign=Welcome%20Sequence&date=2026-01-05`

---

## Run it locally

Requires **Node.js >= 22.13.0**.

```bash
npm install
npm run dev     # http://localhost:5173
```

Other commands:

```bash
npm run build        # produce the deployable build
npm test             # build, then render-test the portal
npm run lint         # eslint
```

---

## Deploy

Use Sites (easiest — ask Codex, or follow the Sites skill), or deploy the build
output to any Cloudflare Workers-compatible host. The build writes
`dist/server/index.js` plus `dist/.openai/hosting.json`.

`.openai/hosting.json` is intentionally empty of a project id so the first
publish creates **your own** Sites project rather than reusing anyone else's.

## Included email-sending skill template

This repository also includes a reusable template for adapting an email-sending
skill to another platform, with evidence-first workflow and safety checks:

- [`Email-Sending-Skill copy.md`](./resources/email-sending-skill/Email-Sending-Skill%20copy.md)
- [`README.md`](./resources/email-sending-skill/README.md)

---

## Project shape

```
app/
  page.tsx            # renders the portal
  SwipePortalView.tsx # the calendar + copy UI
  portal-config.ts    # title, tagline, sender name
  swipe-data.ts       # YOUR swipes live here
  layout.tsx          # metadata / fonts
  globals.css         # theme
worker/index.ts       # Cloudflare Worker entry
db/, drizzle/, examples/d1/   # optional D1 database (unused by default)
tests/                # render + data tests
```

The optional D1 database layer is present but unused. Ignore it unless you want
to store swipes in a database instead of a file.

---

## License

[MIT](./LICENSE) © Mike Filsaime
