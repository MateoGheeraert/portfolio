import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Github, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  description: "Portfolio of Mateo Gheeraert",
  title: "Mateo Gheeraert",
};

interface VisitorLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function VisitorLayout({
  children,
  params: { locale },
}: VisitorLayoutProps) {
  // Validate that the locale is supported
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get the dictionary based on the locale
  const dictionary = await getDictionary(locale as Locale);
  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300'>
      <Navbar locale={locale as Locale} dictionary={dictionary} />
      <main className='flex-grow'>{children}</main>      <footer className='py-6 bg-gray-100 dark:bg-gray-800 transition-colors duration-300'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center justify-center space-y-4'>
            {/* Social Media Links */}
            <div className='flex items-center space-x-6'>              <a
                href="https://github.com/MateoGheeraert"
                target="_blank"
                rel="noopener noreferrer"
                className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
                title="GitHub Profile"
              >
                <Github size={20} />
                <span className='text-sm font-medium'>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mateo-gheeraert-6a6524327/"
                target="_blank"
                rel="noopener noreferrer"
                className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'
                title="LinkedIn Profile"
              >
                <Linkedin size={20} />
                <span className='text-sm font-medium'>LinkedIn</span>
              </a>
            </div>
            
            {/* Copyright */}
            <div className='text-center text-gray-600 dark:text-gray-400'>
              © {new Date().getFullYear()} Mateo Gheeraert.{" "}
              {dictionary.footer.rights}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
