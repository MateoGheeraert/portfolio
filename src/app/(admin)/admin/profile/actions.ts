"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/dal/db";
import {
  defaultProfileSettings,
  type ProfileSettings,
} from "@/dal/profile";
import { requireAdminUser } from "@/lib/supabase/admin";

const BUCKET = "portfolio-media";

export async function saveProfileSettings(
  settings: ProfileSettings,
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdminUser();
    if (!supabaseAdmin) throw new Error("Storage client is not available");

    for (const value of [settings.homeImageUrl, settings.aboutImageUrl]) {
      if (!value || (!value.startsWith("/") && !URL.canParse(value))) {
        throw new Error("Profile image URLs are invalid");
      }
    }

    const { data: bucket } = await supabaseAdmin.storage.getBucket(BUCKET);
    if (!bucket) {
      const { error: bucketError } = await supabaseAdmin.storage.createBucket(
        BUCKET,
        { public: true, fileSizeLimit: 10 * 1024 * 1024 },
      );
      if (
        bucketError &&
        !bucketError.message.toLowerCase().includes("already exists")
      ) {
        throw bucketError;
      }
    }

    const body = new Blob([JSON.stringify(settings)], {
      type: "application/json",
    });
    const { error } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload("settings/profile.json", body, {
        contentType: "application/json",
        cacheControl: "0",
        upsert: true,
      });
    if (error) throw error;

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Saving profile settings failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not save profile",
    };
  }
}

export async function resetProfileSettings() {
  return saveProfileSettings(defaultProfileSettings);
}
