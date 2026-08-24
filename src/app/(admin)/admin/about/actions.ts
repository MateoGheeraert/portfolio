"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/dal/db";
import type { LocalizedAboutContent } from "@/dal/about";
import { requireAdminUser } from "@/lib/supabase/admin";

const BUCKET = "portfolio-media";

export async function saveAboutContent(content: LocalizedAboutContent): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdminUser();
    if (!supabaseAdmin) throw new Error("Storage client is not available");
    for (const locale of ["en", "nl", "fr"] as const) {
      if (!content[locale]?.title?.trim() || !content[locale]?.hero?.bio?.trim()) {
        throw new Error(`The ${locale.toUpperCase()} About content is incomplete`);
      }
    }
    const { data: bucket } = await supabaseAdmin.storage.getBucket(BUCKET);
    if (!bucket) {
      const { error: bucketError } = await supabaseAdmin.storage.createBucket(BUCKET, {
        public: true,
        fileSizeLimit: 10 * 1024 * 1024,
        allowedMimeTypes: ["image/*", "application/pdf", "text/plain", "application/json"],
      });
      if (bucketError && !bucketError.message.toLowerCase().includes("already exists")) throw bucketError;
    }
    const body = new Blob([JSON.stringify(content)], { type: "application/json" });
    const { error } = await supabaseAdmin.storage.from(BUCKET).upload("settings/about.json", body, {
      contentType: "application/json",
      cacheControl: "0",
      upsert: true,
    });
    if (error) throw error;
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Saving About content failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Could not save About content" };
  }
}
