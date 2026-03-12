'use client'

import { createContext, useContext } from 'react'

export interface AuthContextType {
  isAdmin: boolean
  login: (password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Simple password check - in production, use proper authentication
const ADMIN_PASSWORD = 'quant2024'

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}
