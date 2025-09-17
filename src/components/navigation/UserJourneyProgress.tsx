'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight,
  Target,
  Users,
  Building2,
  Share2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getMovementStats } from '@/lib/mock/tokens';
import { getEmployeeStats } from '@/lib/mock/employees';
import { getCompanyStats } from '@/lib/mock/companies';

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  completed: boolean;
  current: boolean;
  stats?: {
    label: string;
    value: number;
    total?: number;
  };
}

export default function UserJourneyProgress() {
  const [movementStats, setMovementStats] = useState(getMovementStats());
  const [employeeStats, setEmployeeStats] = useState(getEmployeeStats());
  const [companyStats, setCompanyStats] = useState(getCompanyStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setMovementStats(getMovementStats());
      setEmployeeStats(getEmployeeStats());
      setCompanyStats(getCompanyStats());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const journeySteps: JourneyStep[] = [
    {
      id: 'survey',
      title: 'Complete Survey',
      description: 'Share your workplace transparency experience',
      icon: <Users className="w-5 h-5" />,
      href: '/employee',
      completed: movementStats.totalPledges > 0,
      current: movementStats.totalPledges === 0,
      stats: {
        label: 'Surveys Completed',
        value: employeeStats.totalEmployees,
        total: employeeStats.totalEmployees + 100
      }
    },
    {
      id: 'pledge',
      title: 'Make Pledge',
      description: 'Commit to transparency in your workplace',
      icon: <Target className="w-5 h-5" />,
      href: '/employee',
      completed: movementStats.totalPledges > 0,
      current: movementStats.totalPledges === 0,
      stats: {
        label: 'Pledges Made',
        value: movementStats.totalPledges,
        total: movementStats.totalPledges + 50
      }
    },
    {
      id: 'company',
      title: 'Company Dashboard',
      description: 'View your company\'s transparency status',
      icon: <Building2 className="w-5 h-5" />,
      href: '/company',
      completed: companyStats.optedInCount > 0,
      current: companyStats.optedInCount === 0,
      stats: {
        label: 'Active Companies',
        value: companyStats.optedInCount,
        total: companyStats.totalCompanies
      }
    },
    {
      id: 'referral',
      title: 'Share & Refer',
      description: 'Help grow the transparency movement',
      icon: <Share2 className="w-5 h-5" />,
      href: '/affiliate',
      completed: false,
      current: false,
      stats: {
        label: 'Referrals',
        value: 0,
        total: 10
      }
    }
  ];

  const completedSteps = journeySteps.filter(step => step.completed).length;
  const totalSteps = journeySteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <GlassCard delay={0.1} className="group">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Your Transparency Journey</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track your progress in the transparency movement
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {completedSteps}/{totalSteps} Complete
            </Badge>
          </div>
          <div className="mb-6">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {progressPercentage.toFixed(0)}% of your journey complete
            </p>
          </div>
          <div className="space-y-4">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                step.completed 
                  ? 'bg-green-100 text-green-600' 
                  : step.current 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {step.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`font-semibold ${
                    step.completed ? 'text-green-700' : step.current ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </h4>
                  {step.current && (
                    <Badge variant="outline" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-small text-muted-foreground mb-2">
                  {step.description}
                </p>
                {step.stats && (
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{step.stats.label}: {step.stats.value}</span>
                    {step.stats.total && (
                      <span>Goal: {step.stats.total}</span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex-shrink-0">
                <a
                  href={step.href}
                  className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors ${
                    step.completed 
                      ? 'text-green-600 hover:text-green-700' 
                      : step.current 
                        ? 'text-primary hover:text-primary/80' 
                        : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <span>{step.completed ? 'View' : 'Start'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
