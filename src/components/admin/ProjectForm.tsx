"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/dal/projects";
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
  createAdminProject,
  updateAdminProject,
} from "@/app/(admin)/admin/projects/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Define the form schema with Zod
const projectFormSchema = z.object({
  title_dutch: z.string().min(1, { message: "Dutch title is required" }),
  title_english: z.string().min(1, { message: "English title is required" }),
  title_french: z.string().min(1, { message: "French title is required" }),
  content_dutch: z.string().min(1, { message: "Dutch content is required" }),
  content_english: z
    .string()
    .min(1, { message: "English content is required" }),
  content_french: z.string().min(1, { message: "French content is required" }),
  techstack: z
    .string()
    .min(1, { message: "At least one technology is required" }),
  image_url: z.string().optional().or(z.literal("")),
  github_url: z.string().optional().or(z.literal("")),
  demo_url: z.string().optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project?: Project;
  mode: "create" | "edit";
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  // Default values for the form
  const defaultValues: Partial<ProjectFormValues> = {
    title_dutch: project?.title_dutch || "",
    title_english: project?.title_english || "",
    title_french: project?.title_french || "",
    content_dutch: project?.content_dutch || "",
    content_english: project?.content_english || "",
    content_french: project?.content_french || "",
    techstack: Array.isArray(project?.techstack)
      ? project.techstack.join(", ")
      : "",
    image_url: project?.image_url || "",
    github_url: project?.github_url || "",
    demo_url: project?.demo_url || "",
  };

  // Initialize form
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });
  // Create project mutation
  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      // Format techstack for storage - convert comma-separated string to array
      const techstack = data.techstack
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const projectData = {
        title_dutch: data.title_dutch,
        title_english: data.title_english,
        title_french: data.title_french,
        content_dutch: data.content_dutch,
        content_english: data.content_english,
        content_french: data.content_french,
        techstack,
        image_url:
          data.image_url && data.image_url.trim() !== ""
            ? data.image_url
            : null,
        github_url:
          data.github_url && data.github_url.trim() !== ""
            ? data.github_url
            : null,
        demo_url:
          data.demo_url && data.demo_url.trim() !== "" ? data.demo_url : null,
      };

      const result = await createAdminProject(projectData);

      if (!result.success) {
        throw new Error(result.error || "Failed to create project");
      }

      return result;
    },
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      // Redirect to projects page
      router.push("/admin/projects");
      router.refresh();
    },
    onError: (err: Error) => {
      setError(err.message || "An unexpected error occurred");
    },
  });

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      if (!project?.id) {
        throw new Error("Project ID is required for updating");
      }

      // Format techstack for storage - convert comma-separated string to array
      const techstack = data.techstack
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      const projectData = {
        title_dutch: data.title_dutch,
        title_english: data.title_english,
        title_french: data.title_french,
        content_dutch: data.content_dutch,
        content_english: data.content_english,
        content_french: data.content_french,
        techstack,
        image_url:
          data.image_url && data.image_url.trim() !== ""
            ? data.image_url
            : null,
        github_url:
          data.github_url && data.github_url.trim() !== ""
            ? data.github_url
            : null,
        demo_url:
          data.demo_url && data.demo_url.trim() !== "" ? data.demo_url : null,
      };

      const result = await updateAdminProject(project.id, projectData);

      if (!result.success) {
        throw new Error(result.error || "Failed to update project");
      }

      return result;
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      if (project?.id) {
        queryClient.invalidateQueries({
          queryKey: ["admin-project", project.id],
        });
      }
      // Redirect to projects page
      router.push("/admin/projects");
      router.refresh();
    },
    onError: (err: Error) => {
      setError(err.message || "An unexpected error occurred");
    },
  });

  // Determine if any mutation is loading
  const isLoading = createMutation.isPending || updateMutation.isPending;

  async function onSubmit(data: ProjectFormValues) {
    setError(null);

    if (mode === "create") {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  }

  return (
    <div className='space-y-6'>
      {error && (
        <div className='bg-red-50 text-red-800 p-4 rounded-md'>{error}</div>
      )}{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Multi-language Title Fields */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              Titles
            </h3>
            <div className='grid grid-cols-1 gap-4'>
              <FormField
                control={form.control}
                name='title_english'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (English)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Project title in English'
                        {...field}
                      />
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
                    <FormLabel>Title (Dutch)</FormLabel>
                    <FormControl>
                      <Input placeholder='Project title in Dutch' {...field} />
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
                    <FormLabel>Title (French)</FormLabel>
                    <FormControl>
                      <Input placeholder='Project title in French' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Multi-language Content Fields */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              Content
            </h3>
            <div className='space-y-4'>              <FormField
                control={form.control}
                name='content_english'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content (English)</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Project content in English (supports markdown)'
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
                    <FormLabel>Content (Dutch)</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Project content in Dutch (ondersteunt markdown)'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content_french'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content (French)</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Project content in French (prend en charge le markdown)'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='techstack'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech Stack</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='React, Next.js, Tailwind CSS (comma-separated)'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='image_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
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

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='github_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://github.com/username/repo'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='demo_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demo URL</FormLabel>
                  <FormControl>
                    <Input placeholder='https://demo.example.com' {...field} />
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
              onClick={() => router.push("/admin/projects")}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? (
                <span>Saving...</span>
              ) : mode === "create" ? (
                "Create Project"
              ) : (
                "Update Project"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
