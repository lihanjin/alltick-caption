import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye } from 'lucide-react'
import type { Post } from '@/lib/types'

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gold/40">
      <h3 className="text-xl font-semibold mb-6">相关文章</h3>
      <div className="grid gap-4">
        {posts.map((post) => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })

          return (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="group flex gap-4 p-3 -mx-3 rounded-lg hover:bg-gold-light/50 transition-colors"
            >
              {/* Thumbnail */}
              {post.coverImage ? (
                <div className="relative w-20 h-14 flex-shrink-0 rounded-md overflow-hidden border border-gold/30">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ) : (
                <div className="w-20 h-14 flex-shrink-0 rounded-md bg-gold-light border border-gold/30 flex items-center justify-center">
                  <span className="text-xs text-gold-dark">无图</span>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-gold-dark transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {post.viewCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
