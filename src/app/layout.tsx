import type { Metadata, Viewport } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
  UnifrakturCook,
} from "next/font/google";
import { Backdrop } from "@/components/Backdrop";
import { Nav } from "@/components/Nav";
import { Pointer } from "@/components/Pointer";
import { Rail } from "@/components/Rail";
import { Reveals } from "@/components/Reveals";
import { profile, SITE_URL } from "@/content/profile";
import { Colophon } from "@/sections/Colophon";
import "./globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "500"], style: ["normal", "italic"] });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "600"] });
const fraktur = UnifrakturCook({ variable: "--font-fraktur", subsets: ["latin"], weight: "700" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-jb", subsets: ["latin"], weight: ["400"] });

const title = `${profile.name} — Software Engineer, Bandung`;
const description = `${profile.role} Based in ${profile.location}. ${profile.availability}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", siteName: profile.name },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#0d0a08" };

/** Runs before first paint: theme from storage (storage may be blocked) + motion flag. */
const prePaint = `(function(){try{var d=document.documentElement,t=null;try{t=localStorage.getItem('theme')}catch(e){}
d.dataset.theme=t||'dark';
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.dataset.motion='on';}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abraham Shalom Nadeak",
  alternateName: [profile.name, profile.handle],
  jobTitle: "Software Engineer",
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Telkom University" },
  address: { "@type": "PostalAddress", addressLocality: "Bandung", addressCountry: "ID" },
  sameAs: [profile.socials.github, profile.socials.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${cormorant.variable} ${cinzel.variable} ${fraktur.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="no-print fixed left-4 top-4 z-[100] -translate-y-24 rounded-sm bg-gold px-4 py-2 text-on-gold focus:translate-y-0"
        >
          Skip to content
        </a>
        <Backdrop />
        <Pointer />
        <Nav />
        <Rail />
        <Reveals />
        <main id="main">{children}</main>
        <Colophon />
      </body>
    </html>
  );
}
