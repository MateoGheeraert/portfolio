import Image from "next/image";
import { Code2, GraduationCap, Users } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProfileSettings } from "@/dal/profile";
import { getAboutContent } from "@/dal/about";

interface AboutPageProps { params: Promise<{ locale: string }> }

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const [baseDictionary, profile, about] = await Promise.all([
    getDictionary(locale as Locale),
    getProfileSettings(),
    getAboutContent(locale as Locale),
  ]);
  const dictionary = { ...baseDictionary, about };
  const cards = [
    { ...dictionary.about.sections.education, icon: GraduationCap, color: "bg-blue-500 dark:bg-blue-600", wide: false },
    { ...dictionary.about.sections.leadership, icon: Users, color: "bg-amber-500 dark:bg-amber-600", wide: false },
    { ...dictionary.about.sections.experience, icon: Code2, color: "bg-emerald-500 dark:bg-emerald-600", wide: true },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="relative mb-12 text-5xl font-bold text-gray-900 transition-colors dark:text-white">
        {dictionary.about.title}<span className="absolute -bottom-3 left-0 h-1.5 w-24 rounded-full bg-blue-500 dark:bg-blue-400" />
      </h1>

      <div className="mb-12 rounded-2xl bg-gradient-to-br from-white to-blue-50 p-8 shadow-xl transition-colors dark:from-gray-800 dark:to-gray-700 dark:shadow-gray-700/20">
        <div className="mb-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="flex justify-center lg:col-span-4 lg:justify-start">
            <div className="relative h-80 w-80 overflow-hidden rounded-2xl border-4 border-white shadow-lg dark:border-gray-600 lg:h-96 lg:w-96">
              <Image src={profile.aboutImageUrl} unoptimized alt="Mateo Gheeraert" fill className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
          <div className="space-y-6 lg:col-span-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{dictionary.about.hero.greeting} <span className="text-blue-600 dark:text-blue-400">{dictionary.about.hero.name}</span></h2>
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">{dictionary.about.hero.bio}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map(({ title, content, icon: Icon, color, wide }) => (
            <div key={title} className={`rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 ${wide ? "md:col-span-2" : ""}`}>
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-white ${color}`}><Icon className="h-6 w-6" /></div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">{content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 rounded-2xl bg-white p-8 shadow-xl transition-colors dark:bg-gray-800 dark:shadow-gray-700/20">
        <div className="mb-10 text-center">
          <h3 className="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-100">{dictionary.about.sections.timeline.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{dictionary.about.sections.timeline.subtitle}</p>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-blue-200 dark:bg-blue-700 md:left-1/2 md:-translate-x-px" />
          <div className="space-y-10">
            {dictionary.about.sections.timeline.items.map((entry, index) => {
              const left = index % 2 === 0;
              return (
                <div key={entry.id} className="relative grid gap-8 pl-12 md:grid-cols-2 md:pl-0">
                  <div className={`rounded-xl bg-gray-50 p-6 shadow-md dark:bg-gray-700 ${left ? "md:mr-8 md:text-right" : "md:order-2 md:ml-8"}`}>
                    <div className="mb-1 text-sm font-semibold text-blue-600 dark:text-blue-400">{entry.period}</div>
                    <h4 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-100">{entry.title}</h4>
                    <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">{entry.institution}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.description}</p>
                  </div>
                  <div className={left ? "hidden md:block" : "hidden md:order-1 md:block"} />
                  <div className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-blue-500 dark:border-gray-800 dark:bg-blue-400 md:left-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-blue-600 p-8 text-white shadow-xl transition-all hover:-translate-y-1 dark:bg-blue-700 dark:shadow-gray-700/20">
        <h3 className="mb-4 text-2xl font-bold">{dictionary.about.sections.learning.title}</h3>
        <p className="mb-6 leading-relaxed text-blue-100 dark:text-blue-200">{dictionary.about.sections.learning.content_intro}</p>
        <p className="leading-relaxed text-blue-100 dark:text-blue-200">{dictionary.about.sections.learning.content_outro}</p>
      </div>
    </div>
  );
}
