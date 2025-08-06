import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import Script from "next/script"; // Import the Script component

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
      
      <body className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300'>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5E0V6GPHJ7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5E0V6GPHJ7');
          `}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
