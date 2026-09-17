/**
 * SAMPLE DATA — replace this file with your own swipes.
 *
 * The portal is just a calendar on top of this data shape:
 *
 *   brand -> campaign -> swipe (one email or text, scheduled on a date)
 *
 * Delete everything here and paste in your own campaigns. Nothing else in the
 * app needs to change.
 */

export type Swipe = {
  /** ISO date, e.g. "2026-01-05". Drives the calendar placement. */
  date: string;
  /** Weekday label shown on the day tab, e.g. "Monday". */
  day: string;
  /** Short label shown on the day tab, e.g. "Jan 5". */
  shortDate: string;
  /** Email subject line. */
  subject: string;
  /** Optional A/B subject line. */
  alternateSubject?: string;
  /** Preview / preheader text. */
  preview: string;
  /** Short internal label for the angle of the swipe. */
  angle: string;
  /** The email body as HTML. */
  html: string;
};

export type Campaign = {
  brand: string;
  name: string;
  /** ISO date the sequence starts on. */
  startDate: string;
  swipes: Swipe[];
};

/** Brands shown in the Brand dropdown, in order. */
export const brands: string[] = [
  "Acme Coaching",
  "Northwind Studio",
  "Placeholder Brand",
];

/**
 * Every campaign in the portal. The sample below demonstrates a five-day
 * welcome sequence, a three-day launch sequence, and a brand with no
 * campaigns yet (which renders the empty state).
 */
export const campaigns: Campaign[] = [
  {
    brand: "Acme Coaching",
    name: "Welcome Sequence",
    startDate: "2026-01-05",
    swipes: [
      {
        date: "2026-01-05",
        day: "Monday",
        shortDate: "Jan 5",
        angle: "Welcome",
        subject: "Welcome — here's where to start",
        preview: "Everything you need for your first week, in one short email.",
        html: `
          <p>Hi {{first_name}},</p>

          <p>Welcome aboard. I'll keep this first one short.</p>

          <p>Over the next few days I'm going to send you a handful of quick, practical notes — one per day — so you can get a real result without adding a project to your calendar.</p>

          <ul>
            <li>Tomorrow: the one mistake that slows most people down</li>
            <li>Wednesday: a five-minute win you can do today</li>
            <li>Later in the week: how it looks when it comes together</li>
          </ul>

          <p>In the meantime, reply to this email and tell me the single thing you want to fix first. I read every reply.</p>

          <p>Talk tomorrow,</p>

          <p>Your Name</p>

          <p><strong>P.S.</strong> If you'd rather start now, everything is here: <a href="https://example.com">example.com</a></p>
        `,
      },
      {
        date: "2026-01-06",
        day: "Tuesday",
        shortDate: "Jan 6",
        angle: "Common mistake",
        subject: "The mistake most people make first",
        preview: "It isn't the tool. It's the order you do things in.",
        html: `
          <p>Hi {{first_name}},</p>

          <p>Almost everyone starts with the same step — and it's the one that costs the most time.</p>

          <p><strong>They start with the how.</strong></p>

          <p>Which tool, which template, which plugin. Meanwhile the thing that actually decides the outcome gets skipped entirely.</p>

          <p>The fix is boring and it takes about ten minutes:</p>

          <ul>
            <li>Write down who this is for, in one sentence</li>
            <li>Write down the one result they want</li>
            <li>Write down why the usual way fails them</li>
          </ul>

          <p>Three lines. That's it. Everything after that gets dramatically easier, because you have something to check the work against.</p>

          <p>Try it today and hit reply with your three lines. I'll tell you what I'd change.</p>

          <p>Your Name</p>
        `,
      },
      {
        date: "2026-01-07",
        day: "Wednesday",
        shortDate: "Jan 7",
        angle: "Quick win",
        subject: "A 5-minute win you can do today",
        preview: "Small, specific, and you can finish it before your coffee goes cold.",
        html: `
          <p>Hi {{first_name}},</p>

          <p>Here's the five-minute version.</p>

          <p>Pick the one page or email that matters most right now. Read only the first two lines. Then ask one question:</p>

          <p><em>Would a stranger know what this is and what to do next?</em></p>

          <p>If the answer is no, rewrite just those two lines. Not the whole page — just the top.</p>

          <p>That single change moves more than anything further down the page, and it takes minutes instead of a weekend.</p>

          <p>Reply with your before and after lines if you want a second pair of eyes.</p>

          <p>Your Name</p>

          <p><strong>P.S.</strong> More on this here: <a href="https://example.com">example.com</a></p>
        `,
      },
      {
        date: "2026-01-08",
        day: "Thursday",
        shortDate: "Jan 8",
        angle: "Proof",
        subject: "What it looks like when it works",
        preview: "A short walkthrough of the same three steps, in order.",
        html: `
          <p>Hi {{first_name}},</p>

          <p>Yesterday we fixed the top two lines. Today, the same three steps again, but this time in order, so you can see it as one loop:</p>

          <ul>
            <li><strong>Who it's for</strong> — one sentence, no hedging</li>
            <li><strong>The one result</strong> — specific enough to picture</li>
            <li><strong>Why the usual way fails</strong> — the reason they're looking at all</li>
          </ul>

          <p>When those three line up, the page writes itself and the subject lines get easier. When they don't line up, every rewrite feels like guesswork.</p>

          <p>That's the whole framework. No new tools required.</p>

          <p>Your Name</p>
        `,
      },
      {
        date: "2026-01-09",
        day: "Friday",
        shortDate: "Jan 9",
        angle: "Next step",
        subject: "Ready for the next step?",
        preview: "If the last four days were useful, here's how to keep going.",
        html: `
          <p>Hi {{first_name}},</p>

          <p>That's the sequence. Five short emails, one idea each.</p>

          <p>If it was useful, the next step is to do the same thing for your other campaigns — and this is the part a swipe archive makes easy. Once your copy lives in one place with the dates attached, you stop rewriting from scratch every time.</p>

          <p>Start here: <a href="https://example.com">example.com</a></p>

          <p>And if you want help. Just reply and tell me what you're working on.</p>

          <p>Your Name</p>
        `,
      },
    ],
  },
  {
    brand: "Northwind Studio",
    name: "Product Launch",
    startDate: "2026-02-02",
    swipes: [
      {
        date: "2026-02-02",
        day: "Monday",
        shortDate: "Feb 2",
        angle: "Teaser",
        subject: "Something new is coming Wednesday",
        preview: "A short note before we open the doors.",
        html: `
          <p>Hi {{first_name}},</p>

          <p>Quick heads up — we're opening something new on Wednesday.</p>

          <p>I'll send the details then. For now, all you need to know is that it solves the part people told us was the most annoying.</p>

          <p>Your Name</p>
        `,
      },
      {
        date: "2026-02-03",
        day: "Tuesday",
        shortDate: "Feb 3",
        angle: "Launch",
        subject: "It's live",
        preview: "Open now — and here's exactly what you get.",
        html: `
          <p>Hi {{first_name}},</p>

          <p>It's live. Here's what's included:</p>

          <ul>
            <li>The core piece, ready to use today</li>
            <li>Every template, so you're not starting blank</li>
            <li>Updates for as long as you're subscribed</li>
          </ul>

          <p>Take a look here: <a href="https://example.com">example.com</a></p>

          <p>Your Name</p>

          <p><strong>P.S.</strong> Reply if you have a question before you decide — I'd rather answer it than have you guess.</p>
        `,
      },
      {
        date: "2026-02-04",
        day: "Wednesday",
        shortDate: "Feb 4",
        angle: "Deadline",
        subject: "Last call",
        preview: "The introductory price ends tonight.",
        html: `
          <p>Hi {{first_name}},</p>

          <p>Short one today. The introductory price ends tonight, and after that it goes up.</p>

          <p>If you were on the fence, this is the moment to decide: <a href="https://example.com">example.com</a></p>

          <p>Either way, thanks for reading this week.</p>

          <p>Your Name</p>
        `,
      },
    ],
  },
];
