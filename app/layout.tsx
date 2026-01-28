import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Switch Machine Driver Server",
  description: "Application for interfacing with a single Switch Machine Driver Server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
