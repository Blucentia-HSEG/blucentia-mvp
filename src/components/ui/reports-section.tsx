"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CompanyReport } from '@/types'

interface ReportsSectionProps {
  reports: CompanyReport[]
  className?: string
}

export function ReportsSection({ reports, className }: ReportsSectionProps) {
  const [selectedReport, setSelectedReport] = useState<CompanyReport | null>(null)
  const [filter, setFilter] = useState<'all' | 'monthly' | 'quarterly' | 'annual'>('all')

  const filteredReports = reports.filter(report => 
    filter === 'all' || report.type === filter
  )

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'monthly':
        return <Calendar className="w-5 h-5 text-blue-500" />
      case 'quarterly':
        return <BarChart3 className="w-5 h-5 text-green-500" />
      case 'annual':
        return <PieChart className="w-5 h-5 text-purple-500" />
      default:
        return <FileText className="w-5 h-5 text-slate-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300'
    }
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />
      case 'decrease':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-slate-400" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-emerald-600 dark:text-emerald-400'
      case 'decrease':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-slate-600 dark:text-slate-400'
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Transparency Reports
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Detailed analytics and insights into your company's transparency performance
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {(['all', 'monthly', 'quarterly', 'annual'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className={cn(
                "capitalize",
                filter === filterType ? 'btn-primary' : 'btn-secondary'
              )}
            >
              {filterType}
            </Button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getReportIcon(report.type)}
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {report.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {report.period}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {report.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {report.generatedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReport(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getReportIcon(selectedReport.type)}
                    <div>
                      <CardTitle className="text-xl">{selectedReport.title}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {selectedReport.period} • Generated {selectedReport.generatedDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedReport(null)}>
                      ×
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Summary */}
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Summary</h4>
                  <p className="text-slate-600 dark:text-slate-400">{selectedReport.summary}</p>
                </div>

                {/* Key Findings */}
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Key Findings</h4>
                  <ul className="space-y-2">
                    {selectedReport.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Key Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReport.metrics.map((metric, index) => (
                      <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-slate-800 dark:text-slate-200">
                            {metric.name}
                          </h5>
                          <div className="flex items-center space-x-1">
                            {getChangeIcon(metric.changeType)}
                            <span className={cn("text-sm font-medium", getChangeColor(metric.changeType))}>
                              {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                          {metric.value}{metric.unit}
                        </div>
                        {metric.previousValue && (
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Previous: {metric.previousValue}{metric.unit}
                          </div>
                        )}
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          {metric.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {selectedReport.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {selectedReport.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            No Reports Found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            No reports match your current filter. Try selecting a different time period.
          </p>
        </div>
      )}
    </div>
  )
}
