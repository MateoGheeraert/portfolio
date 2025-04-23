export const defaultLocale = "en";
export const locales = ["en", "nl", "fr"];
export const languages = {
  en: "English",
  nl: "Nederlands",
  fr: "Français",
};

export type Locale = (typeof locales)[number];
