import { Company, Employee, Certification, CompanyReport, Recommendation, BenchmarkComparison, NextCertificate } from '@/types';

// Mock certifications data
const mockCertifications: Certification[] = [
  {
    id: 'cert1',
    name: 'Transparency Champion',
    type: 'transparency',
    level: 'platinum',
    earnedDate: new Date('2024-01-15'),
    description: 'Excellence in corporate transparency and open communication',
    requirements: ['90%+ employee participation', 'Monthly transparency reports', 'Public pledge commitment'],
    badgeUrl: '/badges/transparency-champion.png'
  },
  {
    id: 'cert2',
    name: 'Ethical Leadership',
    type: 'ethics',
    level: 'gold',
    earnedDate: new Date('2024-01-10'),
    description: 'Demonstrated commitment to ethical business practices',
    requirements: ['Code of ethics implementation', 'Ethics training completion', 'Whistleblower protection'],
    badgeUrl: '/badges/ethical-leadership.png'
  },
  {
    id: 'cert3',
    name: 'Diversity Excellence',
    type: 'diversity',
    level: 'silver',
    earnedDate: new Date('2024-01-05'),
    description: 'Commitment to diversity, equity, and inclusion',
    requirements: ['Diverse hiring practices', 'Inclusive policies', 'Regular DEI training'],
    badgeUrl: '/badges/diversity-excellence.png'
  }
];

// Mock next certificate data
const mockNextCertificate: NextCertificate = {
  id: 'next-cert-1',
  name: 'Sustainability Excellence',
  type: 'sustainability',
  progress: 65,
  requirements: [
    'Implement carbon footprint tracking',
    'Achieve 50% renewable energy usage',
    'Complete sustainability audit',
    'Establish green procurement policies',
    'Employee sustainability training'
  ],
  completedRequirements: [
    'Implement carbon footprint tracking',
    'Complete sustainability audit',
    'Employee sustainability training'
  ],
  estimatedCompletion: '~2 weeks',
  description: 'Demonstrate commitment to environmental responsibility and sustainable business practices'
};

// Mock reports data
const mockReports: CompanyReport[] = [
  {
    id: 'report1',
    title: 'Q4 2024 Transparency Report',
    type: 'quarterly',
    period: 'Q4 2024',
    generatedDate: new Date('2024-01-01'),
    summary: 'Strong performance across all transparency metrics with notable improvements in employee engagement.',
    keyFindings: [
      'Employee participation increased by 15%',
      'Transparency score improved to 87/100',
      'New ethics training program launched successfully'
    ],
    metrics: [
      {
        name: 'Employee Participation Rate',
        value: 87,
        previousValue: 72,
        change: 15,
        changeType: 'increase',
        unit: '%',
        description: 'Percentage of employees who completed the transparency survey'
      },
      {
        name: 'Transparency Score',
        value: 87,
        previousValue: 82,
        change: 5,
        changeType: 'increase',
        unit: 'points',
        description: 'Overall transparency score out of 100'
      }
    ],
    recommendations: [
      'Continue employee engagement initiatives',
      'Expand transparency reporting to include sustainability metrics',
      'Implement quarterly town halls for open communication'
    ],
    status: 'published'
  }
];

// Mock recommendations data
const mockRecommendations: Recommendation[] = [
  {
    id: 'rec1',
    title: 'Implement Real-time Transparency Dashboard',
    category: 'transparency',
    priority: 'high',
    impact: 'high',
    effort: 'medium',
    description: 'Create a public-facing dashboard showing real-time company metrics and performance indicators.',
    actionItems: [
      'Design dashboard interface',
      'Integrate with existing data sources',
      'Implement security measures',
      'Launch public beta testing'
    ],
    expectedImprovement: 12,
    timeline: '3 months',
    status: 'pending'
  },
  {
    id: 'rec2',
    title: 'Enhance Ethics Training Program',
    category: 'ethics',
    priority: 'medium',
    impact: 'medium',
    effort: 'low',
    description: 'Expand the current ethics training to include more interactive scenarios and case studies.',
    actionItems: [
      'Develop new training modules',
      'Create interactive scenarios',
      'Schedule training sessions',
      'Track completion rates'
    ],
    expectedImprovement: 8,
    timeline: '2 months',
    status: 'in-progress'
  }
];

// Mock company data with enhanced metrics
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
    transparencyScore: 87,
    ethicsScore: 92,
    cultureScore: 85,
    leadershipScore: 89,
    overallScore: 88,
    rank: 2,
    certifications: mockCertifications,
    reports: mockReports,
    recommendations: mockRecommendations,
    lastUpdated: new Date('2024-01-15'),
    trend: 'up',
    benchmarkComparison: {
      industryAverage: 72,
      topPerformer: 95,
      peerGroup: 78,
      percentile: 85,
      performance: 'above-average'
    },
    nextCertificate: mockNextCertificate,
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
    transparencyScore: 45,
    ethicsScore: 52,
    cultureScore: 38,
    leadershipScore: 41,
    overallScore: 44,
    rank: 15,
    certifications: [],
    reports: [],
    recommendations: [
      {
        id: 'rec3',
        title: 'Address Employee Turnover Issues',
        category: 'culture',
        priority: 'critical',
        impact: 'high',
        effort: 'high',
        description: 'Implement measures to improve employee retention and address workplace culture concerns.',
        actionItems: [
          'Conduct exit interviews',
          'Implement employee feedback system',
          'Review management practices',
          'Develop retention strategies'
        ],
        expectedImprovement: 20,
        timeline: '6 months',
        status: 'pending'
      }
    ],
    lastUpdated: new Date('2024-01-10'),
    trend: 'down',
    benchmarkComparison: {
      industryAverage: 68,
      topPerformer: 89,
      peerGroup: 65,
      percentile: 25,
      performance: 'below-average'
    },
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
    transparencyScore: 94,
    ethicsScore: 96,
    cultureScore: 91,
    leadershipScore: 93,
    overallScore: 94,
    rank: 1,
    certifications: [
      {
        id: 'cert4',
        name: 'Governance Excellence',
        type: 'governance',
        level: 'platinum',
        earnedDate: new Date('2024-01-12'),
        description: 'Outstanding corporate governance practices',
        requirements: ['Independent board', 'Audit committee', 'Risk management framework'],
        badgeUrl: '/badges/governance-excellence.png'
      }
    ],
    reports: [],
    recommendations: [],
    lastUpdated: new Date('2024-01-12'),
    trend: 'stable',
    benchmarkComparison: {
      industryAverage: 75,
      topPerformer: 94,
      peerGroup: 82,
      percentile: 95,
      performance: 'excellent'
    },
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
