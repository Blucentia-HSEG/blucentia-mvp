"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GlassCard } from "@/components/ui/glass-card"
import { CheckCircle, AlertCircle, TrendingUp, Users } from "lucide-react"

interface Company {
  id: string
  name: string
  industry: string
  size: string
  pledgeCount: number
  truthPointsTotal: number
  watchlistReason?: string
}

interface CompaniesSectionProps {
  optedInCompanies: Company[]
  watchlistCompanies: Company[]
}

export function CompaniesSection({ optedInCompanies, watchlistCompanies }: CompaniesSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 bg-gradient-to-b from-slate-200/50 via-slate-200/80 to-slate-200/60 dark:from-slate-700/50 dark:via-slate-700/80 dark:to-slate-700/60">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Featured Partners
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leading companies in the transparency movement, setting new standards for corporate accountability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Transparency Champions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Transparency Champions</h3>
                  <Badge className="status-success">
                    {optedInCompanies.length} Active
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {optedInCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard className="p-6 group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-14 h-14">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold">
                            {company.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {company.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {company.industry} • {company.size.charAt(0).toUpperCase() + company.size.slice(1)}
                          </p>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className="status-success">
                              Champion
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified transparency champion</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Pledges</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {company.pledgeCount}
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">Truth Points</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {company.truthPointsTotal}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Watchlist Companies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Watchlist</h3>
                  <Badge className="status-warning">
                    {watchlistCompanies.length} Monitoring
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {watchlistCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <GlassCard className="p-6 group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-14 h-14">
                          <AvatarFallback className="bg-gradient-to-r from-gray-400 to-gray-500 text-white text-lg font-bold">
                            {company.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {company.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {company.industry} • {company.size.charAt(0).toUpperCase() + company.size.slice(1)}
                          </p>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className="status-warning">
                              Watchlist
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Under transparency monitoring</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
                            <span className="font-semibold">Concern:</span> {company.watchlistReason}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Status: Not opted in • Monitoring transparency practices
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
