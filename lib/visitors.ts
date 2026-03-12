import type { VisitorInfo } from './types'

// 模拟访客数据存储
const visitors: VisitorInfo[] = [
  {
    id: '1',
    timestamp: '2024-03-10T08:23:45Z',
    ip: '203.45.67.89',
    country: '中国',
    city: '上海',
    device: 'desktop',
    browser: 'Chrome 122',
    os: 'Windows 11',
    referrer: 'https://google.com',
    page: '/',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
  {
    id: '2',
    timestamp: '2024-03-10T09:15:22Z',
    ip: '58.132.44.21',
    country: '中国',
    city: '北京',
    device: 'mobile',
    browser: 'Safari 17',
    os: 'iOS 17',
    referrer: 'https://weibo.com',
    page: '/posts/mean-reversion-strategy',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
  },
  {
    id: '3',
    timestamp: '2024-03-10T10:42:18Z',
    ip: '112.65.78.33',
    country: '中国',
    city: '深圳',
    device: 'desktop',
    browser: 'Firefox 123',
    os: 'macOS 14',
    referrer: '',
    page: '/posts/machine-learning-factor',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0)',
  },
  {
    id: '4',
    timestamp: '2024-03-10T11:08:55Z',
    ip: '172.20.45.88',
    country: '美国',
    city: 'New York',
    device: 'desktop',
    browser: 'Chrome 122',
    os: 'Windows 10',
    referrer: 'https://twitter.com',
    page: '/',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
  {
    id: '5',
    timestamp: '2024-03-10T12:30:11Z',
    ip: '118.88.92.156',
    country: '中国',
    city: '杭州',
    device: 'tablet',
    browser: 'Safari 17',
    os: 'iPadOS 17',
    referrer: 'https://baidu.com',
    page: '/tags',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)',
  },
  {
    id: '6',
    timestamp: '2024-03-10T13:45:33Z',
    ip: '45.67.89.12',
    country: '日本',
    city: 'Tokyo',
    device: 'mobile',
    browser: 'Chrome 122',
    os: 'Android 14',
    referrer: 'https://google.co.jp',
    page: '/posts/multi-factor-model',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8)',
  },
  {
    id: '7',
    timestamp: '2024-03-10T14:22:08Z',
    ip: '203.156.78.45',
    country: '中国',
    city: '广州',
    device: 'desktop',
    browser: 'Edge 122',
    os: 'Windows 11',
    referrer: 'https://bing.com',
    page: '/',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edg/122.0',
  },
  {
    id: '8',
    timestamp: '2024-03-10T15:55:42Z',
    ip: '92.123.45.67',
    country: '英国',
    city: 'London',
    device: 'desktop',
    browser: 'Safari 17',
    os: 'macOS 14',
    referrer: '',
    page: '/posts/statistical-arbitrage',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
  },
  {
    id: '9',
    timestamp: '2024-03-10T16:18:29Z',
    ip: '118.25.67.89',
    country: '中国',
    city: '成都',
    device: 'mobile',
    browser: 'Chrome 122',
    os: 'Android 13',
    referrer: 'https://zhihu.com',
    page: '/posts/hft-system-architecture',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B)',
  },
  {
    id: '10',
    timestamp: '2024-03-10T17:33:15Z',
    ip: '156.78.90.123',
    country: '新加坡',
    city: 'Singapore',
    device: 'desktop',
    browser: 'Chrome 122',
    os: 'Linux',
    referrer: 'https://google.com.sg',
    page: '/',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
  },
]

export function getAllVisitors(): VisitorInfo[] {
  return [...visitors].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

export function addVisitor(info: Omit<VisitorInfo, 'id'>): VisitorInfo {
  const newVisitor: VisitorInfo = {
    id: String(Date.now()),
    ...info,
  }
  visitors.unshift(newVisitor)
  return newVisitor
}

export function getVisitorStats() {
  const all = getAllVisitors()
  
  const countryStats = all.reduce((acc, v) => {
    acc[v.country] = (acc[v.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const deviceStats = all.reduce((acc, v) => {
    acc[v.device] = (acc[v.device] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const browserStats = all.reduce((acc, v) => {
    const browser = v.browser.split(' ')[0]
    acc[browser] = (acc[browser] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const referrerStats = all.reduce((acc, v) => {
    const ref = v.referrer ? new URL(v.referrer).hostname : '直接访问'
    acc[ref] = (acc[ref] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    total: all.length,
    countryStats,
    deviceStats,
    browserStats,
    referrerStats,
  }
}

export function getUniqueValues(field: keyof VisitorInfo): string[] {
  const all = getAllVisitors()
  const values = new Set<string>()
  
  all.forEach((v) => {
    const value = v[field]
    if (value) {
      values.add(String(value))
    }
  })
  
  return Array.from(values).sort()
}
