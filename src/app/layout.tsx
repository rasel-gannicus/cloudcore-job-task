import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Shared/Navbar";
import ReduxProvider from "@/Redux/ReduxProvider";

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
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
