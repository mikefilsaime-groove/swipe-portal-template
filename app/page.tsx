"use client";

import SwipePortalView from "./SwipePortalView";
import { portalConfig } from "./portal-config";
import { brands, campaigns } from "./swipe-data";

/**
 * The portal is a view over `app/swipe-data.ts`.
 * Change your swipes there — this file does not need to change.
 */
export default function Home() {
  return (
    <SwipePortalView
      config={portalConfig}
      brands={brands}
      campaigns={campaigns}
    />
  );
}
