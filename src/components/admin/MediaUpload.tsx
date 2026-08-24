"use client";

import { ChangeEvent, useRef, useState } from "react";
import { FileUp, LoaderCircle } from "lucide-react";
import {
  uploadAdminFile,
  type UploadedMedia,
} from "@/app/(admin)/admin/media/actions";
import { Button } from "@/components/ui/button";

interface MediaUploadProps {
  area: "blog" | "projects" | "profile";
  accept?: string;
  label: string;
  multiple?: boolean;
  onUploaded: (files: UploadedMedia[]) => void;
}

export function MediaUpload({
  area,
  accept,
  label,
  multiple = false,
  onUploaded,
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setError(null);
    try {
      const uploaded: UploadedMedia[] = [];
      for (const file of files) {
        const data = new FormData();
        data.set("file", file);
        data.set("area", area);
        const result = await uploadAdminFile(data);
        if (!result.success || !result.file) {
          throw new Error(result.error || `Could not upload ${file.name}`);
        }
        uploaded.push(result.file);
      }
      onUploaded(uploaded);
      if (inputRef.current) inputRef.current.value = "";
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFiles}
        className="sr-only"
      />
      <Button
        type="button"
        variant="outline"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileUp className="mr-2 h-4 w-4" />
        )}
        {uploading ? "Uploading…" : label}
      </Button>
      <p className="text-xs text-muted-foreground">
        Images, PDF, Office, text and CSV files up to 10 MB.
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
