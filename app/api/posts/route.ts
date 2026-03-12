import { NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/posts'
import type { PostFormData } from '@/lib/types'

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  try {
    const data: PostFormData = await request.json()
    
    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: '标题、Slug和内容为必填项' },
        { status: 400 }
      )
    }
    
    const post = createPost(data)
    return NextResponse.json(post, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}
