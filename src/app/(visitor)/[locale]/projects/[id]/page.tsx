import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { fetchProjectById } from "../actions";

interface ProjectDetailPageProps {
  params: Promise<{ locale: Locale; id: string }>;
}

const getProject = cache((id: string, locale: Locale) => fetchProjectById(id, locale));

function validImage(url?: string | null): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return url.startsWith("/");
  }
}

function plainText(markdown: string) {
  return markdown.replace(/[#>*_`\[\]()!-]/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const project = await getProject(id, locale);
  if (!project) return { title: "Project | Mateo Gheeraert" };
  const description = plainText(project.description).slice(0, 160);
  const remoteImage = project.image_url?.startsWith("http") ? [project.image_url] : [];
  return {
    title: `${project.title} | Mateo Gheeraert`,
    description,
    openGraph: { title: project.title, description, images: remoteImage },
    twitter: { card: remoteImage.length ? "summary_large_image" : "summary", title: project.title, description, images: remoteImage },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, id } = await params;
  const [project, dictionary] = await Promise.all([getProject(id, locale), getDictionary(locale)]);
  if (!project) notFound();

  const created = new Date(project.created_at).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });

  return (
    <article className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24">
      <Link href={`/${locale}/projects`} className="group inline-flex items-center gap-3 text-sm text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-white">
        <ArrowLeft className="transition-transform group-hover:-translate-x-1" size={17} />{dictionary.projects.back_to_projects}
      </Link>

      <header className="grid gap-10 border-b border-gray-300 py-10 dark:border-gray-700 sm:py-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(15rem,0.7fr)] lg:items-end lg:gap-20">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">{dictionary.navigation.projects}</p>
          <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-gray-950 dark:text-white sm:text-7xl">{project.title}</h1>
        </div>
        <div className="space-y-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-t border-gray-300 pt-3 dark:border-gray-700"><span className="block font-mono text-[0.68rem] uppercase tracking-[0.2em]">{dictionary.projects.created}</span><span className="mt-1 block text-gray-900 dark:text-gray-200">{created}</span></div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-300 pt-3 font-mono text-[0.68rem] uppercase tracking-wider dark:border-gray-700">
            {project.techstack.map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </div>
      </header>

      {validImage(project.image_url) && (
        <div className="relative my-10 aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800 sm:my-14">
          <Image src={project.image_url} alt={project.title} fill priority sizes="(min-width: 1200px) 72rem, 100vw" className="object-cover" />
        </div>
      )}

      <div className="grid gap-12 border-t border-gray-300 py-12 dark:border-gray-700 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20 lg:py-16">
        <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">{dictionary.projects.quick_links}</h2>
            <div className="mt-4 border-t border-gray-300 dark:border-gray-700">
              {project.demo_url && <Link href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-b border-gray-300 py-4 text-sm font-medium transition-colors hover:text-blue-600 dark:border-gray-700 dark:hover:text-blue-400">{dictionary.projects.view_live_demo}<ArrowUpRight size={16} /></Link>}
              {project.github_url && <Link href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-b border-gray-300 py-4 text-sm font-medium transition-colors hover:text-blue-600 dark:border-gray-700 dark:hover:text-blue-400">{dictionary.projects.view_source_code}<GithubLogo size={16} /></Link>}
              {!project.demo_url && !project.github_url && <p className="border-b border-gray-300 py-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">{dictionary.projects.no_links_available}</p>}
            </div>
          </div>
        </aside>

        <section aria-labelledby="project-description">
          <h2 id="project-description" className="mb-10 text-3xl font-semibold tracking-[-0.035em] text-gray-950 dark:text-white sm:text-4xl">{dictionary.projects.project_description}</h2>
          <MarkdownRenderer content={project.content} className="text-lg [&_p]:text-lg [&_p]:leading-8" />
        </section>
      </div>
    </article>
  );
}
