'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMovementStats, getPledgeCounter, getTruthPointsCounter, getTruthTokensCounter, getActiveCompaniesCounter } from '@/lib/mock/tokens';
import { getOptedInCompanies, getWatchlistCompanies } from '@/lib/mock/companies';
import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { CompaniesSection } from '@/components/sections/companies-section';
import QuickActions from '@/components/navigation/QuickActions';
import UserJourneyProgress from '@/components/navigation/UserJourneyProgress';

export default function HomePage() {
  const [stats, setStats] = useState({
    pledges: 0,
    truthPoints: 0,
    truthTokens: 0,
    activeCompanies: 0
  });

  useEffect(() => {
    // Simulate real-time counter updates
    const updateStats = () => {
      setStats({
        pledges: getPledgeCounter(),
        truthPoints: getTruthPointsCounter(),
        truthTokens: getTruthTokensCounter(),
        activeCompanies: getActiveCompaniesCounter()
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const optedInCompanies = getOptedInCompanies();
  const watchlistCompanies = getWatchlistCompanies();

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section with 2025 Trends */}
      <HeroSection />

      {/* Enhanced Stats Section with Animations */}
      <StatsSection stats={stats} />

      {/* Quick Actions Section */}
      <section className="py-20 bg-gradient-to-b from-slate-100/50 via-slate-100/80 to-slate-200/50 dark:from-slate-800/50 dark:via-slate-800/80 dark:to-slate-700/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Get Started
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose your path to join the transparency movement and make a real impact.
            </p>
          </motion.div>
          <QuickActions />
        </div>
      </section>

      {/* Enhanced Companies Section */}
      <CompaniesSection 
        optedInCompanies={optedInCompanies} 
        watchlistCompanies={watchlistCompanies} 
      />

      {/* User Journey Progress Section */}
      <section className="pt-20 pb-6 bg-gradient-to-b from-slate-200/60 via-slate-200/80 to-slate-300/60 dark:from-slate-700/60 dark:via-slate-700/80 dark:to-slate-600/60">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              Your Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Track your progress in the transparency movement and see how you're making a difference.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <UserJourneyProgress />
          </div>
        </div>
      </section>
    </div>
  );
}
