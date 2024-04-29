import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RocketIcon from "./components/rocket";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " min-h-screen bg-gradient-to-b from-bgGradFrom to-bgGradTo text-white"
        }
      >
        <main className="p-4 max-w-2xl mx-auto">
          <header className="flex justify-between my-6">
            <Link href="/" className="flex gap-1">
              <RocketIcon />
              <span>Captionator</span>{" "}
            </Link>

            <nav className="flex gap-6 text-white/80">
              <Link href="/">Home</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}