'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Home, Building2, Users, Share2, TrendingUp, Flame } from 'lucide-react';

const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/company', label: 'Companies', icon: Building2 },
  { href: '/employee', label: 'Employee Survey', icon: Users },
  { href: '/affiliate', label: 'Affiliate Program', icon: Share2 },
  { href: '/movement', label: 'Movement', icon: TrendingUp },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container-max section-padding">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <Flame className="w-8 h-8 text-primary group-hover:scale-105 transition-transform duration-200" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Blucentia
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? 'text-primary bg-primary/10 shadow-sm' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      }
                    `}
                  >
                    <span className="flex items-center space-x-2">
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/employee" className="btn-executive">
              Join Movement
            </Link>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
