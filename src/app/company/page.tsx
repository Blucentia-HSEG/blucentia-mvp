'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScoringGauge, MultiScoreGauge } from '@/components/ui/scoring-gauge';
import { CompanyRanking } from '@/components/ui/company-ranking';
import { ReportsSection } from '@/components/ui/reports-section';
import { RecommendationsSection } from '@/components/ui/recommendations-section';
import { getCompanyById, toggleCompanyOptIn, getCompanyStats, mockCompanies } from '@/lib/mock/companies';
import { getEmployeesByCompany } from '@/lib/mock/employees';
import ContextualHelp from '@/components/navigation/ContextualHelp';
import RelatedActions from '@/components/navigation/RelatedActions';
import { AuthGuard } from '@/components/auth/auth-guard';
import { useAuth } from '@/contexts/auth-context';
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
  CheckCircle,
  User,
  Trophy,
  Medal,
  Clock,
  ArrowRight
} from 'lucide-react';

function CompanyDashboardContent() {
  const { user } = useAuth();
  const companyId = user?.companyId || '1';
  const [company, setCompany] = useState(getCompanyById(companyId));
  const [employees, setEmployees] = useState(getEmployeesByCompany(companyId));
  const [stats, setStats] = useState(getCompanyStats());

  // Helper function to get certification badge styling
  const getCertificationBadgeStyle = (level: string) => {
    switch (level) {
      case 'platinum':
        return "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-400";
      case 'gold':
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-400";
      case 'silver':
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-300";
      case 'bronze':
        return "bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-500";
      default:
        return "bg-slate-500 text-white border-slate-400";
    }
  };

  // Helper function to get certification icon
  const getCertificationIcon = (level: string) => {
    switch (level) {
      case 'platinum':
        return <Trophy className="w-3 h-3" />;
      case 'gold':
        return <Award className="w-3 h-3" />;
      case 'silver':
        return <Medal className="w-3 h-3" />;
      case 'bronze':
        return <Star className="w-3 h-3" />;
      default:
        return <CheckCircle className="w-3 h-3" />;
    }
  };

  useEffect(() => {
    const currentCompany = getCompanyById(companyId);
    setCompany(currentCompany);
    setEmployees(getEmployeesByCompany(companyId));
    setStats(getCompanyStats());
  }, [companyId]);

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
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.1} className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                {company?.name} Executive Dashboard
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Comprehensive transparency dashboard and performance metrics for your company
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Logged in as: <strong>{user?.name}</strong></span>
              </div>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Role: <strong className="capitalize">{user?.role}</strong></span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contextual Help */}
        <div className="mb-6">
          <ContextualHelp page="company" />
        </div>

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
                    {company?.name?.charAt(0) || 'C'}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{company?.name || 'Your Company'}</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {company?.industry || 'Industry'} • {company?.size?.charAt(0).toUpperCase() + company?.size?.slice(1) || 'Company'} Company
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      {company?.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : 
                       company?.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-500" /> : 
                       <Minus className="w-4 h-4 text-slate-400" />}
                      <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                        {company?.trend || 'stable'} trend
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Rank #{company?.rank || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Certifications and Next Loading Certificate */}
              <div className="flex flex-col items-end space-y-4">
                {/* Current Certifications */}
                <div className="text-right">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">HSEG Certifications</h3>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {company?.certifications?.slice(0, 3).map((cert) => (
                      <Badge
                        key={cert.id}
                        className={`${getCertificationBadgeStyle(cert.level)} text-xs px-3 py-1 flex items-center space-x-1`}
                      >
                        {getCertificationIcon(cert.level)}
                        <span>{cert.name}</span>
                      </Badge>
                    ))}
                    {company?.certifications && company.certifications.length > 3 && (
                      <Badge variant="outline" className="text-xs px-3 py-1">
                        +{company.certifications.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Next Loading Certificate Progress */}
                {company?.nextCertificate && (
                  <div className="text-right min-w-[200px]">
                    <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Next Certificate Progress</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{company.nextCertificate.name}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{company.nextCertificate.progress}%</span>
                      </div>
                      <Progress value={company.nextCertificate.progress} className="h-2 mb-2" />
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Complete {company.nextCertificate.requirements.length - company.nextCertificate.completedRequirements.length} more requirements</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{company.nextCertificate.estimatedCompletion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overall Score and Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-center sm:text-right">
                    <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                      {company?.overallScore || 0}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Overall Score</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {company?.benchmarkComparison?.percentile || 0}th percentile
                    </div>
                  </div>
                  <div>
                    {company?.isOptedIn ? (
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
                Detailed breakdown of your company's transparency and ethical performance
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ScoringGauge
                score={company?.transparencyScore || 0}
                label="Transparency"
                description="Open communication and reporting"
                size="md"
              />
              <ScoringGauge
                score={company?.ethicsScore || 0}
                label="Ethics"
                description="Moral business practices"
                size="md"
              />
              <ScoringGauge
                score={company?.cultureScore || 0}
                label="Culture"
                description="Workplace environment"
                size="md"
              />
              <ScoringGauge
                score={company?.leadershipScore || 0}
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
                {company?.isOptedIn 
                  ? `${company?.name} is actively participating in the transparency movement and leading by example.`
                  : `Join the transparency movement to earn ${company?.name}'s badge, improve your reputation, and demonstrate your commitment to ethical practices.`
                }
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between p-6 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-semibold mb-3 text-lg text-slate-800 dark:text-slate-200">Program Status</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {company?.isOptedIn 
                      ? `${company?.name}'s badge is prominently displayed on the public hub, showcasing your commitment to transparency and building trust with stakeholders.`
                      : `Opt in to display ${company?.name}'s badge and join other transparency champions in building a more ethical business environment.`
                    }
                  </p>
                </div>
                <div className="ml-6">
                  <Button
                    onClick={handleOptInToggle}
                    variant={company?.isOptedIn ? 'destructive' : 'default'}
                    className={company?.isOptedIn ? 'btn-destructive' : 'btn-primary'}
                    size="lg"
                  >
                    {company?.isOptedIn ? 'Opt Out' : 'Opt In'}
                  </Button>
                </div>
              </div>
              
              {company?.isOptedIn && company?.badgeUrl && (
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

        {/* Company Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <CompanyRanking 
            companies={mockCompanies} 
            currentCompanyId={companyId}
          />
        </motion.div>

        {/* Reports Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <ReportsSection reports={company?.reports || []} />
        </motion.div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <RecommendationsSection recommendations={company?.recommendations || []} />
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
                {company?.name} Employee Participation
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track which employees from your company have taken the survey and made pledges
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
                  <p className="text-slate-600 dark:text-slate-400">No employees from {company?.name} have participated yet.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    Encourage your employees to take the transparency survey.
                  </p>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Company Performance vs Movement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-8"
        >
          <GlassCard delay={0.9} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                {company?.name} vs Movement Overview
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                See how your company performs compared to the overall transparency movement
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{company?.pledgeCount || 0}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Your Company Pledges</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  of {stats.totalPledges} total
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{company?.truthPointsTotal || 0}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Your Truth Points</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  of {stats.totalTruthPoints} total
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{company?.rank || 'N/A'}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Your Ranking</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  of {stats.totalCompanies} companies
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{company?.benchmarkComparison?.percentile || 0}%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Percentile</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  industry performance
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Watchlist Information */}
        {!company?.isOptedIn && company?.watchlistReason && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-8"
          >
            <GlassCard delay={1.0} className="p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-orange-600 mb-2">
                  {company?.name} Watchlist Information
                </h3>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-6">
                <h4 className="font-medium text-orange-900 dark:text-orange-300 mb-3">
                  Why is {company?.name} on the watchlist?
                </h4>
                <p className="text-orange-800 dark:text-orange-300">{company?.watchlistReason}</p>
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

export default function CompanyDashboardPage() {
  return (
    <AuthGuard 
      requiredPermission="view_dashboard"
      requiredRole="executive"
    >
      <CompanyDashboardContent />
    </AuthGuard>
  );
}
