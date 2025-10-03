import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Aya Zayed Blog",
   description:
      "A full-stack blog platform built with Node.js, Express, and Next.js for the frontend.",
};

export default function RootLayout({
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
