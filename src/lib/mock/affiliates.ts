import { Affiliate } from '@/types';

// Mock affiliate data
export const mockAffiliates: Affiliate[] = [
  {
    id: 'aff1',
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    referralCode: 'ALEX2024',
    referralCount: 12,
    truthTokensEarned: 240,
    joinDate: new Date('2024-01-01'),
    isActive: true
  },
  {
    id: 'aff2',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    referralCode: 'MARIA2024',
    referralCount: 8,
    truthTokensEarned: 160,
    joinDate: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: 'aff3',
    name: 'David Kim',
    email: 'david.kim@email.com',
    referralCode: 'DAVID2024',
    referralCount: 15,
    truthTokensEarned: 300,
    joinDate: new Date('2023-12-20'),
    isActive: true
  }
];

// Mock functions for affiliate operations
export const getAffiliateById = (id: string): Affiliate | undefined => {
  return mockAffiliates.find(affiliate => affiliate.id === id);
};

export const getAffiliateByCode = (code: string): Affiliate | undefined => {
  return mockAffiliates.find(affiliate => affiliate.referralCode === code);
};

export const createAffiliate = (name: string, email: string): Affiliate => {
  const referralCode = `${name.toUpperCase().substring(0, 5)}${new Date().getFullYear()}`;
  
  const newAffiliate: Affiliate = {
    id: `aff_${Date.now()}`,
    name,
    email,
    referralCode,
    referralCount: 0,
    truthTokensEarned: 0,
    joinDate: new Date(),
    isActive: true
  };
  
  mockAffiliates.push(newAffiliate);
  return newAffiliate;
};

export const processReferral = (referralCode: string): Affiliate | null => {
  const affiliate = getAffiliateByCode(referralCode);
  if (affiliate && affiliate.isActive) {
    affiliate.referralCount += 1;
    affiliate.truthTokensEarned += 20; // 20 tokens per referral
    return affiliate;
  }
  return null;
};

export const getAffiliateStats = () => {
  const activeAffiliates = mockAffiliates.filter(aff => aff.isActive);
  const totalReferrals = mockAffiliates.reduce((sum, aff) => sum + aff.referralCount, 0);
  const totalTokensEarned = mockAffiliates.reduce((sum, aff) => sum + aff.truthTokensEarned, 0);
  
  return {
    totalAffiliates: mockAffiliates.length,
    activeAffiliates: activeAffiliates.length,
    totalReferrals,
    totalTokensEarned,
    averageReferralsPerAffiliate: totalReferrals / mockAffiliates.length
  };
};

export const generateReferralLink = (affiliateCode: string): string => {
  // Use a relative path for SSR compatibility
  return `/employee?ref=${affiliateCode}`;
};
