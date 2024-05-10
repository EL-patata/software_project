import "~/styles/globals.css";

import { Inter } from "next/font/google";

import SessionProvider from "../components/context/SessionProvider";
import Navbar from "~/components/navbar/Navbar";
import { ShoppingCartProvider } from "~/components/context/ShoppingCartProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-w-full flex-col gap-1 p-4 font-sans ${inter.variable}`}
      >
        <SessionProvider>
          <ShoppingCartProvider>
            <Navbar />
            {children}
          </ShoppingCartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
