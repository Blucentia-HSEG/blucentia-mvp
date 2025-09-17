# Blucentia MVP

A transparency movement platform built with Next.js, TypeScript, and shadcn/ui.

## 🎯 Overview

Blucentia is a demo-first MVP that runs **fully on the frontend with mock data**. The platform enables employees and companies to participate in a transparency movement through surveys, pledges, and affiliate programs.

## 🚀 Features

- **Public Hub**: Homepage with live counters and company profiles
- **Employee Flow**: Survey submission → TruthPoints → pledge confirmation
- **Company Flow**: Dashboard with opt-in toggle and badge system
- **Affiliate Flow**: Referral link generator and stats tracking
- **Movement Hub**: Central dashboard showing overall movement progress

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React hooks with mock data services
- **Styling**: Tailwind CSS with custom design system

## 📁 Project Structure

```
blucentia-mvp/
├── src/                      # Next.js frontend
│   ├── app/                  # App Router pages
│   │   ├── page.tsx          # Homepage
│   │   ├── company/          # Company dashboard
│   │   ├── employee/         # Employee survey flow
│   │   ├── affiliate/        # Affiliate dashboard
│   │   └── movement/         # Movement hub
│   ├── components/           # shadcn/ui components
│   ├── lib/
│   │   └── mock/             # Mock data services
│   ├── styles/               # Global styles
│   └── types/                # TypeScript types
├── backend/                  # Backend placeholder (future)
└── public/                   # Static assets
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Demo Data

The application uses mock data services located in `src/lib/mock/`:

- **Companies**: Mock company profiles (opted-in vs watchlist)
- **Employees**: Survey questions and fake response submission
- **Affiliates**: Referral tracking and TruthTokens counters
- **Tokens**: TruthPoints and TruthTokens management

## 🎮 Demo Flows

### Employee Survey Flow
1. Navigate to `/employee`
2. Complete the transparency survey
3. Make a public pledge
4. Earn TruthPoints and see confirmation

### Company Dashboard
1. Navigate to `/company`
2. Select a company to view its dashboard
3. Toggle opt-in status to see badge changes
4. View employee participation stats

### Affiliate Program
1. Navigate to `/affiliate`
2. Create a new affiliate account
3. Generate referral links
4. Process referrals and earn TruthTokens

### Movement Hub
1. Navigate to `/movement`
2. View live statistics and counters
3. See company participation overview
4. Track overall movement progress

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

The application uses a custom design system built on:
- **Colors**: Blue primary theme with semantic color variants
- **Typography**: Inter font family with consistent sizing
- **Components**: shadcn/ui components with custom styling
- **Layout**: Responsive grid system with Tailwind CSS

## 🔮 Future Development

The backend folder contains a placeholder structure for future development:

- Replace mock data services with real API calls
- Implement authentication and authorization
- Add database persistence with Prisma
- Deploy to production environment

## 📝 License

This project is part of the Blucentia transparency movement MVP demonstration.