'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PostTable } from './post-table'
import { PostEditor } from './post-editor'
import type { Post, PostFormData } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function AdminDashboard() {
  const { data: posts, mutate, isLoading } = useSWR<Post[]>('/api/posts', fetcher)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isCreating, setIsCreating] = useState(false)

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
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {isLoading ? '加载中...' : `共 ${posts?.length || 0} 篇文章`}
        </p>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          新建文章
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          加载文章列表中...
        </div>
      ) : posts && posts.length > 0 ? (
        <PostTable
          posts={posts}
          onEdit={setEditingPost}
          onDelete={handleDelete}
        />
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
