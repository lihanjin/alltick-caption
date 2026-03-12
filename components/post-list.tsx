'use client'

import { useState, useMemo } from 'react'
import { SearchBar } from '@/components/search-bar'
import { TagFilter } from '@/components/tag-filter'
import { PostCard } from '@/components/post-card'
import type { Post } from '@/lib/types'

interface PostListProps {
  posts: Post[]
  tags: { tag: string; count: number }[]
}

export function PostList({ posts, tags }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTag = !selectedTag || post.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [posts, searchQuery, selectedTag])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="搜索文章标题、摘要或标签..."
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">按标签筛选</h3>
        <TagFilter tags={tags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">没有找到匹配的文章</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedTag(null)
            }}
            className="mt-2 text-sm text-foreground underline underline-offset-4 hover:no-underline"
          >
            清除筛选条件
          </button>
        </div>
      )}
    </div>
  )
}
