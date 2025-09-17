'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Users, 
  Building2, 
  Share2, 
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';

interface RelatedAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  priority: 'high' | 'medium' | 'low';
}

interface RelatedActionsProps {
  currentPage: 'home' | 'employee' | 'company' | 'affiliate' | 'movement';
}

export default function RelatedActions({ currentPage }: RelatedActionsProps) {
  const getRelatedActions = (page: string): RelatedAction[] => {
    const actions: Record<string, RelatedAction[]> = {
      home: [
        {
          title: 'Take Employee Survey',
          description: 'Start your transparency journey by sharing your workplace experience',
          href: '/employee',
          icon: <Users className="w-5 h-5" />,
          badge: 'Recommended',
          badgeVariant: 'default',
          priority: 'high'
        },
        {
          title: 'Check Company Status',
          description: 'See if your company is part of the transparency movement',
          href: '/company',
          icon: <Building2 className="w-5 h-5" />,
          badge: 'Quick Check',
          badgeVariant: 'secondary',
          priority: 'high'
        }
      ],
      employee: [
        {
          title: 'Company Dashboard',
          description: 'View how your survey responses impact your company\'s transparency score',
          href: '/company',
          icon: <Building2 className="w-5 h-5" />,
          badge: 'Next Step',
          badgeVariant: 'default',
          priority: 'high'
        },
        {
          title: 'Movement Hub',
          description: 'See the global impact of transparency surveys like yours',
          href: '/movement',
          icon: <TrendingUp className="w-5 h-5" />,
          badge: 'View Impact',
          badgeVariant: 'secondary',
          priority: 'medium'
        },
        {
          title: 'Share with Colleagues',
          description: 'Help grow the movement by referring others to take the survey',
          href: '/affiliate',
          icon: <Share2 className="w-5 h-5" />,
          badge: 'Earn Rewards',
          badgeVariant: 'outline',
          priority: 'medium'
        }
      ],
      company: [
        {
          title: 'Encourage Employee Surveys',
          description: 'Share the survey with your team to improve your transparency score',
          href: '/employee',
          icon: <Users className="w-5 h-5" />,
          badge: 'Boost Score',
          badgeVariant: 'default',
          priority: 'high'
        },
        {
          title: 'Movement Hub',
          description: 'See how your company compares to others in the transparency movement',
          href: '/movement',
          icon: <TrendingUp className="w-5 h-5" />,
          badge: 'Compare',
          badgeVariant: 'secondary',
          priority: 'medium'
        },
        {
          title: 'Affiliate Program',
          description: 'Earn rewards by referring other companies to join the movement',
          href: '/affiliate',
          icon: <Share2 className="w-5 h-5" />,
          badge: 'Refer Companies',
          badgeVariant: 'outline',
          priority: 'low'
        }
      ],
      affiliate: [
        {
          title: 'Take Survey First',
          description: 'Complete the employee survey to better understand the platform',
          href: '/employee',
          icon: <Users className="w-5 h-5" />,
          badge: 'Recommended',
          badgeVariant: 'default',
          priority: 'high'
        },
        {
          title: 'Company Dashboard',
          description: 'Check your company\'s status before referring others',
          href: '/company',
          icon: <Building2 className="w-5 h-5" />,
          badge: 'Check Status',
          badgeVariant: 'secondary',
          priority: 'medium'
        },
        {
          title: 'Movement Hub',
          description: 'Track the impact of your referrals on the global movement',
          href: '/movement',
          icon: <TrendingUp className="w-5 h-5" />,
          badge: 'Track Impact',
          badgeVariant: 'secondary',
          priority: 'medium'
        }
      ],
      movement: [
        {
          title: 'Take Employee Survey',
          description: 'Contribute to the movement by sharing your workplace experience',
          href: '/employee',
          icon: <Users className="w-5 h-5" />,
          badge: 'Join Movement',
          badgeVariant: 'default',
          priority: 'high'
        },
        {
          title: 'Company Dashboard',
          description: 'See if your company is part of the transparency movement',
          href: '/company',
          icon: <Building2 className="w-5 h-5" />,
          badge: 'Check Company',
          badgeVariant: 'secondary',
          priority: 'high'
        },
        {
          title: 'Become an Affiliate',
          description: 'Help grow the movement and earn rewards through referrals',
          href: '/affiliate',
          icon: <Share2 className="w-5 h-5" />,
          badge: 'Earn Rewards',
          badgeVariant: 'outline',
          priority: 'medium'
        }
      ]
    };

    return actions[page] || [];
  };

  const relatedActions = getRelatedActions(currentPage);

  if (relatedActions.length === 0) return null;

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
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="heading-sm">Related Actions</CardTitle>
        <CardDescription className="text-lead">
          Continue your transparency journey with these recommended next steps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatedActions.map((action, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors group">
              <div className="flex items-center space-x-4 flex-1">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {action.title}
                    </h4>
                    {getPriorityIcon(action.priority)}
                    {action.badge && (
                      <Badge variant={action.badgeVariant} className="text-xs">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-small text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                <a href={action.href} className="flex items-center space-x-1">
                  <span>Go</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
