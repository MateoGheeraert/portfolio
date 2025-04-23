import { Locale } from "../config";

export const getDictionary = async (locale: Locale) => {
  switch (locale) {
    case "en":
      return import("./en.json").then((module) => module.default);
    case "nl":
      return import("./nl.json").then((module) => module.default);
    case "fr":
      return import("./fr.json").then((module) => module.default);
    default:
      return import("./en.json").then((module) => module.default);
  }
};
