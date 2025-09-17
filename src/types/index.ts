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
