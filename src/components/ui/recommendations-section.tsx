"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Progress } from '@/components/ui/progress'
import { 
  Lightbulb, 
  Target, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Play,
  Pause,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Recommendation } from '@/types'

interface RecommendationsSectionProps {
  recommendations: Recommendation[]
  className?: string
}

export function RecommendationsSection({ recommendations, className }: RecommendationsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredRecommendations = recommendations.filter(rec => {
    const statusMatch = filter === 'all' || rec.status === filter
    const categoryMatch = selectedCategory === 'all' || rec.category === selectedCategory
    return statusMatch && categoryMatch
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-700'
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300 border-orange-200 dark:border-orange-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-700'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300 border-slate-200 dark:border-slate-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'dismissed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transparency':
        return <Target className="w-4 h-4" />
      case 'ethics':
        return <CheckCircle className="w-4 h-4" />
      case 'culture':
        return <Lightbulb className="w-4 h-4" />
      case 'leadership':
        return <TrendingUp className="w-4 h-4" />
      case 'compliance':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-emerald-600 dark:text-emerald-400'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'low':
        return 'text-slate-600 dark:text-slate-400'
      default:
        return 'text-slate-600 dark:text-slate-400'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high':
        return 'text-red-600 dark:text-red-400'
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'low':
        return 'text-emerald-600 dark:text-emerald-400'
      default:
        return 'text-slate-600 dark:text-slate-400'
    }
  }

  const categories = ['all', ...Array.from(new Set(recommendations.map(r => r.category)))]
  const statuses = ['all', 'pending', 'in-progress', 'completed'] as const

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Improvement Recommendations
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            AI-powered suggestions to enhance your company's transparency and performance
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Category Filter */}
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "capitalize",
                selectedCategory === category ? 'btn-primary' : 'btn-secondary'
              )}
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex space-x-2">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className={cn(
                "capitalize",
                filter === status ? 'btn-primary' : 'btn-secondary'
              )}
            >
              {status === 'all' ? 'All Status' : status.replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard className="p-6 h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    {getCategoryIcon(rec.category)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {rec.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                      {rec.category} • {rec.timeline}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                  <Badge className={getStatusColor(rec.status)}>
                    {rec.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                {rec.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    +{rec.expectedImprovement}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Expected Improvement</div>
                </div>
                <div className="text-center">
                  <div className={cn("text-lg font-bold", getImpactColor(rec.impact))}>
                    {rec.impact}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Impact</div>
                </div>
                <div className="text-center">
                  <div className={cn("text-lg font-bold", getEffortColor(rec.effort))}>
                    {rec.effort}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Effort</div>
                </div>
              </div>

              {/* Action Items */}
              <div className="mb-4">
                <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm">
                  Action Items ({rec.actionItems.length})
                </h5>
                <div className="space-y-1">
                  {rec.actionItems.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">{item}</span>
                    </div>
                  ))}
                  {rec.actionItems.length > 3 && (
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      +{rec.actionItems.length - 3} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar for In-Progress Items */}
              {rec.status === 'in-progress' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      Progress
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      65%
                    </span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                {rec.status === 'pending' && (
                  <Button size="sm" className="btn-primary">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                )}
                {rec.status === 'in-progress' && (
                  <Button size="sm" variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                {rec.status === 'completed' && (
                  <Button size="sm" variant="outline" disabled>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </Button>
                )}
                <Button size="sm" variant="ghost">
                  View Details
                </Button>
                {rec.status === 'pending' && (
                  <Button size="sm" variant="ghost">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            No Recommendations Found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            No recommendations match your current filters. Try adjusting your selection.
          </p>
        </div>
      )}
    </div>
  )
}
