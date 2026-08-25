import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProfileSettings } from "@/dal/profile";
import { getAboutContent } from "@/dal/about";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const [baseDictionary, profile, about] = await Promise.all([
    getDictionary(locale as Locale),
    getProfileSettings(),
    getAboutContent(locale as Locale),
  ]);
  const dictionary = { ...baseDictionary, about };
  const sections = [
    dictionary.about.sections.education,
    dictionary.about.sections.leadership,
    dictionary.about.sections.experience,
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24">
      <header className="border-b border-gray-300 pb-8 dark:border-gray-700 sm:pb-12">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
          {dictionary.about.title}
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-gray-950 dark:text-white sm:text-7xl lg:text-8xl">
          {dictionary.about.hero.greeting}{" "}
          <span className="text-blue-600 dark:text-blue-400">{dictionary.about.hero.name}</span>
        </h1>
      </header>

      <section className="grid gap-10 border-b border-gray-300 py-10 dark:border-gray-700 sm:py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={profile.aboutImageUrl}
            unoptimized
            alt="Mateo Gheeraert"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-end">
          <p className="max-w-2xl text-2xl leading-relaxed tracking-[-0.02em] text-gray-700 dark:text-gray-300 sm:text-3xl sm:leading-relaxed">
            {dictionary.about.hero.bio}
          </p>
        </div>
      </section>

      <section className="py-6 sm:py-10">
        {sections.map((section, index) => (
          <article
            key={section.title}
            className="grid gap-4 border-b border-gray-300 py-8 dark:border-gray-700 sm:grid-cols-[5rem_minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-8 sm:py-12"
          >
            <span className="font-mono text-sm text-blue-600 dark:text-blue-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-gray-950 dark:text-white sm:text-3xl">
              {section.title}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg">
              {section.content}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-10 border-b border-gray-300 py-14 dark:border-gray-700 sm:py-20 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            {dictionary.about.sections.timeline.subtitle}
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 dark:text-white sm:text-5xl">
            {dictionary.about.sections.timeline.title}
          </h2>
        </div>

        <ol className="border-t border-gray-300 dark:border-gray-700">
          {dictionary.about.sections.timeline.items.map((entry, index) => (
            <li key={entry.id} className="grid gap-4 border-b border-gray-300 py-8 dark:border-gray-700 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:py-10">
              <div>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">{entry.period}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em] text-gray-950 dark:text-white">{entry.title}</h3>
                <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">{entry.institution}</p>
                <p className="mt-5 max-w-xl leading-7 text-gray-600 dark:text-gray-400">{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-gray-950 dark:text-white sm:text-5xl">
            {dictionary.about.sections.learning.title}
          </h2>
          <div className="space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            <p>{dictionary.about.sections.learning.content_intro}</p>
            <p>{dictionary.about.sections.learning.content_outro}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
