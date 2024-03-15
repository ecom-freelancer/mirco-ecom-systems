import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export interface BlogDetailPagePrarams {
  slug: string;
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlog(params.slug);

  return {
    title: blog?.title ?? 'Blog not found',
  };
}

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
];

type Blog = (typeof allBlogs)[number];

export const revalidate = 3600;

const getBlog = async (slug: string) => {
  const blogs = await getAllBlogs();

  console.log('get blog', slug, Date.now());

  const blog = blogs.find((blog) => blog.slug === slug);
  return blog;
};

const BlogDetailPage: React.FC<{
  params: BlogDetailPagePrarams;
}> = async ({ params }) => {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return notFound();
  } else
    return (
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </div>
    );
};

export default BlogDetailPage;

function* getBlogTime() {
  let index = 1;
  while (true) {
    yield index++;
  }
}
const blogTime = getBlogTime();

const getAllBlogs = async () => {
  return new Promise<Array<Blog>>((resolve) => {
    setTimeout(() => {
      const time = blogTime.next().value;

      resolve([
        ...allBlogs,
        ...Array(time)
          .fill(undefined)
          .map((_, index) => ({
            slug: `blog-${index + 4}`,
            title: `Blog ${index + 4}`,
            content: `This is blog ${index + 4}`,
          })),
      ]);
    }, 1000);
  });
};
