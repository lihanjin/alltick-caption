import { NextRequest, NextResponse } from 'next/server'
import { getAllVisitors, addVisitor } from '@/lib/visitors'

export async function GET() {
  const visitors = getAllVisitors()
  return NextResponse.json(visitors)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // 从请求头获取信息
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               '未知'
    
    const userAgent = request.headers.get('user-agent') || ''
    
    // 解析设备类型
    let device: 'desktop' | 'mobile' | 'tablet' = 'desktop'
    if (/tablet|ipad/i.test(userAgent)) {
      device = 'tablet'
    } else if (/mobile|android|iphone/i.test(userAgent)) {
      device = 'mobile'
    }
    
    // 解析浏览器
    let browser = '未知'
    if (/edg/i.test(userAgent)) {
      browser = 'Edge ' + (userAgent.match(/Edg\/(\d+)/)?.[1] || '')
    } else if (/chrome/i.test(userAgent)) {
      browser = 'Chrome ' + (userAgent.match(/Chrome\/(\d+)/)?.[1] || '')
    } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
      browser = 'Safari ' + (userAgent.match(/Version\/(\d+)/)?.[1] || '')
    } else if (/firefox/i.test(userAgent)) {
      browser = 'Firefox ' + (userAgent.match(/Firefox\/(\d+)/)?.[1] || '')
    }
    
    // 解析操作系统
    let os = '未知'
    if (/windows nt 10/i.test(userAgent)) {
      os = userAgent.includes('Windows NT 10.0; Win64') ? 'Windows 11' : 'Windows 10'
    } else if (/mac os x/i.test(userAgent)) {
      os = /iphone/i.test(userAgent) ? 'iOS' : /ipad/i.test(userAgent) ? 'iPadOS' : 'macOS'
    } else if (/android/i.test(userAgent)) {
      os = 'Android ' + (userAgent.match(/Android (\d+)/)?.[1] || '')
    } else if (/linux/i.test(userAgent)) {
      os = 'Linux'
    }
    
    const visitor = addVisitor({
      timestamp: new Date().toISOString(),
      ip,
      country: data.country || '未知',
      city: data.city || '未知',
      device,
      browser: browser.trim(),
      os,
      referrer: data.referrer || '',
      page: data.page || '/',
      userAgent,
    })
    
    return NextResponse.json(visitor)
  } catch {
    return NextResponse.json({ error: '添加访客记录失败' }, { status: 500 })
  }
}
