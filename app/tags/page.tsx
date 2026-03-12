import type { Metadata } from 'next'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import { getAllTags } from '@/lib/posts'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '标签分类',
  description: '按标签浏览所有量化交易相关文章',
}

export default function TagsPage() {
  const tags = getAllTags()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '标签分类',
    description: '按标签浏览所有量化交易相关文章',
    url: 'https://quant-blog.vercel.app/tags',
    inLanguage: 'zh-CN',
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
            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                标签分类
              </h1>
              <p className="text-lg text-muted-foreground">
                共 {tags.length} 个标签，点击查看相关文章
              </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tags.map(({ tag, count }) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                  <Card className="h-full hover:border-foreground/20 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="font-semibold text-lg mb-1">{tag}</h2>
                          <p className="text-sm text-muted-foreground">
                            {count} 篇文章
                          </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                          <Tag className="h-5 w-5 text-secondary-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
