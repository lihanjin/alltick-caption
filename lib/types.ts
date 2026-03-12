export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  tags: string[]
  author: string
  publishedAt: string
  updatedAt: string
  readingTime: number
  viewCount: number
}

export interface PostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  tags: string[]
  author: string
}

export const PREDEFINED_TAGS = [
  '量化策略',
  '因子投资',
  '机器学习',
  '风险管理',
  '回测系统',
  '高频交易',
  '套利策略',
  '市场分析',
  'Python',
  '数据分析',
] as const

export type PredefinedTag = (typeof PREDEFINED_TAGS)[number]

export interface VisitorInfo {
  id: string
  timestamp: string
  ip: string
  country: string
  city: string
  device: 'desktop' | 'mobile' | 'tablet'
  browser: string
  os: string
  referrer: string
  page: string
  userAgent: string
}
