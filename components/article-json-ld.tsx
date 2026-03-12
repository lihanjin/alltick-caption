import type { Post } from '@/lib/types'

interface ArticleJsonLdProps {
  post: Post
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || undefined,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: '量化笔记',
      logo: {
        '@type': 'ImageObject',
        url: 'https://quant-blog.vercel.app/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://quant-blog.vercel.app/posts/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: '量化交易',
    inLanguage: 'zh-CN',
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
