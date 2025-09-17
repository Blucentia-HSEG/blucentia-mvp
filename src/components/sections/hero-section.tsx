"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowRight, Sparkles, Shield, Users, TrendingUp, Globe, Flame } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-start justify-center overflow-hidden pt-16 pb-20">
      {/* Enhanced Background with 2025 Design Trends - Extended for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10">
        {/* Extended background for smooth transition */}
        <div className="absolute -bottom-64 left-0 right-0 h-64 bg-gradient-to-b from-slate-50/0 via-slate-50/30 to-slate-50/80 dark:from-slate-900/0 dark:via-slate-900/30 dark:to-slate-900/80"></div>
        {/* Additional transition layer */}
        <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-b from-blue-50/20 via-blue-50/10 to-transparent dark:from-blue-950/20 dark:via-blue-950/10 dark:to-transparent"></div>
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
        </div>
        
        {/* Floating Geometric Elements - 2025 Trend with Dark Mode Glow */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/15 to-blue-600/25 dark:from-blue-400/25 dark:to-blue-500/35 rounded-3xl blur-sm shadow-lg shadow-blue-500/30 dark:shadow-lg dark:shadow-blue-500/40"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-emerald-400/15 to-emerald-500/25 dark:from-emerald-300/25 dark:to-emerald-400/35 rounded-2xl blur-sm shadow-lg shadow-emerald-500/30 dark:shadow-lg dark:shadow-emerald-500/40"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-amber-400/15 to-amber-500/25 dark:from-amber-300/25 dark:to-amber-400/35 rounded-xl blur-sm shadow-lg shadow-amber-500/30 dark:shadow-lg dark:shadow-amber-500/40"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center py-4">
          {/* Enhanced Badge with 2025 Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-full shadow-lg shadow-blue-500/10 dark:shadow-blue-500/5">
              <div className="relative">
                <Flame className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Live Movement</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Refined Typography with Better Hierarchy */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.3] tracking-tight"
          >
            <span className="block bg-gradient-to-r from-blue-500 via-blue-600 to-emerald-500 dark:from-blue-300 dark:via-blue-400 dark:to-emerald-300 bg-clip-text text-transparent">
              Corporate
            </span>
            <span className="block bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 dark:from-emerald-300 dark:via-emerald-400 dark:to-amber-300 bg-clip-text text-transparent mt-4">
              Transparency
            </span>
          </motion.h1>

          {/* Enhanced Subtitle with Better Readability */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
          >
            Join the movement transforming corporate culture through 
            <span className="font-semibold text-blue-500 dark:text-blue-300"> transparency</span>, 
            <span className="font-semibold text-emerald-500 dark:text-emerald-300"> accountability</span>, and 
            <span className="font-semibold text-amber-500 dark:text-amber-300"> ethical practices</span>.
          </motion.p>

          {/* Enhanced CTA Buttons with 2025 Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button 
                size="lg" 
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-xl shadow-blue-500/25 dark:shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 border-0"
              >
                <span className="relative z-10 flex items-center">
                  Take Employee Survey
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link href="/companies">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:text-slate-800 dark:hover:text-slate-200 px-10 py-6 text-lg font-semibold rounded-2xl shadow-lg shadow-slate-500/10 dark:shadow-slate-500/5 hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center">
                    Companies
                    <Globe className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Feature Cards with 2025 Design */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <GlassCard delay={0.1} className="group h-full">
                <div className="p-6 text-center h-full flex flex-col">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25 dark:shadow-blue-500/20">
                    <Shield className="w-8 h-8 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Trust & Security</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">Enterprise-grade security with complete transparency and data protection</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <GlassCard delay={0.2} className="group h-full">
                <div className="p-6 text-center h-full flex flex-col">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/25 dark:shadow-emerald-500/20">
                    <Users className="w-8 h-8 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Community Driven</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">Join thousands of transparency advocates building a better corporate world</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <GlassCard delay={0.3} className="group h-full">
                <div className="p-6 text-center h-full flex flex-col">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/25 dark:shadow-amber-500/20">
                    <TrendingUp className="w-8 h-8 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Real Impact</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">Measurable change in corporate culture with data-driven insights</p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
