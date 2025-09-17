'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent } from '@/components/ui/card';
import { getCompanyById, toggleCompanyOptIn, getCompanyStats } from '@/lib/mock/companies';
import { getEmployeesByCompany } from '@/lib/mock/employees';
import ContextualHelp from '@/components/navigation/ContextualHelp';
import RelatedActions from '@/components/navigation/RelatedActions';

export default function CompanyDashboardPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState('1'); // Default to TechCorp
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
        setStats(getCompanyStats());
      }
    }
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Company Not Found</h2>
            <p className="text-muted-foreground">Please select a valid company.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10">
      <div className="container mx-auto px-6 py-20">
        {/* Company Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.1} className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Executive Dashboard</h2>
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

        {/* Contextual Help */}
        <div className="mb-6">
          <ContextualHelp page="company" />
        </div>

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard delay={0.2} className="p-8">
            <div className="flex items-center justify-between">
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
                </div>
              </div>
              <div className="text-right">
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
          </GlassCard>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <GlassCard delay={0.3} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{company.pledgeCount}</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Employee Pledges</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Committed to transparency</div>
          </GlassCard>
          
          <GlassCard delay={0.4} className="p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{company.truthPointsTotal}</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Total Truth Points</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Earned through participation</div>
          </GlassCard>
          
          <GlassCard delay={0.5} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{employees.length}</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Active Employees</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Engaged in the platform</div>
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
                  ? 'Your company is actively participating in the transparency movement and leading by example.'
                  : 'Join the transparency movement to earn your company badge, improve your reputation, and demonstrate your commitment to ethical practices.'
                }
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between p-6 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-semibold mb-3 text-lg text-slate-800 dark:text-slate-200">Program Status</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {company.isOptedIn 
                      ? 'Your company badge is prominently displayed on the public hub, showcasing your commitment to transparency and building trust with stakeholders.'
                      : 'Opt in to display your company badge and join other transparency champions in building a more ethical business environment.'
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
                    <div className="flex-1">
                      <h5 className="font-semibold text-green-900 dark:text-green-300 text-lg">Transparency Champion Badge</h5>
                      <p className="text-green-700 dark:text-green-300 mt-1">This prestigious badge is displayed on your public company profile, demonstrating your commitment to transparency and ethical business practices.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Employee List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <GlassCard delay={0.5} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Employee Participation</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track which employees have taken the survey and made pledges
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
                  <p className="text-slate-600 dark:text-slate-400">No employees have participated yet.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    Encourage your employees to take the transparency survey.
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.6} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Movement Overview</h3>
              <p className="text-slate-600 dark:text-slate-400">See how your company compares to the overall movement</p>
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
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-8"
          >
            <GlassCard delay={0.7} className="p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-orange-600 mb-2">Watchlist Information</h3>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-6">
                <h4 className="font-medium text-orange-900 dark:text-orange-300 mb-3">Why is your company on the watchlist?</h4>
                <p className="text-orange-800 dark:text-orange-300">{company.watchlistReason}</p>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-3">
                  Opting into the transparency program can help address these concerns and improve your company's reputation.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Related Actions */}
        <div className="mt-6">
          <RelatedActions currentPage="company" />
        </div>
      </div>
    </div>
  );
}
