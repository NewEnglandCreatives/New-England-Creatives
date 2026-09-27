import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Header from "./site-header";
export const metadata: Metadata = {
  metadataBase: new URL("https://newenglandcreatives.com"),
  title: { default: "New England Creatives | Marketing made manageable", template: "%s | New England Creatives" },
  description: "Human-led social media strategy, content creation, scheduling, and management for small businesses. You run your business. We run your marketing.",
  alternates: { canonical: "/" },
  openGraph: { title: "New England Creatives", description: "You run your business. We run your marketing.", url: "https://newenglandcreatives.com", images: ["/nec-logo.webp"], type: "website" },
  icons: { icon: "/nc-icon.webp" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><footer><div className="wrap footer-grid"><div><img src="/nec-logo.webp" alt="New England Creatives — Marketing made manageable"/><p>Marketing made manageable.</p></div><div><strong>Explore</strong><Link href="/services">Services & pricing</Link><Link href="/#how-it-works">How it works</Link><Link href="/#about">About</Link><Link href="/get-started">Get started</Link></div><div><strong>Contact & policies</strong><a href="mailto:zac@newenglandcreatives.com">zac@newenglandcreatives.com</a><Link href="/privacy">Privacy policy</Link><Link href="/terms">Website terms</Link></div></div><div className="wrap footer-bottom">© {new Date().getFullYear()} New England Creatives. All rights reserved.</div></footer></body></html>;
}
