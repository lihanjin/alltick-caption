'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth'

const publicNavigation = [
  { name: '首页', href: '/' },
  { name: '标签', href: '/tags' },
]

export function Header() {
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  const navigation = isAdmin
    ? [...publicNavigation, { name: '管理', href: '/admin' }]
    : publicNavigation

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold border border-gold-dark/30">
            <Compass className="h-5 w-5 text-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">老船长量化交易</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-md',
                pathname === item.href
                  ? 'text-foreground bg-muted'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
