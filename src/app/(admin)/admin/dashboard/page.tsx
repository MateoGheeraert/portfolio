"use client";

import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-3'>Projects</h2>
          <p className='text-gray-600 mb-4'>Manage your portfolio projects.</p>
          <Link
            href='/admin/projects'
            className='inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
          >
            Manage Projects
          </Link>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-3'>Blog</h2>
          <p className='text-gray-600 mb-4'>Manage your blog posts.</p>
          <Link
            href='/admin/blog'
            className='inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
          >
            Manage Blog Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
