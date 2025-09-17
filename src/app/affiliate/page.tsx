'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { mockAffiliates, createAffiliate, processReferral, getAffiliateStats, generateReferralLink } from '@/lib/mock/affiliates';

export default function AffiliateDashboardPage() {
  const [affiliates, setAffiliates] = useState(mockAffiliates);
  const [stats, setStats] = useState(getAffiliateStats());
  const [newAffiliate, setNewAffiliate] = useState({ name: '', email: '' });
  const [referralCode, setReferralCode] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    setStats(getAffiliateStats());
  }, [affiliates]);

  const handleCreateAffiliate = () => {
    if (newAffiliate.name && newAffiliate.email) {
      const affiliate = createAffiliate(newAffiliate.name, newAffiliate.email);
      setAffiliates([...affiliates, affiliate]);
      setNewAffiliate({ name: '', email: '' });
      setShowCreateForm(false);
    }
  };

  const handleProcessReferral = () => {
    if (referralCode) {
      const affiliate = processReferral(referralCode);
      if (affiliate) {
        setAffiliates([...affiliates]);
        setReferralCode('');
        alert(`Referral processed! ${affiliate.name} earned 20 Truth Tokens.`);
      } else {
        alert('Invalid referral code or affiliate not found.');
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10">
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.1} className="p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">Affiliate Program</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Earn Truth Tokens by referring new members to the transparency movement. 
                Build your network while contributing to corporate accountability.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <GlassCard delay={0.2} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stats.totalAffiliates}</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Total Affiliates</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Registered in program</div>
          </GlassCard>
          
          <GlassCard delay={0.3} className="p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{stats.activeAffiliates}</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Active Affiliates</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Currently referring</div>
          </GlassCard>
          
          <GlassCard delay={0.4} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{stats.totalReferrals}</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Total Referrals</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Successful conversions</div>
          </GlassCard>
          
          <GlassCard delay={0.5} className="p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{stats.totalTokensEarned}</div>
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-200">Tokens Earned</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Through referrals</div>
          </GlassCard>
        </motion.div>

        {/* Create New Affiliate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard delay={0.3} className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Join the Affiliate Program</h3>
                <p className="text-slate-600 dark:text-slate-400">Create a new affiliate account to start earning Truth Tokens</p>
              </div>
              <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? 'Cancel' : 'Create Affiliate'}
              </Button>
            </div>
            {showCreateForm && (
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newAffiliate.name}
                      onChange={(e) => setNewAffiliate({ ...newAffiliate, name: e.target.value })}
                      className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newAffiliate.email}
                      onChange={(e) => setNewAffiliate({ ...newAffiliate, email: e.target.value })}
                      className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <Button onClick={handleCreateAffiliate} className="w-full btn-primary">
                    Create Affiliate Account
                  </Button>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Process Referral */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <GlassCard delay={0.4} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Process Referral</h3>
              <p className="text-slate-600 dark:text-slate-400">Enter a referral code to award Truth Tokens to an affiliate</p>
            </div>
            <div>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="flex-1 p-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50"
                  placeholder="Enter referral code (e.g., ALEX2024)"
                />
                <Button onClick={handleProcessReferral} className="btn-primary">
                  Process Referral
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Affiliate List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <GlassCard delay={0.5} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Affiliate Directory</h3>
              <p className="text-slate-600 dark:text-slate-400">View all affiliates and their performance</p>
            </div>
            <div>
              <div className="space-y-4">
                {affiliates.map((affiliate) => (
                  <div key={affiliate.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-slate-800 dark:text-slate-200">{affiliate.name}</h4>
                        {affiliate.isActive ? (
                          <Badge className="status-success">Active</Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{affiliate.email}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Joined: {affiliate.joinDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {affiliate.referralCount} referrals
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {affiliate.truthTokensEarned} Truth Tokens
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Code: {affiliate.referralCode}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateReferralLink(affiliate.referralCode))}
                        className="btn-secondary"
                      >
                        Copy Link
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <GlassCard delay={0.6} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">How the Affiliate Program Works</h3>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <h4 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Create Account</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sign up as an affiliate to get your unique referral code
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                  </div>
                  <h4 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Share Your Link</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Share your referral link with friends and colleagues
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                  </div>
                  <h4 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Earn Tokens</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Earn 20 Truth Tokens for each successful referral
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Program Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <GlassCard delay={0.7} className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Program Benefits</h3>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-900 dark:text-green-300">For Affiliates</h4>
                  <ul className="text-sm text-green-800 dark:text-green-300 space-y-2">
                    <li>• Earn 20 Truth Tokens per referral</li>
                    <li>• Track your referral performance</li>
                    <li>• Access to exclusive affiliate resources</li>
                    <li>• Recognition in the movement</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300">For Referrals</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                    <li>• Join the transparency movement</li>
                    <li>• Take the employee survey</li>
                    <li>• Make a transparency pledge</li>
                    <li>• Earn Truth Points and Tokens</li>
                  </ul>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
