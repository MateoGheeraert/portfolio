import "server-only";

import { supabaseAdmin } from "./db";

const BUCKET = "portfolio-media";
const SETTINGS_PATH = "settings/profile.json";

export interface ProfileSettings {
  homeImageUrl: string;
  aboutImageUrl: string;
}

export const defaultProfileSettings: ProfileSettings = {
  homeImageUrl: "/mateo.png",
  aboutImageUrl: "/mateo2.jpg",
};

export async function getProfileSettings(): Promise<ProfileSettings> {
  if (!supabaseAdmin) return defaultProfileSettings;

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .download(SETTINGS_PATH);

  if (error || !data) return defaultProfileSettings;

  try {
    const parsed = JSON.parse(await data.text()) as Partial<ProfileSettings>;
    return {
      homeImageUrl: parsed.homeImageUrl || defaultProfileSettings.homeImageUrl,
      aboutImageUrl:
        parsed.aboutImageUrl || defaultProfileSettings.aboutImageUrl,
    };
  } catch {
    return defaultProfileSettings;
  }
}
