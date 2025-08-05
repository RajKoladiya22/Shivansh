// app/blog/[id]/page.tsx
import TheBlogDetailPage from "src/_components/sections/Blog/BlogDetail";
import { blogPosts } from "public/data/Blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_URL } from "src/config/constants";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = blogPosts.find((post) => post.id.toString() === id);

  if (!blog) {
    return {
      title: "Blog Post Not Found | Shivansh Infosys",
      description: "The requested blog post could not be found.",
      robots: "noindex, nofollow",
    };
  }

  // Enhanced metadata
  const blogUrl = `${BASE_URL}/blog/${blog.id}`;
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}&author=${encodeURIComponent(blog.author.name)}&date=${encodeURIComponent(blog.date)}`;
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  const excerpt =
    blog.excerpt.length > 155
      ? blog.excerpt.substring(0, 152).trim() + "..."
      : blog.excerpt;

  return {
    title: `${blog.title} | Shivansh Infosys`,
    description: excerpt,
    keywords: [
      ...blog.tags,
      blog.category,
      "accounting services",
      "tax solutions",
      "GST compliance",
      "financial consulting",
      "business advisory",
      "Tally Tips & Tricks",
      "GST Compliance",
      "Financial Management",
      "Tally Customization",
      "Industry Solutions",
      "Tally Updates",
    ],
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: blog.title,
      description: excerpt,
      url: blogUrl,
      type: "article",
      publishedTime: blog.date,
      modifiedTime: blog.date, // Add modifiedDate to your blog data
      authors: [blog.author.name],
      section: blog.category,
      tags: blog.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${blog.title} - ${blog.category} article by ${blog.author.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: excerpt,
      images: [ogImageUrl],
    },
    other: {
      "article:published_time": blog.date,
      "article:modified_time": blog.date,
      "article:author": blog.author.name,
      "article:section": blog.category,
      ...blog.tags.reduce(
        (acc, tag, i) => ({
          ...acc,
          [`article:tag:${i + 1}`]: tag,
        }),
        {},
      ),
      "article:reading_time": readingTime.toString(),
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = blogPosts.find((post) => post.id.toString() === id);

  if (!blog) notFound();

  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${blog.id}`,
    },
    headline: blog.title,
    description: blog.excerpt,
    image: `${BASE_URL}/api/og?title=${encodeURIComponent(blog.title)}&category=${encodeURIComponent(blog.category)}`,
    author: {
      "@type": "Person",
      name: blog.author.name,
      url: `${BASE_URL}/author/${blog.author.name.toLowerCase().replace(/\s+/g, "-")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Shivansh Infosys",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo/logo.png`,
        width: 180,
        height: 60,
      },
    },
    datePublished: blog.date,
    dateModified: blog.date,
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    articleSection: blog.category,
    articleBody: blog.content,
    keywords: blog.tags.join(", "),
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `${BASE_URL}/blog/${blog.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <TheBlogDetailPage params={{ id }} />
    </>
  );
}
