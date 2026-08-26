import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { fetchBlogPostById } from "../actions";

interface BlogPostDetailPageProps {
  params: Promise<{ locale: Locale; id: string }>;
}

const getPost = cache((id: string, locale: Locale) => fetchBlogPostById(id, locale));

function validImage(url?: string): url is string {
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

export async function generateMetadata({ params }: BlogPostDetailPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const post = await getPost(id, locale);
  if (!post) return { title: "Blog | Mateo Gheeraert" };
  const description = plainText(post.description).slice(0, 160);
  const remoteImage = post.image_url?.startsWith("http") ? [post.image_url] : [];
  return {
    title: `${post.title} | Mateo Gheeraert`,
    description,
    openGraph: { title: post.title, description, images: remoteImage },
    twitter: { card: remoteImage.length ? "summary_large_image" : "summary", title: post.title, description, images: remoteImage },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const { locale, id } = await params;
  const [post, dictionary] = await Promise.all([getPost(id, locale), getDictionary(locale)]);
  if (!post) notFound();

  const published = new Date(post.created_at).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });

  return (
    <article className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24">
      <Link href={`/${locale}/blog`} className="group inline-flex items-center gap-3 text-sm text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-white">
        <ArrowLeft className="transition-transform group-hover:-translate-x-1" size={17} />{dictionary.blog.back_to_blog}
      </Link>

      <header className="mx-auto max-w-4xl border-b border-gray-300 py-10 text-center dark:border-gray-700 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">{published}</p>
        <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-gray-950 dark:text-white sm:text-7xl">{post.title}</h1>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
          {post.read_time && <span>{dictionary.blog.read_time}: {post.read_time} min</span>}
          {post.tags && post.tags.length > 0 && post.tags.map((tag) => <Badge key={tag} variant="outline" className="bg-transparent font-mono font-normal">{tag}</Badge>)}
        </div>
      </header>

      {validImage(post.image_url) && (
        <div className="relative mx-auto my-10 aspect-[16/9] max-w-5xl overflow-hidden bg-gray-100 dark:bg-gray-800 sm:my-14">
          <Image src={post.image_url} alt={post.title} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
        </div>
      )}

      <section className="mx-auto max-w-3xl py-10 sm:py-14">
        <MarkdownRenderer content={post.content} className="text-lg [&_h1]:tracking-[-0.03em] [&_h2]:tracking-[-0.03em] [&_p]:text-lg [&_p]:leading-8" />
      </section>

      <footer className="mx-auto mt-8 grid max-w-4xl gap-6 border-t border-gray-300 py-10 dark:border-gray-700 sm:grid-cols-2 sm:items-center">
        <Link href={`/${locale}/blog`} className="inline-flex items-center gap-3 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"><ArrowLeft size={17} />{dictionary.blog.all_blog_posts}</Link>
        <Link href={`/${locale}/contact`} className="inline-flex items-center gap-3 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 sm:justify-self-end">{dictionary.blog.contact_me}<ArrowRight size={17} /></Link>
      </footer>
    </article>
  );
}
