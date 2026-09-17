# AGENTS.md — Swipe Portal template

Instructions for a coding agent working in this repository.

## What this is

A self-contained **Swipe Portal**: a calendar UI over a static list of email/text
marketing swipes, with one-click rich-copy and HTML-source copy. It is a
server-rendered Next.js app (vinext) that deploys to Cloudflare Workers.

It is a **template**. It must stay free of any one person's or company's data.

## Golden rule: no personal data

Do not add real names, email addresses, phone numbers, customer records, or
brand-specific campaign copy. Placeholder brands and `{{merge_tags}}` are fine.
If a user asks you to add real swipes, that is their content and belongs in
their copy of the repo — never in this template's committed defaults.

## Where things live

- `app/swipe-data.ts` — the brands, campaigns, and swipes. **This is the file
  users edit.** Keep the exported names (`brands`, `campaigns`, `Swipe`,
  `Campaign`) stable; the rest of the app depends on them.
- `app/portal-config.ts` — title, eyebrow, tagline, `fromName`, meta description.
- `app/SwipePortalView.tsx` — the calendar + copy UI.
- `app/page.tsx` — wires config + data into the view. Usually no edits needed.
- `app/globals.css` — theme tokens at the top of the file.
- `worker/index.ts` — Cloudflare Worker entry point. Leave alone unless changing
  caching or image behavior.

## Commands

```bash
npm install          # Node.js >= 22.13.0
npm run dev          # local dev server
npm run build        # deployable build -> dist/
npm test             # build, then render-test
npm run lint
```

Always run `npm test` and `npm run lint` after a change. The test suite includes
a guard that fails if personal or brand-specific data is introduced.

## Publishing to Sites

When the user asks to publish, hand off, deploy, or "put this on Sites":

1. Use the **Sites** skill (`sites-building` for setup, `sites-hosting` for
   publishing). Follow it exactly; do not invent a deployment flow.
2. `.openai/hosting.json` intentionally has **no `project_id`**. That is
   deliberate: the first publish must create a **new** Sites project belonging
   to the current user. Never hardcode or copy a project id into it.
3. Keep `.openai/hosting.json` limited to logical config (`project_id`,
   optional `static`, `d1`, `r2`, `capabilities`). No secrets, no personal data.
4. Confirm the user's swipes are in `app/swipe-data.ts` before publishing, and
   verify the built output renders before deploying.
5. Report back the live URL only after deployment actually succeeds.

Do not publish an npm package from this repo; it is a website, not a library.

## Style

- Keep it dependency-light. Plain React + CSS is intentional.
- Do not add a database, auth, or analytics to the default template.
- Preserve the existing visual identity unless the user asks for a redesign.
