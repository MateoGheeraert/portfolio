"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/dal/blog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAdminBlogPost,
  updateAdminBlogPost,
} from "@/app/(admin)/admin/blog/actions";

// Define the form schema with Zod
const blogFormSchema = z.object({
  title_dutch: z.string().min(1, { message: "Dutch title is required" }),
  title_english: z.string().min(1, { message: "English title is required" }),
  title_french: z.string().min(1, { message: "French title is required" }),
  content_dutch: z.string().min(1, { message: "Dutch content is required" }),
  content_english: z
    .string()
    .min(1, { message: "English content is required" }),
  content_french: z.string().min(1, { message: "French content is required" }),
  tags: z.string().optional(),
  image_url: z.string().optional(),
  read_time: z.string().optional(), // Will be converted to number
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogPostFormProps {
  post?: BlogPost;
  mode: "create" | "edit";
}

export default function BlogPostForm({ post, mode }: BlogPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Default values for the form
  const defaultValues: Partial<BlogFormValues> = {
    title_dutch: post?.title_dutch || "",
    title_english: post?.title_english || "",
    title_french: post?.title_french || "",
    content_dutch: post?.content_dutch || "",
    content_english: post?.content_english || "",
    content_french: post?.content_french || "",
    tags: post?.tags ? post.tags.join(", ") : "",
    image_url: post?.image_url || "",
    read_time: post?.read_time ? post.read_time.toString() : "",
  };

  // Initialize form
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  });

  async function onSubmit(data: BlogFormValues) {
    setLoading(true);
    setError(null);

    try {
      // Format tags for storage - convert comma-separated string to array
      const tags = data.tags
        ? data.tags
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : [];

      // Convert read_time to number
      const read_time = data.read_time ? parseInt(data.read_time, 10) : null;
      const blogData = {
        title_dutch: data.title_dutch,
        title_english: data.title_english,
        title_french: data.title_french,
        content_dutch: data.content_dutch,
        content_english: data.content_english,
        content_french: data.content_french,
        tags,
        image_url: data.image_url || null,
        read_time: isNaN(read_time as number) ? null : read_time,
      };

      let result;

      if (mode === "create") {
        result = await createAdminBlogPost(blogData as any);
      } else if (post?.id) {
        result = await updateAdminBlogPost(post.id, blogData as any);
      } else {
        throw new Error("Blog post ID is required for updating");
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to save blog post");
      }

      // Redirect to blog posts page on success
      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving blog post:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='space-y-6'>
      {error && (
        <div className='bg-red-50 text-red-800 p-4 rounded-md'>{error}</div>
      )}{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Title Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Titles</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <FormField
                control={form.control}
                name='title_english'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Title</FormLabel>
                    <FormControl>
                      <Input placeholder='English blog post title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title_dutch'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dutch Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Nederlandse blog titel' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title_french'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>French Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Titre du blog français' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Content</h3>            <FormField
              control={form.control}
              name='content_english'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Content</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='Full content of the blog post in English (supports markdown)'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='content_dutch'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dutch Content</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='Volledige inhoud van de blogpost in het Nederlands (ondersteunt markdown)'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />            <FormField
              control={form.control}
              name='content_french'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>French Content</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='Contenu complet du blog en français (prend en charge le markdown)'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Meta Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Meta Information
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='React, NextJS, Web Development (comma-separated)'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='read_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Read Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder='5' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='image_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://example.com/image.jpg'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.push("/admin/blog")}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? (
                <span>Saving...</span>
              ) : mode === "create" ? (
                "Create Blog Post"
              ) : (
                "Update Blog Post"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
