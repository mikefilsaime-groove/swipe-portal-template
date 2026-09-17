/**
 * Portal-level settings.
 *
 * Edit these values to make the portal yours. Everything below is deliberately
 * generic so the template ships with no personal or brand-specific data.
 */

export type PortalConfig = {
  /** Browser tab title and the portal heading. */
  title: string;
  /** Small label shown above the heading. */
  eyebrow: string;
  /** One-line tagline shown under the heading. */
  tagline: string;
  /** The "From" name shown on every swipe. */
  fromName: string;
  /** Meta description used for SEO and social sharing cards. */
  description: string;
};

export const portalConfig: PortalConfig = {
  title: "Swipe Portal",
  eyebrow: "Marketing swipe archive",
  tagline: "Find it. Copy it. Send it.",
  fromName: "Your Name",
  description: "A reusable calendar of copy-ready email and text marketing swipes.",
};
