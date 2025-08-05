"use client";

import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Add New Blog Post</h1>
      <BlogPostForm mode='create' />
    </div>
  );
}
