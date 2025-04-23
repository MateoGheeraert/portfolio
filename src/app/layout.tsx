import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  description: "Portfolio of Mateo Gheeraert",
  title: "Mateo Gheeraert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <link href='/favicon.ico' rel='icon' sizes='any' />
      </head>
      <body className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
