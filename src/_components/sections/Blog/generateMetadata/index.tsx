// // app/blog/[id]/page.tsx - Next.js 13+ App Router Blog Detail Page
// import type { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import TheBlogDetailPage from '../BlogDetail';
// import { blogPosts } from 'public/data/Blog';

// interface Blog {
//   id: string;
//   title: string;
//   excerpt: string;
//   category: string;
//   author: string;
//   date: string;
//   likes: number;
//   views: number;
//   isLiked: boolean;
//   content: string;
// }

// interface BlogDetailPageProps {
//   blog: Blog;
// }

// async function getBlogById(id: string | number) {
//   // This would typically fetch from your API or database
//   // For demo purposes, using mock data

  
//   return blogPosts.find(blog => blog.id === id);
// }


// // Generate metadata for SEO
// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   const blog = await getBlogById(params.id);
  
//   if (!blog) {
//     return {
//       title: 'Blog Not Found',
//     };
//   }

//   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shivansh-three.vercel.app';
//   const blogUrl = `${siteUrl}/blog/${blog.id}`;
//   const imageUrl = `${siteUrl}/api/og-image/${blog.id}` || `${siteUrl}/default-blog-image.jpg`;

//   return {
//     title: `${blog.title} | Your Blog Name`,
//     description: blog.excerpt,
//     keywords: `${blog.category}, accounting, finance, tax, GST, Tally`,
//     authors: [{ name: blog.author.name }],
//     creator: blog.author.name,
//     publisher: 'Your Blog Name',
//     robots: 'index, follow',
//     canonical: blogUrl,
    
//     openGraph: {
//       type: 'article',
//       title: blog.title,
//       description: blog.excerpt,
//       url: blogUrl,
//       siteName: 'Your Blog Name',
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//           alt: blog.title,
//         }
//       ],
//       publishedTime: new Date(blog.date).toISOString(),
//       authors: [blog.author.name],
//       section: blog.category,
//       tags: [blog.category, 'accounting', 'finance', 'tax'],
//     },
    
//     twitter: {
//       card: 'summary_large_image',
//       title: blog.title,
//       description: blog.excerpt,
//       images: [imageUrl],
//       site: '@yourtwitterhandle',
//       creator: '@yourtwitterhandle',
//     },
    
//     other: {
//       'theme-color': '#C50202',
//       'msapplication-TileColor': '#C50202',
//     },
//   };
// }

// interface BlogDetailPageProps {
//   params: { id: string };
// }

// export async function BlogDetailPage({ params }: BlogDetailPageProps) {
//   const blog = await getBlogById(params.id);

//   if (!blog) {
//     notFound();
//   }

//   // Generate JSON-LD structured data
//   const jsonLd = {
//     '@context': 'https://schema.org',
//     '@type': 'BlogPosting',
//     headline: blog.title,
//     description: blog.excerpt,
//     image: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og-image/${blog.id}`,
//     author: {
//       '@type': 'Person',
//       name: blog.author,
//     },
//     publisher: {
//       '@type': 'Organization',
//       name: 'Your Blog Name',
//       logo: {
//         '@type': 'ImageObject',
//         url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
//       },
//     },
//     datePublished: new Date(blog.date).toISOString(),
//     dateModified: new Date(blog.date).toISOString(),
//     mainEntityOfPage: {
//       '@type': 'WebPage',
//       '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.id}`,
//     },
//     articleSection: blog.category,
//     keywords: [blog.category, 'accounting', 'finance', 'tax'],
//     wordCount: blog.content ? blog.content.split(' ').length : 500,
//     interactionStatistic: [
//       {
//         '@type': 'InteractionCounter',
//         interactionType: 'https://schema.org/LikeAction',
//         userInteractionCount: blog.likes,
//       },
//       {
//         '@type': 'InteractionCounter',
//         interactionType: 'https://schema.org/ViewAction',
//         userInteractionCount: blog.views,
//       },
//     ],
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       {/* <TheBlogDetailPage params={blog.id} /> */}
//     </>
//   );
// }


