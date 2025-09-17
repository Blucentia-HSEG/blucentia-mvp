'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent } from '@/components/ui/card';
import { ScoringGauge, MultiScoreGauge } from '@/components/ui/scoring-gauge';
import { CompanyRanking } from '@/components/ui/company-ranking';
import { ReportsSection } from '@/components/ui/reports-section';
import { RecommendationsSection } from '@/components/ui/recommendations-section';
import { getCompanyById, toggleCompanyOptIn, getCompanyStats, mockCompanies } from '@/lib/mock/companies';
import { getEmployeesByCompany } from '@/lib/mock/employees';
import ContextualHelp from '@/components/navigation/ContextualHelp';
import RelatedActions from '@/components/navigation/RelatedActions';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Award, 
  Target, 
  BarChart3,
  Users,
  Shield,
  Star,
  CheckCircle
} from 'lucide-react';

export default function CompaniesPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState('1');
  const [company, setCompany] = useState(getCompanyById(selectedCompanyId));
  const [employees, setEmployees] = useState(getEmployeesByCompany(selectedCompanyId));
  const [stats, setStats] = useState(getCompanyStats());

  useEffect(() => {
    const currentCompany = getCompanyById(selectedCompanyId);
    setCompany(currentCompany);
    setEmployees(getEmployeesByCompany(selectedCompanyId));
    setStats(getCompanyStats());
  }, [selectedCompanyId]);

  const handleOptInToggle = () => {
    if (company) {
      const updatedCompany = toggleCompanyOptIn(company.id);
      if (updatedCompany) {
        setCompany(updatedCompany);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10">
      <div className="container mx-auto px-6 py-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.1} className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">Companies Hub</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Explore transparency scores, rankings, and performance metrics of companies in the movement
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contextual Help */}
        <div className="mb-6">
          <ContextualHelp page="companies" />
        </div>

        {/* Company Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.1} className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Explore Companies</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Choose a company to view its comprehensive transparency dashboard and performance metrics
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedCompanyId === '1' ? 'default' : 'outline'}
                  onClick={() => setSelectedCompanyId('1')}
                  className={selectedCompanyId === '1' ? 'btn-primary' : 'btn-secondary'}
                >
                  TechCorp Solutions
                </Button>
                <Button
                  variant={selectedCompanyId === '2' ? 'default' : 'outline'}
                  onClick={() => setSelectedCompanyId('2')}
                  className={selectedCompanyId === '2' ? 'btn-primary' : 'btn-secondary'}
                >
                  GreenEnergy Inc
                </Button>
                <Button
                  variant={selectedCompanyId === '3' ? 'default' : 'outline'}
                  onClick={() => setSelectedCompanyId('3')}
                  className={selectedCompanyId === '3' ? 'btn-primary' : 'btn-secondary'}
                >
                  FinanceFirst
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Company Header with Enhanced Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard delay={0.2} className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {company.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{company.name}</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {company.industry} • {company.size.charAt(0).toUpperCase() + company.size.slice(1)} Company
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      {company.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : 
                       company.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-500" /> : 
                       <Minus className="w-4 h-4 text-slate-400" />}
                      <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                        {company.trend} trend
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Rank #{company.rank}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-center sm:text-right">
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {company.overallScore}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Overall Score</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {company.benchmarkComparison.percentile}th percentile
                  </div>
                </div>
                <div>
                  {company.isOptedIn ? (
                    <span className="status-success text-lg px-6 py-3">
                      Transparency Champion
                    </span>
                  ) : (
                    <span className="status-warning text-lg px-6 py-3">
                      Not Opted In
                    </span>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scoring Gauges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard delay={0.3} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Performance Metrics</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Detailed breakdown of {company.name}'s transparency and ethical performance
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ScoringGauge
                score={company.transparencyScore}
                label="Transparency"
                description="Open communication and reporting"
                size="md"
              />
              <ScoringGauge
                score={company.ethicsScore}
                label="Ethics"
                description="Moral business practices"
                size="md"
              />
              <ScoringGauge
                score={company.cultureScore}
                label="Culture"
                description="Workplace environment"
                size="md"
              />
              <ScoringGauge
                score={company.leadershipScore}
                label="Leadership"
                description="Executive accountability"
                size="md"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Opt-in Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <GlassCard delay={0.4} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">Transparency Program Status</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {company.isOptedIn 
                  ? `${company.name} is actively participating in the transparency movement and leading by example.`
                  : `${company.name} can join the transparency movement to earn their company badge, improve their reputation, and demonstrate their commitment to ethical practices.`
                }
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between p-6 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-semibold mb-3 text-lg text-slate-800 dark:text-slate-200">Program Status</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {company.isOptedIn 
                      ? `${company.name}'s badge is prominently displayed on the public hub, showcasing their commitment to transparency and building trust with stakeholders.`
                      : `${company.name} can opt in to display their badge and join other transparency champions in building a more ethical business environment.`
                    }
                  </p>
                </div>
                <div className="ml-6">
                  <Button
                    onClick={handleOptInToggle}
                    variant={company.isOptedIn ? 'destructive' : 'default'}
                    className={company.isOptedIn ? 'btn-destructive' : 'btn-primary'}
                    size="lg"
                  >
                    {company.isOptedIn ? 'Opt Out' : 'Opt In'}
                  </Button>
                </div>
              </div>
              
              {company.isOptedIn && company.badgeUrl && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-700 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Transparency Badge Earned</h4>
                      <p className="text-green-800 dark:text-green-300 text-sm">
                        {company.name} has successfully earned their transparency badge and is now a recognized champion of ethical business practices.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Company Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <CompanyRanking 
            companies={mockCompanies} 
            currentCompanyId={selectedCompanyId}
          />
        </motion.div>

        {/* Reports Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <ReportsSection reports={company.reports} />
        </motion.div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <RecommendationsSection recommendations={company.recommendations} />
        </motion.div>

        {/* Employee Participation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <GlassCard delay={0.8} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                {company.name} Employee Participation
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track which employees from {company.name} have taken the survey and made pledges
              </p>
            </div>
            <div>
              {employees.length > 0 ? (
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50">
                      <div>
                        <h4 className="font-medium text-slate-800 dark:text-slate-200">{employee.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{employee.position} • {employee.department}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{employee.truthPoints} Truth Points</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {employee.surveyResponses.length} survey responses
                          </div>
                        </div>
                        {employee.hasPledged ? (
                          <Badge className="status-success">
                            Pledged
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            No Pledge
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 dark:text-slate-400">No employees from {company.name} have participated yet.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    Encourage employees to take the transparency survey.
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-8"
        >
          <GlassCard delay={0.9} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Movement Overview</h3>
              <p className="text-slate-600 dark:text-slate-400">See how the transparency movement is growing</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalCompanies}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.optedInCount}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Active Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalPledges}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Pledges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.totalTruthPoints}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Truth Points</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Watchlist Information */}
        {!company.isOptedIn && company.watchlistReason && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-8"
          >
            <GlassCard delay={1.0} className="p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-orange-600 mb-2">
                  {company.name} Watchlist Information
                </h3>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-6">
                <h4 className="font-medium text-orange-900 dark:text-orange-300 mb-3">
                  Why is {company.name} on the watchlist?
                </h4>
                <p className="text-orange-800 dark:text-orange-300">{company.watchlistReason}</p>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-3">
                  Opting into the transparency program can help address these concerns and improve the company's reputation.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Related Actions */}
        <div className="mt-6">
          <RelatedActions currentPage="companies" />
        </div>
      </div>
    </div>
  );
}
