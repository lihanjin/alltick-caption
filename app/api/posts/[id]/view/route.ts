import { NextResponse } from 'next/server'
import { incrementViewCount } from '@/lib/posts'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const newCount = incrementViewCount(id)
  
  return NextResponse.json({ viewCount: newCount })
}
