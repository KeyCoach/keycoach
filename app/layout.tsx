import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./navbar";
import UserProvider from "./user-context";
import { AuthenticateUser } from "@/app/actions";
import { HandTrackProvider } from "./hand-track-context";
import CameraWarning from "./camera-warning";

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
        <meta name="description" content="Improve your typing speed and accuracy with KeyCoach!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta
          name="keywords"
          content="typing, teacher, AI, handtracking, technique, keycoach, key coach"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex max-h-screen min-h-screen flex-col bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50`}
      >
        <UserProvider user={user}>
          <HandTrackProvider>
            <Navbar />
            <div className="h-page relative overflow-y-auto">
              <>
                {children}
                <CameraWarning />
              </>
            </div>
          </HandTrackProvider>
        </UserProvider>
      </body>
    </html>
  );
}
