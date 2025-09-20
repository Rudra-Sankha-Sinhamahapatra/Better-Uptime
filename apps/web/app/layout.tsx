import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "@/context/session-context";
import { Analytics } from "@vercel/analytics/next"
import { getServerSession } from "@/lib/auth-server";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BetterUptime",
  description: "Website monitoring made simple",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const incomingHeaders = await headers();
  const session = await getServerSession(incomingHeaders);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider initialSession={session ? {
          ...session,
          user: {
            ...session.user,
            image: session.user.image ?? ""
          }
        } : null}>
          <Navbar />
          <main className="pt-6 bg-black">
            {children}
          </main>
        <Footer/>
        </SessionProvider>
        <Analytics mode="production"/>
      </body>
    </html>
  );
}
