'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { getMovementStats, getTokensBySource } from '@/lib/mock/tokens';
import { getOptedInCompanies, getWatchlistCompanies } from '@/lib/mock/companies';
import { getEmployeeStats } from '@/lib/mock/employees';
import { getAffiliateStats } from '@/lib/mock/affiliates';

export default function MovementHubPage() {
  const [movementStats, setMovementStats] = useState(getMovementStats());
  const [tokenSources, setTokenSources] = useState(getTokensBySource());
  const [employeeStats, setEmployeeStats] = useState(getEmployeeStats());
  const [companyStats, setCompanyStats] = useState(getOptedInCompanies().length);
  const [affiliateStats, setAffiliateStats] = useState(getAffiliateStats());

  useEffect(() => {
    const updateStats = () => {
      setMovementStats(getMovementStats());
      setTokenSources(getTokensBySource());
      setEmployeeStats(getEmployeeStats());
      setCompanyStats(getOptedInCompanies().length);
      setAffiliateStats(getAffiliateStats());
    };

    updateStats();
    const interval = setInterval(updateStats, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const optedInCompanies = getOptedInCompanies();
  const watchlistCompanies = getWatchlistCompanies();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.1} className="p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">Movement Hub</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The central hub for the transparency movement - track progress, see impact, and join the cause. 
                Real-time insights into our collective effort for corporate accountability.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Live Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard delay={0.2} className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Live Movement Statistics</h2>
              <p className="text-slate-600 dark:text-slate-400">Real-time updates from across the transparency movement</p>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard delay={0.3} className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{movementStats.totalPledges}</div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Total Pledges</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Employees committed to transparency</div>
                </GlassCard>
                
                <GlassCard delay={0.4} className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">{movementStats.totalTruthPoints}</div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Truth Points</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Earned through surveys and pledges</div>
                </GlassCard>
                
                <GlassCard delay={0.5} className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{movementStats.totalTruthTokens}</div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Truth Tokens</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Awarded for participation</div>
                </GlassCard>
                
                <GlassCard delay={0.6} className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">{movementStats.activeCompanies}</div>
                  <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Active Companies</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Champions of transparency</div>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Token Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard delay={0.3} className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Truth Token Distribution</h2>
              <p className="text-slate-600 dark:text-slate-400">How Truth Tokens are being earned across the movement</p>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(tokenSources).map(([source, amount]) => (
                  <div key={source} className="text-center p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{amount}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">{source} Tokens</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Company Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <GlassCard delay={0.4} className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Company Participation</h2>
              <p className="text-slate-600 dark:text-slate-400">See which companies are leading the transparency movement</p>
            </div>
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Companies */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-200">
                    Transparency Champions
                    <Badge className="ml-2 status-success">{optedInCompanies.length}</Badge>
                  </h3>
                  <div className="space-y-3">
                    {optedInCompanies.map((company) => (
                      <div key={company.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                        <div>
                          <h4 className="font-medium text-slate-800 dark:text-slate-200">{company.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{company.pledgeCount} pledges • {company.truthPointsTotal} points</p>
                        </div>
                        <Badge className="status-success">Champion</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Watchlist Companies */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-200">
                    Watchlist
                    <Badge variant="outline" className="ml-2">{watchlistCompanies.length}</Badge>
                  </h3>
                  <div className="space-y-3">
                    {watchlistCompanies.map((company) => (
                      <div key={company.id} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl">
                        <div>
                          <h4 className="font-medium text-slate-800 dark:text-slate-200">{company.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Not opted in</p>
                        </div>
                        <Badge variant="outline">Watchlist</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Employee Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <GlassCard delay={0.5} className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Employee Engagement</h2>
              <p className="text-slate-600 dark:text-slate-400">How employees are participating in the movement</p>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{employeeStats.totalEmployees}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Employees</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Registered in the system</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{employeeStats.pledgedEmployees}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Pledged Employees</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {Math.round((employeeStats.pledgedEmployees / employeeStats.totalEmployees) * 100)}% participation rate
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{Math.round(employeeStats.averageTruthPoints)}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Avg Truth Points</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Per employee</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Affiliate Program Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.6} className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Affiliate Program</h2>
              <p className="text-slate-600 dark:text-slate-400">Growth and impact of our referral program</p>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{affiliateStats.totalAffiliates}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Affiliates</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{affiliateStats.activeAffiliates}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Active Affiliates</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{affiliateStats.totalReferrals}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Referrals</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{affiliateStats.totalTokensEarned}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Tokens Earned</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Movement Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <GlassCard delay={0.7} className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Movement Impact</h2>
              <p className="text-slate-600 dark:text-slate-400">The collective impact of our transparency movement</p>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-green-900 dark:text-green-300">Positive Changes</h4>
                  <ul className="text-sm text-green-800 dark:text-green-300 space-y-2">
                    <li>• {movementStats.totalPledges} employees committed to transparency</li>
                    <li>• {movementStats.activeCompanies} companies earned transparency badges</li>
                    <li>• {movementStats.totalTruthPoints} Truth Points earned through surveys</li>
                    <li>• {affiliateStats.totalReferrals} new members through referrals</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300">Movement Goals</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                    <li>• Increase corporate transparency</li>
                    <li>• Promote ethical business practices</li>
                    <li>• Empower employee voices</li>
                    <li>• Build trust in corporate culture</li>
                  </ul>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <GlassCard delay={0.8} className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Join the Movement</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Be part of the change. Every pledge, every survey, every referral makes a difference.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/employee" className="btn-primary-lg text-center">
                  Take Employee Survey
                </a>
                <a href="/company" className="btn-secondary-lg text-center">
                  Company Dashboard
                </a>
                <a href="/affiliate" className="btn-secondary-lg text-center">
                  Join Affiliate Program
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
