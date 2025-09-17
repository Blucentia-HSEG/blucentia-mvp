"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { GlassCard } from "@/components/ui/glass-card"
import { TrendingUp, Users, Shield, Award } from "lucide-react"

interface StatsSectionProps {
  stats: {
    pledges: number
    truthPoints: number
    truthTokens: number
    activeCompanies: number
  }
}

export function StatsSection({ stats }: StatsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const statItems = [
    {
      icon: Users,
      value: stats.pledges,
      label: "Pledges Made",
      description: "Employees committed to transparency",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: TrendingUp,
      value: stats.truthPoints,
      label: "Truth Points Earned",
      description: "Through surveys and participation",
      color: "bg-gradient-to-r from-green-600 to-green-700",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: Award,
      value: stats.truthTokens,
      label: "Truth Tokens Awarded",
      description: "For referrals and achievements",
      color: "bg-gradient-to-r from-amber-500 to-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    {
      icon: Shield,
      value: stats.activeCompanies,
      label: "Active Companies",
      description: "Transparency champions",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50/80 via-slate-50/90 to-slate-100/60 dark:from-slate-900/80 dark:via-slate-900/90 dark:to-slate-800/60 relative">
      {/* Subtle blue tint overlay for continuity */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 via-blue-50/5 to-transparent dark:from-blue-950/10 dark:via-blue-950/5 dark:to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Movement Impact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time progress of our transparency movement. Every pledge, every survey, every company makes a difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-8 text-center group hover:scale-105 transition-all duration-300">
                <motion.div
                  className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <item.icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.div
                  className={`text-4xl md:text-5xl font-bold ${item.textColor} mb-2`}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <AnimatedCounter 
                    value={item.value} 
                    duration={2}
                    className={item.textColor}
                  />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <GlassCard className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Global Transparency Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our collective impact on corporate transparency worldwide
              </p>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "73%" } : { width: "0%" }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                <span>0%</span>
                <span className="font-semibold">73% Complete</span>
                <span>100%</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
