"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { Shield, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AuthGuardProps {
  children: React.ReactNode
  requiredPermission?: string
  requiredRole?: string
  fallback?: React.ReactNode
}

export function AuthGuard({ 
  children, 
  requiredPermission, 
  requiredRole, 
  fallback 
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading, hasPermission, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Verifying Access
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Please wait while we verify your credentials...
            </p>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Access Required
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You need to be logged in to access this page.
            </p>
            <Button 
              onClick={() => router.push('/login')}
              className="btn-primary"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Go to Login
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  // Check role requirement
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Insufficient Permissions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              You need <strong>{requiredRole}</strong> role to access this page.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Current role: <strong>{user?.role}</strong>
            </p>
            <Button 
              onClick={() => router.push('/')}
              variant="outline"
            >
              Return Home
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Access Denied
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You don't have permission to access this page.
            </p>
            <Button 
              onClick={() => router.push('/')}
              variant="outline"
            >
              Return Home
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    )
  }

  // All checks passed, render children
  return <>{children}</>
}
