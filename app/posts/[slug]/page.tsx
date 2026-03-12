import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { ArticleJsonLd } from '@/components/article-json-ld'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: '文章不存在',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <ArticleJsonLd post={post} />
      <main className="min-h-screen py-12">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative aspect-[2/1] mb-8 rounded-lg overflow-hidden border border-gold/40">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            {/* Article Header */}
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-gold-light text-gold-dark border border-gold/40 hover:bg-gold/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-gold/40">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  阅读时间 {post.readingTime} 分钟
                </span>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-code:text-sm">
              <PostContent content={post.content} />
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gold/40">
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold">相关标签</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="px-3 py-1.5 text-sm rounded-full bg-gold-light text-gold-dark border border-gold/40 hover:bg-gold/20 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </>
  )
}

function PostContent({ content }: { content: string }) {
  // Simple markdown-like rendering
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeContent: string[] = []
  let codeLanguage = ''

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim()
        codeContent = []
      } else {
        elements.push(
          <pre key={index} className="rounded-lg overflow-x-auto">
            <code className={`language-${codeLanguage}`}>
              {codeContent.join('\n')}
            </code>
          </pre>
        )
        inCodeBlock = false
        codeLanguage = ''
      }
      return
    }

    if (inCodeBlock) {
      codeContent.push(line)
      return
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.slice(4)}</h3>)
    } else if (line.startsWith('- ')) {
      elements.push(<li key={index} className="ml-4">{line.slice(2)}</li>)
    } else if (line.match(/^\d+\. /)) {
      elements.push(<li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>)
    } else if (line.startsWith('$$') && line.endsWith('$$')) {
      elements.push(
        <div key={index} className="my-4 p-4 bg-muted rounded-lg overflow-x-auto text-center font-mono text-sm">
          {line.slice(2, -2)}
        </div>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={index} className="h-4" />)
    } else {
      // Handle inline code and bold
      const processedLine = line
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted text-sm">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      elements.push(
        <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />
      )
    }
  })

  return <>{elements}</>
}
