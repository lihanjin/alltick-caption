'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { AuthContext, verifyPassword } from '@/lib/auth'

const AUTH_STORAGE_KEY = 'quant_blog_admin_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if admin session exists
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY)
    if (stored === 'true') {
      setIsAdmin(true)
    }
    setIsLoaded(true)
  }, [])

  const login = useCallback((password: string): boolean => {
    if (verifyPassword(password)) {
      setIsAdmin(true)
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true')
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  // Prevent hydration mismatch by not rendering until loaded
  if (!isLoaded) {
    return null
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
