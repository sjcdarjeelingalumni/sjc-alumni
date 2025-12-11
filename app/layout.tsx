import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SJC Economics Alumni Registry",
  description: "St Joseph's College Economics Honours Alumni Directory - A digital registry connecting Josephite economists across generations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{colorScheme: 'light'}}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}