import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card className="group overflow-hidden border-gold/60 hover:border-gold transition-colors">
      <div className="flex flex-col sm:flex-row">
        {post.coverImage && (
          <Link href={`/posts/${post.slug}`} className="block overflow-hidden sm:w-48 md:w-56 flex-shrink-0">
            <div className="relative aspect-[16/9] sm:aspect-[4/3] sm:h-full bg-gold-light">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 224px"
              />
            </div>
          </Link>
        )}
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-xs px-2 py-0.5 rounded-full bg-gold-light text-gold-dark border border-gold/40 hover:bg-gold/20 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <Link href={`/posts/${post.slug}`}>
            <h2 className="text-lg font-semibold mb-1.5 group-hover:text-gold-dark transition-colors line-clamp-2">
              {post.title}
            </h2>
          </Link>

          <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} 分钟
              </span>
            </div>

            <Link
              href={`/posts/${post.slug}`}
              className="flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-foreground transition-colors"
            >
              阅读更多
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
