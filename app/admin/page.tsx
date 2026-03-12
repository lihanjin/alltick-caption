'use client'

import { useAuth } from '@/lib/auth'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { LoginForm } from '@/components/admin/login-form'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function AdminPage() {
  const { isAdmin, logout } = useAuth()

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
        <div className="max-w-5xl mx-auto">
          <header className="mb-10 flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                文章管理
              </h1>
              <p className="text-lg text-muted-foreground">
                创建、编辑和管理博客文章
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              退出登录
            </Button>
          </header>
          
          <AdminDashboard />
        </div>
      </div>
    </main>
  )
}
