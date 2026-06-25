import type { Metadata } from "next";
import Script from "next/script";
import ThemeProvider from "@/components/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const BASE_URL = "https://shreenathsubramanian.me";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Shreenath Subramanian — Software Engineer",
    template: "%s | Shreenath Subramanian",
  },
  description:
    "Shreenath Subramanian is a Software Engineer specializing in full-stack development, distributed systems, microservices, and AI/ML. Based in Coimbatore, India.",
  keywords: [
    "Shreenath Subramanian",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "Distributed Systems",
    "Microservices",
    "AI Engineer",
    "Coimbatore",
  ],
  authors: [{ name: "Shreenath Subramanian", url: BASE_URL }],
  creator: "Shreenath Subramanian",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Shreenath Subramanian",
    title: "Shreenath Subramanian — Software Engineer",
    description:
      "Full-stack engineer building scalable systems, microservices, and AI-powered products.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shreenath Subramanian — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreenath Subramanian — Software Engineer",
    description:
      "Full-stack engineer building scalable systems, microservices, and AI-powered products.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shreenath Subramanian",
  url: BASE_URL,
  email: "shreenath.py@gmail.com",
  jobTitle: "Software Engineer",
  description:
    "Full-stack engineer specializing in distributed systems, microservices, and AI/ML.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://linkedin.com/in/shreenath-subramanian",
    "https://github.com/shreenath-dev",
  ],
  knowsAbout: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "Distributed Systems",
    "Microservices",
    "Artificial Intelligence",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){fetch("https://b368-183-82-250-32.ngrok-free.app/script.js",{headers:{"ngrok-skip-browser-warning":"true"}}).then(function(r){return r.text()}).then(function(code){var s=document.createElement("script");s.setAttribute("data-website-id","f0ee6a6b-5f9f-485c-995d-747dc21edefd");s.setAttribute("data-api-key","0968299d78a730da3258f0b9d0112c4051fe5bb0e2f1b3b62877815231f5b160");s.setAttribute("data-api-base","https://b368-183-82-250-32.ngrok-free.app/api/v1");s.text=code;document.head.appendChild(s);});})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
        <GoogleAnalytics gaId="G-MF9PTPM0V9" />
      </body>
    </html>
  );
}
