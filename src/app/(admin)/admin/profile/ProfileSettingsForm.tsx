"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProfileSettings } from "@/dal/profile";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Profile pictures</h1>
        <p className="mt-2 text-gray-600">
          Upload the images used on your homepage and About page, then save.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {(
          [
            ["homeImageUrl", "Homepage picture"],
            ["aboutImageUrl", "About page picture"],
          ] as const
        ).map(([key, label]) => (
          <section key={key} className="space-y-4 rounded-lg border p-5">
            <h2 className="text-lg font-medium">{label}</h2>
            <div className="relative aspect-square max-w-64 overflow-hidden rounded-lg bg-gray-100">
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
          </section>
        ))}
      </div>

      {message && <p className="text-sm text-gray-700">{message}</p>}
      <div className="flex gap-3">
        <Button type="button" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save profile pictures"}
        </Button>
        <Button type="button" variant="outline" onClick={reset} disabled={saving}>
          Restore defaults
        </Button>
      </div>
    </div>
  );
}
