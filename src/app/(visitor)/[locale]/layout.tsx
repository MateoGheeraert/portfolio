import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navbar } from "@/components/Navbar";

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
      <main className='flex-grow'>{children}</main>
      <footer className='py-6 bg-gray-100 dark:bg-gray-800 transition-colors duration-300'>
        <div className='container mx-auto px-4 text-center text-gray-600 dark:text-gray-400'>
          © {new Date().getFullYear()} Mateo Gheeraert.{" "}
          {dictionary.footer.rights}
        </div>
      </footer>
    </div>
  );
}
