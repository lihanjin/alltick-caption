'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'
import {
  Search,
  X,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Clock,
  MapPin,
  Chrome,
  RefreshCw,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { VisitorInfo } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

const deviceIcons = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
}

export function VisitorAnalytics() {
  const { data: visitors, isLoading, mutate } = useSWR<VisitorInfo[]>('/api/visitors', fetcher)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCountry, setFilterCountry] = useState<string>('')
  const [filterDevice, setFilterDevice] = useState<string>('')
  const [filterBrowser, setFilterBrowser] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 获取唯一值用于筛选
  const uniqueCountries = useMemo(() => {
    if (!visitors) return []
    return [...new Set(visitors.map((v) => v.country))].sort()
  }, [visitors])

  const uniqueDevices = useMemo(() => {
    if (!visitors) return []
    return [...new Set(visitors.map((v) => v.device))]
  }, [visitors])

  const uniqueBrowsers = useMemo(() => {
    if (!visitors) return []
    return [...new Set(visitors.map((v) => v.browser.split(' ')[0]))].sort()
  }, [visitors])

  // 过滤
  const filteredVisitors = useMemo(() => {
    if (!visitors) return []

    return visitors.filter((v) => {
      // 搜索
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          v.ip.toLowerCase().includes(query) ||
          v.country.toLowerCase().includes(query) ||
          v.city.toLowerCase().includes(query) ||
          v.page.toLowerCase().includes(query) ||
          v.referrer.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // 国家筛选
      if (filterCountry && v.country !== filterCountry) return false

      // 设备筛选
      if (filterDevice && v.device !== filterDevice) return false

      // 浏览器筛选
      if (filterBrowser && !v.browser.startsWith(filterBrowser)) return false

      return true
    })
  }, [visitors, searchQuery, filterCountry, filterDevice, filterBrowser])

  // 分页
  const totalPages = Math.ceil(filteredVisitors.length / pageSize)
  const paginatedVisitors = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredVisitors.slice(start, start + pageSize)
  }, [filteredVisitors, currentPage, pageSize])

  // 统计数据
  const stats = useMemo(() => {
    if (!visitors) return null

    const countryStats: Record<string, number> = {}
    const deviceStats: Record<string, number> = {}
    const browserStats: Record<string, number> = {}

    visitors.forEach((v) => {
      countryStats[v.country] = (countryStats[v.country] || 0) + 1
      deviceStats[v.device] = (deviceStats[v.device] || 0) + 1
      const browser = v.browser.split(' ')[0]
      browserStats[browser] = (browserStats[browser] || 0) + 1
    })

    return {
      total: visitors.length,
      countries: Object.entries(countryStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
      devices: deviceStats,
      browsers: Object.entries(browserStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    }
  }, [visitors])

  const handleReset = () => {
    setSearchQuery('')
    setFilterCountry('')
    setFilterDevice('')
    setFilterBrowser('')
    setCurrentPage(1)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        加载访客数据中...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-gold/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                总访问量
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-gold/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                设备分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Monitor className="h-4 w-4" />
                  {stats.devices.desktop || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Smartphone className="h-4 w-4" />
                  {stats.devices.mobile || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Tablet className="h-4 w-4" />
                  {stats.devices.tablet || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gold/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                热门地区
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm truncate">
                {stats.countries[0]?.[0] || '-'} ({stats.countries[0]?.[1] || 0})
              </div>
            </CardContent>
          </Card>

          <Card className="border-gold/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                热门浏览器
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm truncate">
                {stats.browsers[0]?.[0] || '-'} ({stats.browsers[0]?.[1] || 0})
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 筛选区域 */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* 搜索框 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索 IP、地区、页面..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-9 pr-9 border-gold/60 focus:border-gold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => mutate()}
            className="border-gold/60 hover:border-gold shrink-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* 筛选下拉框 */}
        <div className="flex flex-wrap gap-3">
          <select
            value={filterCountry}
            onChange={(e) => {
              setFilterCountry(e.target.value)
              setCurrentPage(1)
            }}
            className="h-9 px-3 rounded-md border border-gold/60 bg-background text-sm focus:border-gold focus:outline-none"
          >
            <option value="">全部国家/地区</option>
            {uniqueCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            value={filterDevice}
            onChange={(e) => {
              setFilterDevice(e.target.value)
              setCurrentPage(1)
            }}
            className="h-9 px-3 rounded-md border border-gold/60 bg-background text-sm focus:border-gold focus:outline-none"
          >
            <option value="">全部设备</option>
            {uniqueDevices.map((device) => (
              <option key={device} value={device}>
                {device === 'desktop' ? '桌面' : device === 'mobile' ? '手机' : '平板'}
              </option>
            ))}
          </select>

          <select
            value={filterBrowser}
            onChange={(e) => {
              setFilterBrowser(e.target.value)
              setCurrentPage(1)
            }}
            className="h-9 px-3 rounded-md border border-gold/60 bg-background text-sm focus:border-gold focus:outline-none"
          >
            <option value="">全部浏览器</option>
            {uniqueBrowsers.map((browser) => (
              <option key={browser} value={browser}>
                {browser}
              </option>
            ))}
          </select>

          {(filterCountry || filterDevice || filterBrowser || searchQuery) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground"
            >
              重置筛选
            </Button>
          )}
        </div>
      </div>

      {/* 结果统计和分页设置 */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          共 {filteredVisitors.length} 条记录
          {filteredVisitors.length !== (visitors?.length || 0) &&
            ` (已筛选，总共 ${visitors?.length || 0} 条)`}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">每页</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="h-8 px-2 rounded-md border border-gold/60 bg-background text-sm focus:border-gold focus:outline-none"
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

      {/* 访客列表 */}
      <div className="border border-gold/60 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gold-light/50">
              <tr className="border-b border-gold/40">
                <th className="text-left py-3 px-4 font-medium">时间</th>
                <th className="text-left py-3 px-4 font-medium">IP</th>
                <th className="text-left py-3 px-4 font-medium">地区</th>
                <th className="text-left py-3 px-4 font-medium">设备</th>
                <th className="text-left py-3 px-4 font-medium">浏览器/系统</th>
                <th className="text-left py-3 px-4 font-medium">页面</th>
                <th className="text-left py-3 px-4 font-medium">来源</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVisitors.map((visitor) => {
                const DeviceIcon = deviceIcons[visitor.device]
                return (
                  <tr
                    key={visitor.id}
                    className="border-b border-gold/20 hover:bg-gold-light/30"
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {formatTime(visitor.timestamp)}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">{visitor.ip}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {visitor.country}
                        {visitor.city && visitor.city !== visitor.country && (
                          <span className="text-muted-foreground">· {visitor.city}</span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5">
                        <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="hidden sm:inline">
                          {visitor.device === 'desktop'
                            ? '桌面'
                            : visitor.device === 'mobile'
                              ? '手机'
                              : '平板'}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Chrome className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{visitor.browser}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{visitor.os}</div>
                    </td>
                    <td className="py-3 px-4 max-w-[150px] truncate" title={visitor.page}>
                      {visitor.page}
                    </td>
                    <td className="py-3 px-4 max-w-[150px] truncate">
                      {visitor.referrer ? (
                        <a
                          href={visitor.referrer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold-dark hover:underline"
                          title={visitor.referrer}
                        >
                          {new URL(visitor.referrer).hostname}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">直接访问</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {paginatedVisitors.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            没有找到匹配的访客记录
          </div>
        )}
      </div>

      {/* 分页 */}
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
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let page: number
              if (totalPages <= 7) {
                page = i + 1
              } else if (currentPage <= 4) {
                page = i + 1
              } else if (currentPage >= totalPages - 3) {
                page = totalPages - 6 + i
              } else {
                page = currentPage - 3 + i
              }

              return (
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
              )
            })}
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
    </div>
  )
}
