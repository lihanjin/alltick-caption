import { NextResponse } from 'next/server'
import { getPostById, updatePost, deletePost } from '@/lib/posts'
import type { PostFormData } from '@/lib/types'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params
  const post = getPostById(id)
  
  if (!post) {
    return NextResponse.json(
      { error: '文章不存在' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(post)
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params
    const data: Partial<PostFormData> = await request.json()
    
    const post = updatePost(id, data)
    
    if (!post) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(post)
  } catch {
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params
  const success = deletePost(id)
  
  if (!success) {
    return NextResponse.json(
      { error: '文章不存在' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ success: true })
}
