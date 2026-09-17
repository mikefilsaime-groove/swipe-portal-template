import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import { portalConfig } from "./portal-config";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-reading",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "";
  const title = portalConfig.title;
  const description = portalConfig.description;
  const socialImage = `${origin}/og.png`;

  return {
    title,
    description,
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      shortcut: "/favicon.png",
    },
    openGraph: {
      title,
      description,
      images: [{ url: socialImage, width: 1536, height: 1024, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
