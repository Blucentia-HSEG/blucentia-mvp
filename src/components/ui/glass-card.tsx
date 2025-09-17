"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/30 dark:border-slate-700/30 bg-white/80 dark:bg-slate-800/20 backdrop-blur-md shadow-xl dark:shadow-slate-900/20",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:to-transparent dark:before:from-slate-700/20 dark:before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
