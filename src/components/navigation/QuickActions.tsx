'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { 
  Users, 
  Building2, 
  Share2, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Clock
} from 'lucide-react';
import { getMovementStats } from '@/lib/mock/tokens';
import { useState, useEffect } from 'react';

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  priority: 'high' | 'medium' | 'low';
  color: string;
  shadowColor: string;
}

export default function QuickActions() {
  const [stats, setStats] = useState(getMovementStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getMovementStats());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const quickActions: QuickAction[] = [
    {
      title: 'Take Employee Survey',
      description: 'Share your experience and earn Truth Points',
      href: '/employee',
      icon: Users,
      badge: 'Most Popular',
      badgeVariant: 'default',
      priority: 'high',
      color: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/25'
    },
    {
      title: 'Company Dashboard',
      description: 'View transparency metrics and opt-in status',
      href: '/company',
      icon: Building2,
      badge: `${stats.activeCompanies} Active`,
      badgeVariant: 'secondary',
      priority: 'high',
      color: 'from-emerald-500 to-emerald-600',
      shadowColor: 'shadow-emerald-500/25'
    },
    {
      title: 'Join Affiliate Program',
      description: 'Earn Truth Tokens through referrals',
      href: '/affiliate',
      icon: Share2,
      badge: 'Earn Rewards',
      badgeVariant: 'outline',
      priority: 'medium',
      color: 'from-amber-500 to-amber-600',
      shadowColor: 'shadow-amber-500/25'
    },
    {
      title: 'Movement Hub',
      description: 'Track global progress and impact',
      href: '/movement',
      icon: TrendingUp,
      badge: 'Live Stats',
      badgeVariant: 'secondary',
      priority: 'medium',
      color: 'from-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/25'
    }
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-accent" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {quickActions.map((action, index) => {
        const IconComponent = action.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <GlassCard delay={index * 0.1} className="group h-full">
              <div className="p-6 text-center h-full flex flex-col">
                {/* Icon with gradient background */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg ${action.shadowColor} dark:${action.shadowColor}`}>
                  <IconComponent className="w-8 h-8 text-white" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
                  {action.description}
                </p>

                {/* Badge and Action */}
                <div className="flex items-center justify-between mt-auto">
                  {action.badge && (
                    <Badge variant={action.badgeVariant} className="text-xs">
                      {action.badge}
                    </Badge>
                  )}
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <a href={action.href} className="flex items-center space-x-1">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
