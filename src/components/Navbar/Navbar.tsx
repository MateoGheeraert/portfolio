"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Code,
  List,
  User,
  ChatCircle,
  CaretDown,
  Moon,
  Sun,
} from "@phosphor-icons/react";
import { Locale, locales, languages } from "@/i18n/config";
import { useTheme } from "@/contexts/ThemeContext";

interface NavbarProps {
  locale: Locale;
  dictionary: {
    navigation: {
      home: string;
      projects: string;
      blog: string;
      about: string;
      contact: string;
    };
    theme: {
      toggle_dark: string;
      toggle_light: string;
    };
  };
}

export const Navbar = ({ locale, dictionary }: NavbarProps) => {
  const [opened, setOpened] = useState(false);
  const [languageMenuOpened, setLanguageMenuOpened] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    // Remove locale part from pathname
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");
    return pathWithoutLocale === path;
  };

  const toggleMenu = () => setOpened((o) => !o);

  const links = [
    { href: "/", label: dictionary.navigation.home, icon: <House size={20} /> },
    {
      href: "/projects",
      label: dictionary.navigation.projects,
      icon: <Code size={20} />,
    },
    {
      href: "/blog",
      label: dictionary.navigation.blog,
      icon: <List size={20} />,
    },
    {
      href: "/about",
      label: dictionary.navigation.about,
      icon: <User size={20} />,
    },
    {
      href: "/contact",
      label: dictionary.navigation.contact,
      icon: <ChatCircle size={20} />,
    },
  ];
  return (
    <header className='sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur py-4 shadow-sm dark:shadow-gray-700/20 transition-colors duration-300'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <Link
            href={`/${locale}`}
            className='font-bold text-xl text-gray-900 dark:text-white'
          >
            Mateo Gheeraert
          </Link>{" "}
          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-2'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  isActive(link.href)
                    ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className='flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors'
              title={
                theme === "light"
                  ? dictionary.theme.toggle_dark
                  : dictionary.theme.toggle_light
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Language Selector */}
            <div className='relative'>
              <button
                onClick={() => setLanguageMenuOpened(!languageMenuOpened)}
                className='flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors'
              >
                <span>{languages[locale as keyof typeof languages]}</span>
                <CaretDown size={16} />
              </button>

              {languageMenuOpened && (
                <div className='absolute right-0 mt-2 py-1 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-gray-700 min-w-max'>
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={pathname.replace(
                        new RegExp(`^/${locale}`),
                        `/${loc}`
                      )}
                      className='block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors'
                      onClick={() => setLanguageMenuOpened(false)}
                    >
                      {languages[loc as keyof typeof languages]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>{" "}
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {opened ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </div>{" "}
      {/* Mobile Navigation */}
      {opened && (
        <div className='md:hidden px-4 py-2 mt-2'>
          <div className='h-px w-full bg-gray-200 dark:bg-gray-700 my-2'></div>
          <nav className='flex flex-col space-y-2'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive(link.href)
                    ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
                onClick={toggleMenu}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            <div className='h-px w-full bg-gray-200 dark:bg-gray-700 my-2'></div>

            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className='flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors'
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              <span>
                {theme === "light"
                  ? dictionary.theme.toggle_dark
                  : dictionary.theme.toggle_light}
              </span>
            </button>

            <div className='h-px w-full bg-gray-200 dark:bg-gray-700 my-2'></div>

            <div className='px-2 font-medium text-sm text-gray-700 dark:text-gray-300'>
              Language
            </div>

            {locales.map((loc) => (
              <Link
                key={loc}
                href={pathname.replace(new RegExp(`^/${locale}`), `/${loc}`)}
                className='flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors'
                onClick={toggleMenu}
              >
                {languages[loc as keyof typeof languages]}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
