import "./admin.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
   title: {
      default: "Aya Zayed Blog",
      template: "%s | Aya Zayed Blog",
   },
   description: "A modern blog built with Next.js, Express, and MongoDB.",
   keywords: ["blog", "nextjs", "express", "mongodb", "typescript"],
   authors: [{ name: "Aya Zayed" }],
   openGraph: {
      type: "website",
      url: "https://myblog.com",
      title: "Aya Zayed Blog",
      description: "A modern blog built with Next.js, Express, and MongoDB.",
      siteName: "Aya Zayed Blog",
      images: [
         {
            url: "https://myblog.com/og-image.png",
            width: 1200,
            height: 630,
            alt: "My Blog",
         },
      ],
   },
   icons: {
      icon: "/favicon.ico",
   },
};

export default function AdminLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>{children}</body>
      </html>
   );
}
