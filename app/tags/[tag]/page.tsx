import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import { PostCard } from '@/components/post-card'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map(({ tag }) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    return {
      title: '标签不存在',
    }
  }

  return {
    title: `${decodedTag} - 标签`,
    description: `浏览所有关于「${decodedTag}」的量化交易文章`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${decodedTag} - 标签`,
    description: `浏览所有关于「${decodedTag}」的量化交易文章`,
    url: `https://quant-blog.vercel.app/tags/${tag}`,
    inLanguage: 'zh-CN',
    numberOfItems: posts.length,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/tags"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回标签列表
            </Link>

            <header className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm mb-4">
                标签
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {decodedTag}
              </h1>
              <p className="text-lg text-muted-foreground">
                共 {posts.length} 篇相关文章
              </p>
            </header>

            <div className="grid gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
