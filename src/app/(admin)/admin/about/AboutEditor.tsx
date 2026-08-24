"use client";

import { useId, useState } from "react";
import { CheckCircle2, LoaderCircle, Plus, Save, TextQuote, Trash2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { LocalizedAboutContent } from "@/dal/about";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LanguageTabs } from "@/components/admin/LanguageTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveAboutContent } from "./actions";

const languageNames: Record<Locale, string> = { en: "English", nl: "Nederlands", fr: "Français" };
const sections = ["education", "leadership", "experience"] as const;

export function AboutEditor({ initial }: { initial: LocalizedAboutContent }) {
  const [content, setContent] = useState(initial);
  const [locale, setLocale] = useState<Locale>("en");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const current = content[locale];

  function update(path: string[], value: string) {
    setContent((previous) => {
      const next = structuredClone(previous);
      let target: Record<string, unknown> = next[locale] as unknown as Record<string, unknown>;
      for (const key of path.slice(0, -1)) target = target[key] as Record<string, unknown>;
      target[path.at(-1)!] = value;
      return next;
    });
    setMessage(null);
  }

  async function save() {
    setSaving(true);
    const result = await saveAboutContent(content);
    setMessage({ ok: result.success, text: result.success ? "About page content saved and published." : result.error || "Could not save About content." });
    setSaving(false);
  }

  function addTimelineItem() {
    const id = crypto.randomUUID();
    setContent((previous) => {
      const next = structuredClone(previous);
      for (const code of Object.keys(languageNames) as Locale[]) {
        next[code].sections.timeline.items.push({ id, period: "", title: "", institution: "", description: "" });
      }
      return next;
    });
    setMessage(null);
  }

  function removeTimelineItem(id: string) {
    setContent((previous) => {
      const next = structuredClone(previous);
      for (const code of Object.keys(languageNames) as Locale[]) {
        next[code].sections.timeline.items = next[code].sections.timeline.items.filter((item) => item.id !== id);
      }
      return next;
    });
    setMessage(null);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={TextQuote}
        title="About page"
        description="Edit every text shown on your public About page in English, Dutch and French."
        actions={<Button onClick={save} disabled={saving}>{saving ? <LoaderCircle className="animate-spin" /> : <Save />}{saving ? "Saving…" : "Save changes"}</Button>}
      />

      <LanguageTabs value={locale} onValueChange={setLocale} />

      {message && <div className={message.ok ? "flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300" : "rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"}>{message.ok && <CheckCircle2 className="h-4 w-4" />}{message.text}</div>}

      <Card>
        <CardHeader><CardTitle>Page introduction</CardTitle><CardDescription>The page title and opening introduction beside your profile picture.</CardDescription></CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field label="Page title" value={current.title} onChange={(value) => update(["title"], value)} />
          <Field label="Greeting" value={current.hero.greeting} onChange={(value) => update(["hero", "greeting"], value)} />
          <Field label="Highlighted name" value={current.hero.name} onChange={(value) => update(["hero", "name"], value)} />
          <Field className="md:col-span-2" label="Biography" multiline value={current.hero.bio} onChange={(value) => update(["hero", "bio"], value)} />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {sections.map((section) => (
          <Card key={section}>
            <CardHeader><CardTitle className="capitalize">{section}</CardTitle><CardDescription>Title and copy for this About card.</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              <Field label="Title" value={current.sections[section].title} onChange={(value) => update(["sections", section, "title"], value)} />
              <Field label="Content" multiline value={current.sections[section].content} onChange={(value) => update(["sections", section, "content"], value)} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-start justify-between gap-4 space-y-0"><div><CardTitle>Timeline</CardTitle><CardDescription className="mt-1.5">Your education and experience timeline. New entries are created for all three languages.</CardDescription></div><Button type="button" variant="outline" size="sm" onClick={addTimelineItem}><Plus />Add entry</Button></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Timeline title" value={current.sections.timeline.title} onChange={(value) => update(["sections", "timeline", "title"], value)} />
            <Field label="Timeline subtitle" value={current.sections.timeline.subtitle} onChange={(value) => update(["sections", "timeline", "subtitle"], value)} />
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            {current.sections.timeline.items.map((entry, index) => {
              return <div key={entry.id} className="space-y-4 rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-2"><h3 className="font-medium">Timeline entry {index + 1}</h3><Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeTimelineItem(entry.id)} aria-label={`Remove timeline entry ${index + 1}`}><Trash2 /></Button></div>
                <Field label="Period" value={entry.period} onChange={(value) => update(["sections", "timeline", "items", String(index), "period"], value)} />
                <Field label="Title" value={entry.title} onChange={(value) => update(["sections", "timeline", "items", String(index), "title"], value)} />
                <Field label="Institution" value={entry.institution} onChange={(value) => update(["sections", "timeline", "items", String(index), "institution"], value)} />
                <Field label="Description" multiline value={entry.description} onChange={(value) => update(["sections", "timeline", "items", String(index), "description"], value)} />
              </div>;
            })}
          </div>
          {current.sections.timeline.items.length === 0 && <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">No timeline entries yet. Add your first work or education milestone.</div>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Closing section</CardTitle><CardDescription>The final learning and growth message.</CardDescription></CardHeader>
        <CardContent className="space-y-5">
          <Field label="Title" value={current.sections.learning.title} onChange={(value) => update(["sections", "learning", "title"], value)} />
          <Field label="Opening text" multiline value={current.sections.learning.content_intro} onChange={(value) => update(["sections", "learning", "content_intro"], value)} />
          <Field label="Closing text" multiline value={current.sections.learning.content_outro} onChange={(value) => update(["sections", "learning", "content_outro"], value)} />
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, className = "" }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; className?: string }) {
  const id = useId();
  return <div className={`space-y-2 ${className}`}><Label htmlFor={id}>{label}</Label>{multiline ? <Textarea id={id} value={value} rows={5} onChange={(event) => onChange(event.target.value)} /> : <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} />}</div>;
}
