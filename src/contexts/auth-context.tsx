"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'executive' | 'manager' | 'employee'
  companyId: string
  companyName: string
  permissions: string[]
  avatar?: string
  lastLogin?: Date
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  hasPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    role: 'executive',
    companyId: '1',
    companyName: 'TechCorp Solutions',
    permissions: ['view_dashboard', 'manage_company', 'view_reports', 'manage_employees'],
    avatar: '/avatars/sarah-johnson.jpg',
    lastLogin: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@greenenergy.com',
    role: 'executive',
    companyId: '2',
    companyName: 'GreenEnergy Inc',
    permissions: ['view_dashboard', 'manage_company', 'view_reports'],
    avatar: '/avatars/michael-chen.jpg',
    lastLogin: new Date('2024-01-14T14:20:00Z')
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@financefirst.com',
    role: 'executive',
    companyId: '3',
    companyName: 'FinanceFirst',
    permissions: ['view_dashboard', 'manage_company', 'view_reports', 'manage_employees', 'manage_certifications'],
    avatar: '/avatars/lisa-rodriguez.jpg',
    lastLogin: new Date('2024-01-16T09:15:00Z')
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('blucentia_user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          // Verify user still exists and is valid
          const validUser = mockUsers.find(u => u.id === userData.id)
          if (validUser) {
            setUser(validUser)
          } else {
            localStorage.removeItem('blucentia_user')
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('blucentia_user')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Find user by email
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
      
      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' }
      }
      
      // In a real app, you'd verify the password here
      // For demo purposes, we'll accept any password
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' }
      }
      
      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date()
      }
      
      setUser(updatedUser)
      localStorage.setItem('blucentia_user', JSON.stringify(updatedUser))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('blucentia_user')
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  const hasRole = (role: string): boolean => {
    if (!user) return false
    return user.role === role
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
    hasRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
