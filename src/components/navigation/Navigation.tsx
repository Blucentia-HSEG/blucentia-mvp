'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/auth-context';
import { Home, Building2, Users, Share2, TrendingUp, Flame, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/companies', label: 'Companies', icon: Building2 },
  { href: '/employee', label: 'Survey', icon: Users },
  { href: '/affiliate', label: 'Affiliate', icon: Share2 },
  { href: '/movement', label: 'Movement', icon: TrendingUp },
];

const authenticatedNavigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/companies', label: 'Companies', icon: Building2 },
  { href: '/company', label: 'Dashboard', icon: User },
  { href: '/employee', label: 'Survey', icon: Users },
  { href: '/affiliate', label: 'Affiliate', icon: Share2 },
  { href: '/movement', label: 'Movement', icon: TrendingUp },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const currentNavItems = isAuthenticated ? authenticatedNavigationItems : navigationItems;

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
            <div className="hidden md:flex items-center space-x-1">
              {currentNavItems.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group whitespace-nowrap
                      ${isActive 
                        ? 'text-primary bg-primary/10 shadow-sm' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      }
                    `}
                  >
                    <span className="flex items-center space-x-1.5">
                      <IconComponent className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
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
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Link href="/login" className="flex items-center space-x-1.5">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
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
