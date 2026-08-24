import { Languages } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";

const labels: Record<Locale, string> = { en: "English", nl: "Nederlands", fr: "Français" };

export function LanguageTabs({ value, onValueChange }: { value: Locale; onValueChange: (locale: Locale) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-2 shadow-sm">
      <Languages className="mx-2 h-4 w-4 text-muted-foreground" />
      {(Object.keys(labels) as Locale[]).map((locale) => (
        <Button key={locale} type="button" size="sm" variant={value === locale ? "default" : "ghost"} onClick={() => onValueChange(locale)}>{labels[locale]}</Button>
      ))}
    </div>
  );
}
