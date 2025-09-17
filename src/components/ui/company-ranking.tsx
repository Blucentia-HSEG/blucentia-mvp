"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/ui/glass-card'
import { Trophy, Medal, Award, Star, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Company } from '@/types'

interface CompanyRankingProps {
  companies: Company[]
  currentCompanyId: string
  className?: string
}

export function CompanyRanking({ companies, currentCompanyId, className }: CompanyRankingProps) {
  const sortedCompanies = [...companies].sort((a, b) => b.overallScore - a.overallScore)
  const currentCompany = companies.find(c => c.id === currentCompanyId)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-400">
          {rank}
        </span>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-slate-400" />
    }
  }

  const getCertificationBadges = (certifications: any[]) => {
    return certifications.slice(0, 3).map((cert, index) => (
      <Badge
        key={cert.id}
        className={cn(
          "text-xs px-2 py-1",
          cert.level === 'platinum' && "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
          cert.level === 'gold' && "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
          cert.level === 'silver' && "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
          cert.level === 'bronze' && "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
        )}
      >
        {cert.name}
      </Badge>
    ))
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500'
    if (score >= 80) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    if (score >= 60) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Company Rankings
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          See how your company compares to others in the transparency movement
        </p>
      </div>

      <div className="space-y-3">
        {sortedCompanies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard
              className={cn(
                "p-4 transition-all duration-200",
                company.id === currentCompanyId 
                  ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-blue-50/50 dark:bg-blue-900/20" 
                  : "hover:shadow-md"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex items-center space-x-2">
                    {getRankIcon(company.rank)}
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      #{company.rank}
                    </span>
                  </div>

                  {/* Company Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                          {company.name}
                        </h4>
                        {company.id === currentCompanyId && (
                          <Badge className="bg-blue-500 text-white text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {company.industry} • {company.size.charAt(0).toUpperCase() + company.size.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Certifications */}
                  <div className="flex space-x-1">
                    {getCertificationBadges(company.certifications)}
                    {company.certifications.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{company.certifications.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Score and Trend */}
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className={cn("text-lg font-bold", getScoreColor(company.overallScore))}>
                        {company.overallScore}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Overall Score
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(company.trend)}
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {company.trend === 'up' ? 'Rising' : company.trend === 'down' ? 'Declining' : 'Stable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info for Current Company */}
              {company.id === currentCompanyId && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600 dark:text-slate-400">Industry Rank</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        #{company.rank} of {companies.length}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 dark:text-slate-400">Percentile</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {company.benchmarkComparison.percentile}th
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 dark:text-slate-400">Performance</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                        {company.benchmarkComparison.performance.replace('-', ' ')}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 dark:text-slate-400">Last Updated</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {company.lastUpdated.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
