import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { backendApiUrl } from "@/next.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Environment type:", process.env.ENV_TYPE);
  console.log("Backend API Url:", backendApiUrl);
  return (
    <html lang="en">
      <head>
        <title>Keycoach</title>
        <meta name="description" content="Keycoach" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
