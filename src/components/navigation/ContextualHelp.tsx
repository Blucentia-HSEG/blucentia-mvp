'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Lightbulb, 
  ArrowRight,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { useState } from 'react';

interface HelpTip {
  id: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  type: 'tip' | 'success' | 'warning' | 'info';
  icon: React.ReactNode;
}

interface ContextualHelpProps {
  page: 'home' | 'employee' | 'company' | 'affiliate' | 'movement';
}

export default function ContextualHelp({ page }: ContextualHelpProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getHelpTips = (page: string): HelpTip[] => {
    const tips: Record<string, HelpTip[]> = {
      home: [
        {
          id: 'start-survey',
          title: 'Start with the Employee Survey',
          description: 'Complete the transparency survey to earn your first Truth Points and begin your journey.',
          action: {
            label: 'Take Survey',
            href: '/employee'
          },
          type: 'tip',
          icon: <Target className="w-5 h-5" />
        },
        {
          id: 'check-company',
          title: 'Check Your Company Status',
          description: 'See if your company is already part of the transparency movement or needs to opt-in.',
          action: {
            label: 'View Dashboard',
            href: '/company'
          },
          type: 'info',
          icon: <CheckCircle className="w-5 h-5" />
        }
      ],
      employee: [
        {
          id: 'survey-tips',
          title: 'Survey Tips',
          description: 'Be honest in your responses. Your feedback helps improve workplace transparency for everyone.',
          type: 'tip',
          icon: <Lightbulb className="w-5 h-5" />
        },
        {
          id: 'earn-points',
          title: 'Earn Truth Points',
          description: 'Complete the survey to earn 50 Truth Points, then make a pledge for 100 more points.',
          type: 'success',
          icon: <CheckCircle className="w-5 h-5" />
        }
      ],
      company: [
        {
          id: 'opt-in-benefits',
          title: 'Opt-in Benefits',
          description: 'Companies that opt-in receive transparency badges and improved reputation scores.',
          type: 'info',
          icon: <CheckCircle className="w-5 h-5" />
        },
        {
          id: 'employee-engagement',
          title: 'Employee Engagement',
          description: 'Encourage your employees to take the survey to improve your company\'s transparency score.',
          type: 'tip',
          icon: <Target className="w-5 h-5" />
        }
      ],
      affiliate: [
        {
          id: 'referral-rewards',
          title: 'Referral Rewards',
          description: 'Earn 20 Truth Tokens for each successful referral. Share your unique link with colleagues.',
          type: 'success',
          icon: <CheckCircle className="w-5 h-5" />
        },
        {
          id: 'track-performance',
          title: 'Track Performance',
          description: 'Monitor your referral success rate and earnings in the affiliate dashboard.',
          type: 'info',
          icon: <Clock className="w-5 h-5" />
        }
      ],
      movement: [
        {
          id: 'global-impact',
          title: 'Global Impact',
          description: 'View real-time statistics showing the collective impact of the transparency movement.',
          type: 'info',
          icon: <Target className="w-5 h-5" />
        },
        {
          id: 'join-community',
          title: 'Join the Community',
          description: 'Share your progress and connect with others committed to corporate transparency.',
          type: 'tip',
          icon: <Lightbulb className="w-5 h-5" />
        }
      ]
    };

    return tips[page] || [];
  };

  const helpTips = getHelpTips(page);

  if (helpTips.length === 0) return null;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-accent/10 border-accent/20 text-accent';
    }
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="heading-sm">Helpful Tips</CardTitle>
              <CardDescription className="text-small">
                Get the most out of your transparency journey
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-primary"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            {helpTips.map((tip) => (
              <div key={tip.id} className={`p-4 rounded-xl border ${getTypeStyles(tip.type)}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {tip.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-2">{tip.title}</h4>
                    <p className="text-small mb-3">{tip.description}</p>
                    {tip.action && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        <a href={tip.action.href} className="flex items-center space-x-1">
                          <span>{tip.action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
