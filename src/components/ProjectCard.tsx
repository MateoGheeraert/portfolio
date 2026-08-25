import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import type { LocalizedProject } from "@/dal/projects";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

interface ProjectCardProps {
  project: LocalizedProject;
  locale: string;
}

function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return url.startsWith("/");
  }
}

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const hasImage = project.image_url && isValidImageUrl(project.image_url);

  return (
    <article className="grid gap-8 border-t border-gray-300 py-10 dark:border-gray-700 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-14 lg:gap-14">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        {hasImage ? (
          <Image
            src={project.image_url!}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-end p-6">
            <span className="max-w-xs text-lg font-medium text-gray-400 dark:text-gray-600">{project.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-start justify-end gap-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {project.github_url && (
              <Link href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-gray-950 dark:hover:text-white">
                <GithubLogo size={16} /> GitHub
              </Link>
            )}
            {project.demo_url && (
              <Link href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-gray-950 dark:hover:text-white">
                Live <ArrowUpRight size={15} />
              </Link>
            )}
          </div>
        </div>

        <h2 className="mt-8 text-3xl font-semibold leading-tight tracking-[-0.035em] text-gray-950 dark:text-white sm:text-4xl">
          <Link href={`/${locale}/projects/${project.id}`} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
            {project.title}
          </Link>
        </h2>

        <div className="mt-5 line-clamp-4 leading-7 text-gray-600 dark:text-gray-400">
          <MarkdownRenderer content={project.description} className="prose-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0" />
        </div>

        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-200 pt-5 font-mono text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400">
          {project.techstack.map((tech) => <span key={tech}>{tech}</span>)}
        </div>

        <Link href={`/${locale}/projects/${project.id}`} aria-label={project.title} className="mt-auto inline-flex w-fit items-center gap-3 pt-8 text-sm font-medium text-gray-950 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
          <span className="h-px w-10 bg-current" /><ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
