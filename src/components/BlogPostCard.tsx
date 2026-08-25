import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { LocalizedBlogPost } from "@/dal/blog";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { Badge } from "@/components/ui/badge";

interface BlogPostCardProps {
  post: LocalizedBlogPost;
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

export default function BlogPostCard({ post, locale }: BlogPostCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const hasImage = post.image_url && isValidImageUrl(post.image_url);

  return (
    <article className="grid gap-6 border-t border-gray-300 py-9 dark:border-gray-700 md:grid-cols-[7rem_minmax(0,1fr)_13rem] md:gap-8 md:py-12">
      <div>
        <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">{formattedDate}</p>
      </div>

      <div>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-gray-950 dark:text-white sm:text-4xl">
          <Link href={`/${locale}/blog/${post.id}`} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
            {post.title}
          </Link>
        </h2>
        <div className="mt-4 line-clamp-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">
          <MarkdownRenderer content={post.description} className="prose-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0" />
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => <Badge key={tag} variant="outline" className="bg-transparent font-mono font-normal">{tag}</Badge>)}
          </div>
        )}
        <Link href={`/${locale}/blog/${post.id}`} aria-label={post.title} className="mt-7 inline-flex items-center gap-3 text-gray-950 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
          <span className="h-px w-8 bg-current" /><ArrowRight size={17} />
        </Link>
      </div>

      {hasImage && (
        <Link href={`/${locale}/blog/${post.id}`} className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800 md:aspect-square">
          <Image src={post.image_url!} alt={post.title} fill sizes="(min-width: 768px) 13rem, 100vw" className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
        </Link>
      )}
    </article>
  );
}
