import Link from 'next/link';
import React from 'react';

const allBlogs = [
  {
    slug: 'blog-1',
    title: 'Blog 1',
    content: 'This is blog 1',
  },
  {
    slug: 'blog-2',
    title: 'Blog 2',
    content: 'This is blog 2',
  },
  {
    slug: 'blog-3',
    title: 'Blog 3',
    content: 'This is blog 3',
  },
  {
    slug: 'blog-4',
    title: 'Blog 4',
    content: 'This is blog 4',
  },
];
const BlogPage = () => {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {allBlogs.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
