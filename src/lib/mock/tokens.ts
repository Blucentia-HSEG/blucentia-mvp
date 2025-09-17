import { TruthToken, MovementStats } from '@/types';
import { getEmployeeStats } from './employees';
import { getCompanyStats } from './companies';
import { getAffiliateStats } from './affiliates';

// Mock TruthToken data
export const mockTruthTokens: TruthToken[] = [
  {
    id: 'token1',
    employeeId: 'emp1',
    amount: 50,
    source: 'survey',
    timestamp: new Date('2024-01-15'),
    description: 'Completed transparency survey'
  },
  {
    id: 'token2',
    employeeId: 'emp1',
    amount: 100,
    source: 'pledge',
    timestamp: new Date('2024-01-15'),
    description: 'Made transparency pledge'
  },
  {
    id: 'token3',
    employeeId: 'emp2',
    amount: 50,
    source: 'survey',
    timestamp: new Date('2024-01-20'),
    description: 'Completed transparency survey'
  },
  {
    id: 'token4',
    employeeId: 'emp2',
    amount: 100,
    source: 'pledge',
    timestamp: new Date('2024-01-20'),
    description: 'Made transparency pledge'
  },
  {
    id: 'token5',
    employeeId: 'emp3',
    amount: 50,
    source: 'survey',
    timestamp: new Date('2024-01-10'),
    description: 'Completed transparency survey'
  },
  {
    id: 'token6',
    employeeId: 'emp3',
    amount: 100,
    source: 'pledge',
    timestamp: new Date('2024-01-10'),
    description: 'Made transparency pledge'
  }
];

// Mock functions for token operations
export const getTokensByEmployee = (employeeId: string): TruthToken[] => {
  return mockTruthTokens.filter(token => token.employeeId === employeeId);
};

export const awardToken = (employeeId: string, amount: number, source: TruthToken['source'], description: string): TruthToken => {
  const newToken: TruthToken = {
    id: `token_${Date.now()}`,
    employeeId,
    amount,
    source,
    timestamp: new Date(),
    description
  };
  
  mockTruthTokens.push(newToken);
  return newToken;
};

export const getTotalTokensAwarded = (): number => {
  return mockTruthTokens.reduce((sum, token) => sum + token.amount, 0);
};

export const getTokensBySource = () => {
  const sources = mockTruthTokens.reduce((acc, token) => {
    acc[token.source] = (acc[token.source] || 0) + token.amount;
    return acc;
  }, {} as Record<string, number>);
  
  return sources;
};

// Global movement stats that aggregate from all mock services
export const getMovementStats = (): MovementStats => {
  const employeeStats = getEmployeeStats();
  const companyStats = getCompanyStats();
  const affiliateStats = getAffiliateStats();
  
  return {
    totalPledges: employeeStats.pledgedEmployees,
    totalTruthPoints: employeeStats.totalTruthPoints,
    totalTruthTokens: getTotalTokensAwarded(),
    activeCompanies: companyStats.optedInCount,
    watchlistCompanies: companyStats.watchlistCount,
    totalEmployees: employeeStats.totalEmployees
  };
};

// Counter functions for real-time updates
export const getPledgeCounter = (): number => {
  return getMovementStats().totalPledges;
};

export const getTruthPointsCounter = (): number => {
  return getMovementStats().totalTruthPoints;
};

export const getTruthTokensCounter = (): number => {
  return getMovementStats().totalTruthTokens;
};

export const getActiveCompaniesCounter = (): number => {
  return getMovementStats().activeCompanies;
};
