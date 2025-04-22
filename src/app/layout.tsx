import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";

export const metadata: Metadata = {
  title: "Cloud Core",
  description: "Product showing SPA",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
