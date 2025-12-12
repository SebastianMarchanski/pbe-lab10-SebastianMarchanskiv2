import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./global.css";

import MainHeader from "../components/main-header";
import Footer from "../components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sklep Komputerowy 2025SM",
  description: "Sklep komputerowy stworzony przez Sebastian Marchanski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>
        <MainHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
