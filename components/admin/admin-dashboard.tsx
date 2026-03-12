'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'
import { Plus, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PostTable } from './post-table'
import { PostEditor } from './post-editor'
import type { Post, PostFormData } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export function AdminDashboard() {
  const { data: posts, mutate, isLoading } = useSWR<Post[]>('/api/posts', fetcher)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 过滤搜索结果
  const filteredPosts = useMemo(() => {
    if (!posts) return []
    if (!searchQuery.trim()) return posts
    
    const query = searchQuery.toLowerCase()
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }, [posts, searchQuery])

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / pageSize)
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredPosts.slice(start, start + pageSize)
  }, [filteredPosts, currentPage, pageSize])

  // 当搜索或分页大小改变时重置页码
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const handleCreate = async (data: PostFormData) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (response.ok) {
      mutate()
      setIsCreating(false)
    }
  }

  const handleUpdate = async (data: PostFormData) => {
    if (!editingPost) return
    
    const response = await fetch(`/api/posts/${editingPost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (response.ok) {
      mutate()
      setEditingPost(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return
    
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    })
    
    if (response.ok) {
      mutate()
    }
  }

  if (isCreating || editingPost) {
    return (
      <PostEditor
        post={editingPost || undefined}
        onSave={editingPost ? handleUpdate : handleCreate}
        onCancel={() => {
          setIsCreating(false)
          setEditingPost(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* 顶部操作栏 */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        {/* 搜索框 */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索文章标题、标签..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-9 border-gold/60 focus:border-gold"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button onClick={() => setIsCreating(true)} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          新建文章
        </Button>
      </div>

      {/* 统计和分页设置 */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          {isLoading
            ? '加载中...'
            : searchQuery
              ? `找到 ${filteredPosts.length} 篇文章（共 ${posts?.length || 0} 篇）`
              : `共 ${posts?.length || 0} 篇文章`}
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">每页显示</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="h-8 px-2 rounded-md border border-gold/60 bg-background text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-muted-foreground">条</span>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          加载文章列表中...
        </div>
      ) : paginatedPosts.length > 0 ? (
        <>
          <PostTable
            posts={paginatedPosts}
            onEdit={setEditingPost}
            onDelete={handleDelete}
          />
          
          {/* 分页控制 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-gold/60 hover:border-gold"
              >
                上一页
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-md text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-gold text-foreground'
                        : 'hover:bg-gold-light text-muted-foreground'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border-gold/60 hover:border-gold"
              >
                下一页
              </Button>
            </div>
          )}
        </>
      ) : posts && posts.length > 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">没有找到匹配的文章</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">暂无文章</p>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            创建第一篇文章
          </Button>
        </div>
      )}
    </div>
  )
}
