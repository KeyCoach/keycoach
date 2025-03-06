import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import favicon from "@/public/whistle.png";
import { Navbar } from "./navbar";
import UserProvider from "./user-context";
import { AuthenticateUser } from "@/utils/authenticate-user";
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
        <meta name="description" content="Keycoach" />
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        <link rel="icon" href={favicon.src} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon.src} />
        <link rel="apple-touch-icon" href={favicon.src} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} light:bg-slate-50 light:text-slate-950 flex max-h-screen min-h-screen flex-col dark:bg-slate-950 dark:text-slate-50`}
      >
        <Navbar />
        <div className="h-page relative overflow-y-auto">
          <HandTrackProvider>
            <UserProvider user={user}>
              <>
                {children}
                <CameraWarning />
              </>
            </UserProvider>
          </HandTrackProvider>
        </div>
      </body>
    </html>
  );
}
