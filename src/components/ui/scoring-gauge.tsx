"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScoringGaugeProps {
  score: number
  maxScore?: number
  label: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  showPercentage?: boolean
  className?: string
}

export function ScoringGauge({ 
  score, 
  maxScore = 100, 
  label, 
  description,
  size = 'md',
  showPercentage = true,
  className 
}: ScoringGaugeProps) {
  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 45 // radius of 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500'
    if (score >= 80) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    if (score >= 60) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'stroke-emerald-500'
    if (score >= 80) return 'stroke-green-500'
    if (score >= 70) return 'stroke-yellow-500'
    if (score >= 60) return 'stroke-orange-500'
    return 'stroke-red-500'
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-24 h-24',
          text: 'text-lg',
          label: 'text-xs',
          description: 'text-xs'
        }
      case 'lg':
        return {
          container: 'w-40 h-40',
          text: 'text-3xl',
          label: 'text-lg',
          description: 'text-sm'
        }
      default:
        return {
          container: 'w-32 h-32',
          text: 'text-2xl',
          label: 'text-sm',
          description: 'text-xs'
        }
    }
  }

  const sizeClasses = getSizeClasses(size)

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", sizeClasses.container)}>
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={getScoreBgColor(score)}
            initial={{ strokeDasharray, strokeDashoffset: circumference }}
            animate={{ strokeDasharray, strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className={cn("font-bold", getScoreColor(score), sizeClasses.text)}>
              {score}
              {showPercentage && <span className="text-sm opacity-70">%</span>}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Label and description */}
      <div className="mt-3 text-center">
        <div className={cn("font-semibold text-slate-800 dark:text-slate-200", sizeClasses.label)}>
          {label}
        </div>
        {description && (
          <div className={cn("text-slate-600 dark:text-slate-400 mt-1", sizeClasses.description)}>
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

interface MultiScoreGaugeProps {
  scores: {
    label: string
    value: number
    color: string
  }[]
  className?: string
}

export function MultiScoreGauge({ scores, className }: MultiScoreGaugeProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-6", className)}>
      {scores.map((score, index) => (
        <motion.div
          key={score.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <ScoringGauge
            score={score.value}
            label={score.label}
            size="sm"
            className="mx-auto"
          />
        </motion.div>
      ))}
    </div>
  )
}
