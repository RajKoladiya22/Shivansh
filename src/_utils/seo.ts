// src/_utils/seo.ts
export const generateStructuredData = (blog: any, baseUrl: string, siteName: string) => {
  const wordCount = blog.content.split(' ').length
  const readingTime = Math.ceil(wordCount / 200)
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${blog.id}`
    },
    "headline": blog.title,
    "description": blog.excerpt,
    "image": `${baseUrl}/api/og?title=${encodeURIComponent(blog.title)}`,
    "author": {
      "@type": "Person",
      "name": blog.author.name,
      "url": `${baseUrl}/authors/${blog.author.name.replace(/\s+/g, '-').toLowerCase()}`
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 300,
        "height": 60
      }
    },
    "datePublished": new Date(blog.date).toISOString(),
    "dateModified": new Date(blog.date).toISOString(),
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "articleSection": blog.category,
    "articleBody": blog.content,
    "keywords": blog.tags.join(', '),
    "speakable": {
      "@type": "SpeakableSpecification",
      "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
    }
  }
}