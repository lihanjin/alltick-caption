'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { VisitorAnalytics } from '@/components/admin/visitor-analytics'
import { LoginForm } from '@/components/admin/login-form'
import { Button } from '@/components/ui/button'
import { LogOut, FileText, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminPage() {
  const { isAdmin, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'posts' | 'visitors'>('posts')

  if (!isAdmin) {
    return (
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <LoginForm />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                管理后台
              </h1>
              <p className="text-lg text-muted-foreground">
                管理博客文章和查看访客数据
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2 border-gold/60 hover:border-gold"
            >
              <LogOut className="h-4 w-4" />
              退出登录
            </Button>
          </header>

          {/* Tab 切换 */}
          <div className="flex gap-1 mb-8 p-1 bg-gold-light/50 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('posts')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === 'posts'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <FileText className="h-4 w-4" />
              文章管理
            </button>
            <button
              onClick={() => setActiveTab('visitors')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === 'visitors'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Users className="h-4 w-4" />
              访客统计
            </button>
          </div>

          {/* 内容区域 */}
          {activeTab === 'posts' ? <AdminDashboard /> : <VisitorAnalytics />}
        </div>
      </div>
    </main>
  )
}
