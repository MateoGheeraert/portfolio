import "server-only";

import english from "@/i18n/dictionaries/en.json";
import dutch from "@/i18n/dictionaries/nl.json";
import french from "@/i18n/dictionaries/fr.json";
import type { Locale } from "@/i18n/config";
import { supabaseAdmin } from "./db";

const BUCKET = "portfolio-media";
const SETTINGS_PATH = "settings/about.json";

type LegacyAbout = typeof english.about;
export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  description: string;
}
export type AboutContent = Omit<LegacyAbout, "sections"> & {
  sections: Omit<LegacyAbout["sections"], "timeline"> & {
    timeline: Omit<LegacyAbout["sections"]["timeline"], "items"> & { items: TimelineItem[] };
  };
};
export type LocalizedAboutContent = Record<Locale, AboutContent>;

function fromDictionary(source: LegacyAbout): AboutContent {
  return {
    ...source,
    sections: {
      ...source.sections,
      timeline: {
        ...source.sections.timeline,
        items: Object.entries(source.sections.timeline.items).map(([id, item]) => ({ id, ...item })),
      },
    },
  };
}

export const defaultAboutContent: LocalizedAboutContent = {
  en: fromDictionary(english.about),
  nl: fromDictionary(dutch.about),
  fr: fromDictionary(french.about),
};

function normalizeTimelineItems(value: unknown, fallback: TimelineItem[]): TimelineItem[] {
  if (Array.isArray(value)) {
    return value.map((item, index) => ({
      id: String(item?.id || `timeline-${index + 1}`),
      period: String(item?.period || ""),
      title: String(item?.title || ""),
      institution: String(item?.institution || ""),
      description: String(item?.description || ""),
    }));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).map(([id, item]) => ({ id, ...(item as Omit<TimelineItem, "id">) }));
  }
  return fallback;
}

function normalizeAbout(value: unknown, fallback: AboutContent): AboutContent {
  if (!value || typeof value !== "object") return fallback;
  const saved = value as Partial<AboutContent>;
  const savedSections = (saved.sections ?? {}) as Partial<AboutContent["sections"]>;
  const savedTimeline = (savedSections.timeline ?? {}) as Partial<AboutContent["sections"]["timeline"]>;
  return {
    ...fallback,
    ...saved,
    hero: { ...fallback.hero, ...(saved.hero ?? {}) },
    sections: {
      ...fallback.sections,
      ...savedSections,
      education: { ...fallback.sections.education, ...(savedSections.education ?? {}) },
      leadership: { ...fallback.sections.leadership, ...(savedSections.leadership ?? {}) },
      experience: { ...fallback.sections.experience, ...(savedSections.experience ?? {}) },
      learning: { ...fallback.sections.learning, ...(savedSections.learning ?? {}) },
      timeline: {
        ...fallback.sections.timeline,
        ...savedTimeline,
        items: normalizeTimelineItems(savedTimeline.items, fallback.sections.timeline.items),
      },
    },
  } as AboutContent;
}

export async function getAllAboutContent(): Promise<LocalizedAboutContent> {
  if (!supabaseAdmin) return defaultAboutContent;
  const { data, error } = await supabaseAdmin.storage.from(BUCKET).download(SETTINGS_PATH);
  if (error || !data) return defaultAboutContent;
  try {
    const saved = JSON.parse(await data.text()) as Partial<Record<Locale, unknown>>;
    return {
      en: normalizeAbout(saved.en, defaultAboutContent.en),
      nl: normalizeAbout(saved.nl, defaultAboutContent.nl),
      fr: normalizeAbout(saved.fr, defaultAboutContent.fr),
    };
  } catch {
    return defaultAboutContent;
  }
}

export async function getAboutContent(locale: Locale): Promise<AboutContent> {
  const content = await getAllAboutContent();
  return content[locale] ?? content.en;
}
