'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface ViewCounterProps {
  slug: string
  initialCount: number
}

export function ViewCounter({ slug, initialCount }: ViewCounterProps) {
  const [count, setCount] = useState(initialCount)
  const [hasIncremented, setHasIncremented] = useState(false)

  useEffect(() => {
    // 防止重复计数（使用 sessionStorage 记录已浏览的文章）
    const viewedKey = `viewed_${slug}`
    const hasViewed = sessionStorage.getItem(viewedKey)

    if (!hasViewed && !hasIncremented) {
      setHasIncremented(true)
      sessionStorage.setItem(viewedKey, 'true')
      
      // 增加阅读计数
      fetch(`/api/posts/${slug}/view`, { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          if (data.viewCount) {
            setCount(data.viewCount)
          }
        })
        .catch(() => {
          // 静默失败
        })
    }
  }, [slug, hasIncremented])

  return (
    <span className="flex items-center gap-1.5">
      <Eye className="h-4 w-4" />
      {count.toLocaleString()} 次阅读
    </span>
  )
}
