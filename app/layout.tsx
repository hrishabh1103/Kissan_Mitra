import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
// add a update soon
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KisanMitra - Eco-Friendly Stubble Management",
  description: "Connecting farmers with machine owners to eliminate stubble burning.",
};
// how to do this over here the chatgpt way

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
