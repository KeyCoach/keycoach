import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import User from "./user";
import UserProvider from "./user-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userContextData = await User();
  return (
    <html lang="en">
      <head>
        <title>Keycoach</title>
        <meta name="description" content="Keycoach" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <div className="p-3">
          <UserProvider data={userContextData}>{children}</UserProvider>
        </div>
      </body>
    </html>
  );
}
