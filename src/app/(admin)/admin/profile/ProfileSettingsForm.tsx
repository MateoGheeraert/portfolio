"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckCircle2, ImageIcon, LoaderCircle, RotateCcw, Save } from "lucide-react";
import type { ProfileSettings } from "@/dal/profile";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  resetProfileSettings,
  saveProfileSettings,
} from "./actions";

export function ProfileSettingsForm({ initial }: { initial: ProfileSettings }) {
  const [settings, setSettings] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    const result = await saveProfileSettings(settings);
    setMessage(result.success ? "Profile pictures updated." : result.error || null);
    setSaving(false);
  }

  async function reset() {
    setSaving(true);
    const result = await resetProfileSettings();
    if (result.success) {
      const defaults = {
        homeImageUrl: "/mateo.png",
        aboutImageUrl: "/mateo2.jpg",
      };
      setSettings(defaults);
      setMessage("Default profile pictures restored.");
    } else {
      setMessage(result.error || null);
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader icon={ImageIcon} title="Profile pictures" description="Manage the portraits used on your homepage and About page." />

      <div className="grid gap-8 md:grid-cols-2">
        {(
          [
            ["homeImageUrl", "Homepage picture"],
            ["aboutImageUrl", "About page picture"],
          ] as const
        ).map(([key, label]) => (
          <Card key={key}>
            <CardHeader><CardTitle>{label}</CardTitle><CardDescription>Upload a new image and preview it before saving.</CardDescription></CardHeader>
            <CardContent className="space-y-5">
            <div className="relative aspect-square max-w-72 overflow-hidden rounded-xl border bg-muted">
              <Image
                src={settings[key]}
                alt={label}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <MediaUpload
              area="profile"
              accept="image/*"
              label={`Upload ${label.toLowerCase()}`}
              onUploaded={([file]) =>
                file && setSettings((current) => ({ ...current, [key]: file.url }))
              }
            />
            </CardContent>
          </Card>
        ))}
      </div>

      {message && <p className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{message}</p>}
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={save} disabled={saving}>
          {saving ? <LoaderCircle className="animate-spin" /> : <Save />}{saving ? "Saving…" : "Save profile pictures"}
        </Button>
        <Button type="button" variant="outline" onClick={reset} disabled={saving}>
          <RotateCcw />Restore defaults
        </Button>
      </div>
    </div>
  );
}
