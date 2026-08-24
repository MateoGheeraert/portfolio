"use server";

import { supabaseAdmin } from "@/dal/db";
import { requireAdminUser } from "@/lib/supabase/admin";

const BUCKET = "portfolio-media";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "application/json",
]);

export interface UploadedMedia {
  url: string;
  path: string;
  name: string;
  type: string;
  isImage: boolean;
}

async function ensureMediaBucket() {
  if (!supabaseAdmin) throw new Error("Storage client is not available");

  const { data } = await supabaseAdmin.storage.getBucket(BUCKET);
  if (data) return;

  const { error } = await supabaseAdmin.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_FILE_SIZE,
    allowedMimeTypes: [...ALLOWED_TYPES],
  });

  if (error && !error.message.toLowerCase().includes("already exists")) {
    throw error;
  }
}

function safeName(name: string) {
  const extension = name.includes(".") ? `.${name.split(".").pop()}` : "";
  const base = name
    .replace(extension, "")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${base || "file"}${extension.toLowerCase()}`;
}

export async function uploadAdminFile(
  formData: FormData,
): Promise<{ success: boolean; file?: UploadedMedia; error?: string }> {
  try {
    await requireAdminUser();
    await ensureMediaBucket();
    if (!supabaseAdmin) throw new Error("Storage client is not available");

    const file = formData.get("file");
    const area = String(formData.get("area") || "uploads").replace(
      /[^a-z0-9-_]/gi,
      "",
    );

    if (!(file instanceof File) || file.size === 0) {
      throw new Error("Choose a file to upload");
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Files must be 10 MB or smaller");
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      throw new Error("This file type is not supported");
    }

    const path = `${area || "uploads"}/${crypto.randomUUID()}-${safeName(file.name)}`;
    const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;

    const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
    return {
      success: true,
      file: {
        url: data.publicUrl,
        path,
        name: file.name,
        type: file.type,
        isImage: file.type.startsWith("image/"),
      },
    };
  } catch (error) {
    console.error("Media upload failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
