import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./navbar";
import UserProvider from "./user-context";
import { AuthenticateUser } from "@/utils/authenticate-user";

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
  const user = await AuthenticateUser();

  return (
    <html lang="en">
      <head>
        <title>Keycoach</title>
        <meta name="description" content="Keycoach" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} light:bg-slate-50 light:text-slate-950 min-h-screen dark:bg-slate-950 dark:text-slate-50`}
      >
        <Navbar />
        <UserProvider user={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
