// app/blog/[id]/page.tsx
import TheBlogDetailPage from "src/_components/sections/Blog/BlogDetail";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

import { blogPosts } from "public/data/Blog";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = blogPosts.find((post) => post.id.toString() === id);

  if (!blog) return {};

  const siteUrl = "https://shivansh-three.vercel.app";
  const blogUrl = `${siteUrl}/blog/${blog.id}`;
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;
  const metaDescription = blog.excerpt.slice(0, 155).trim();

  return {
    title: `${blog.title} | Shivansh Infosys`,
    description: metaDescription,
    keywords: [blog.category, ...blog.tags, "tax", "gst", "accounting"],
    openGraph: {
      title: blog.title,
      description: metaDescription,
      url: blogUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: metaDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: blogUrl,
    },
    authors: [{ name: blog.author.name }],
  };
}

// export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
//   const resolvedParams = await params;

//   return (
//     <>
//       <TheBlogDetailPage params={resolvedParams} />
//     </>
//   );
// }

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  return <TheBlogDetailPage params={{ id }} />;
}
