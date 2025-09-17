// Core entity types for Blucentia MVP

export interface Employee {
  id: string;
  name: string;
  email: string;
  companyId: string;
  department: string;
  position: string;
  truthPoints: number;
  hasPledged: boolean;
  pledgeDate?: Date;
  surveyResponses: SurveyResponse[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  isOptedIn: boolean;
  badgeUrl?: string;
  pledgeCount: number;
  truthPointsTotal: number;
  employees: Employee[];
  watchlistReason?: string;
  // Enhanced metrics for executive dashboard
  transparencyScore: number;
  ethicsScore: number;
  cultureScore: number;
  leadershipScore: number;
  overallScore: number;
  rank: number;
  certifications: Certification[];
  reports: CompanyReport[];
  recommendations: Recommendation[];
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
  benchmarkComparison: BenchmarkComparison;
  nextCertificate?: NextCertificate;
}

export interface NextCertificate {
  id: string;
  name: string;
  type: 'transparency' | 'ethics' | 'sustainability' | 'diversity' | 'governance';
  progress: number;
  requirements: string[];
  completedRequirements: string[];
  estimatedCompletion: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  type: 'transparency' | 'ethics' | 'sustainability' | 'diversity' | 'governance';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  earnedDate: Date;
  expiryDate?: Date;
  description: string;
  requirements: string[];
  badgeUrl: string;
}

export interface CompanyReport {
  id: string;
  title: string;
  type: 'monthly' | 'quarterly' | 'annual' | 'ad-hoc';
  period: string;
  generatedDate: Date;
  summary: string;
  keyFindings: string[];
  metrics: ReportMetric[];
  recommendations: string[];
  status: 'draft' | 'published' | 'archived';
}

export interface ReportMetric {
  name: string;
  value: number;
  previousValue?: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  unit: string;
  description: string;
}

export interface Recommendation {
  id: string;
  title: string;
  category: 'transparency' | 'ethics' | 'culture' | 'leadership' | 'compliance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  description: string;
  actionItems: string[];
  expectedImprovement: number;
  timeline: string;
  status: 'pending' | 'in-progress' | 'completed' | 'dismissed';
}

export interface BenchmarkComparison {
  industryAverage: number;
  topPerformer: number;
  peerGroup: number;
  percentile: number;
  performance: 'below-average' | 'average' | 'above-average' | 'excellent';
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referralCount: number;
  truthTokensEarned: number;
  joinDate: Date;
  isActive: boolean;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'scale' | 'text';
  options?: string[];
  required: boolean;
  category: 'transparency' | 'ethics' | 'culture' | 'leadership';
}

export interface SurveyResponse {
  questionId: string;
  answer: string | number;
  timestamp: Date;
}

export interface TruthToken {
  id: string;
  employeeId: string;
  amount: number;
  source: 'survey' | 'pledge' | 'referral' | 'bonus';
  timestamp: Date;
  description: string;
}

export interface Pledge {
  id: string;
  employeeId: string;
  companyId: string;
  timestamp: Date;
  isPublic: boolean;
  message?: string;
}

export interface MovementStats {
  totalPledges: number;
  totalTruthPoints: number;
  totalTruthTokens: number;
  activeCompanies: number;
  watchlistCompanies: number;
  totalEmployees: number;
}
