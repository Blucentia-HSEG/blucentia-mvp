import { Company, Employee } from '@/types';

// Mock company data
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo: '/logos/techcorp.png',
    industry: 'Technology',
    size: 'large',
    isOptedIn: true,
    badgeUrl: '/badges/transparency-champion.png',
    pledgeCount: 45,
    truthPointsTotal: 1250,
    employees: [
      {
        id: 'emp1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        companyId: '1',
        department: 'Engineering',
        position: 'Senior Developer',
        truthPoints: 150,
        hasPledged: true,
        pledgeDate: new Date('2024-01-15'),
        surveyResponses: []
      },
      {
        id: 'emp2',
        name: 'Mike Chen',
        email: 'mike.chen@techcorp.com',
        companyId: '1',
        department: 'Product',
        position: 'Product Manager',
        truthPoints: 120,
        hasPledged: true,
        pledgeDate: new Date('2024-01-20'),
        surveyResponses: []
      }
    ]
  },
  {
    id: '2',
    name: 'GreenEnergy Inc',
    logo: '/logos/greenenergy.png',
    industry: 'Renewable Energy',
    size: 'medium',
    isOptedIn: false,
    pledgeCount: 0,
    truthPointsTotal: 0,
    employees: [],
    watchlistReason: 'High employee turnover, transparency concerns raised by former employees'
  },
  {
    id: '3',
    name: 'FinanceFirst',
    logo: '/logos/financefirst.png',
    industry: 'Financial Services',
    size: 'enterprise',
    isOptedIn: true,
    badgeUrl: '/badges/transparency-champion.png',
    pledgeCount: 78,
    truthPointsTotal: 2100,
    employees: [
      {
        id: 'emp3',
        name: 'Lisa Rodriguez',
        email: 'lisa.rodriguez@financefirst.com',
        companyId: '3',
        department: 'Compliance',
        position: 'Compliance Officer',
        truthPoints: 200,
        hasPledged: true,
        pledgeDate: new Date('2024-01-10'),
        surveyResponses: []
      }
    ]
  }
];

// Mock functions for company operations
export const getCompanyById = (id: string): Company | undefined => {
  return mockCompanies.find(company => company.id === id);
};

export const getOptedInCompanies = (): Company[] => {
  return mockCompanies.filter(company => company.isOptedIn);
};

export const getWatchlistCompanies = (): Company[] => {
  return mockCompanies.filter(company => !company.isOptedIn);
};

export const toggleCompanyOptIn = (companyId: string): Company | null => {
  const company = mockCompanies.find(c => c.id === companyId);
  if (company) {
    company.isOptedIn = !company.isOptedIn;
    if (company.isOptedIn) {
      company.badgeUrl = '/badges/transparency-champion.png';
    } else {
      company.badgeUrl = undefined;
    }
    return company;
  }
  return null;
};

export const getCompanyStats = () => {
  const optedIn = getOptedInCompanies();
  const watchlist = getWatchlistCompanies();
  
  return {
    totalCompanies: mockCompanies.length,
    optedInCount: optedIn.length,
    watchlistCount: watchlist.length,
    totalPledges: mockCompanies.reduce((sum, company) => sum + company.pledgeCount, 0),
    totalTruthPoints: mockCompanies.reduce((sum, company) => sum + company.truthPointsTotal, 0)
  };
};
