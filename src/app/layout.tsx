import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Link from 'next/link'
import { ThemeProvider } from '@/contexts/theme-context'
import Navigation from '@/components/navigation/Navigation'
import { Flame } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blucentia - Transparency Movement',
  description: 'Join the movement for corporate transparency and ethical business practices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-subtle dark:bg-gray-900">
            <Navigation />
            <main>
              {children}
            </main>
            <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-border/50">
              <div className="container-max section-padding py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <Flame className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Blucentia</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-md">
                      Building a more transparent corporate world, one pledge at a time. 
                      Join the movement for ethical business practices and corporate accountability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><Link href="/company" className="hover:text-primary transition-colors">Company Dashboard</Link></li>
                      <li><Link href="/employee" className="hover:text-primary transition-colors">Employee Survey</Link></li>
                      <li><Link href="/affiliate" className="hover:text-primary transition-colors">Affiliate Program</Link></li>
                      <li><Link href="/movement" className="hover:text-primary transition-colors">Movement Hub</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="#" className="hover:text-primary transition-colors">Transparency Guide</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Best Practices</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    © 2024 Blucentia. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
