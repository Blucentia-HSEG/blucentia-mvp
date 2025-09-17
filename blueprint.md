# Blucentia MVP Blueprint (Next.js + TypeScript + shadcn)

## 🎯 Scope

Demo-first MVP that runs **fully on the frontend with mock data**. Backend folder is included as a **placeholder skeleton** for future development but unused during the demo.

Cursor AI should build with:

* **Next.js (App Router, TypeScript)**
* **shadcn/ui + Tailwind CSS**
* **Mock data services in `src/lib/mock/`**
* Future-ready backend structure in `/backend/`

---

## 📂 Repo Structure

```
blucentia/
├── src/                      # Next.js frontend (demo build)
│   ├── app/                  # Next.js routes (public hub, flows)
│   │   ├── page.tsx          # Homepage
│   │   ├── company/          # Company profiles
│   │   ├── employee/         # Employee survey flow
│   │   ├── affiliate/        # Affiliate dashboard
│   │   └── movement/         # Movement hub
│   ├── components/           # shadcn/ui components
│   ├── lib/
│   │   └── mock/             # Mock data + fake services
│   │       ├── employees.ts
│   │       ├── companies.ts
│   │       ├── affiliates.ts
│   │       └── tokens.ts
│   ├── styles/               # Tailwind / global styles
│   └── types/                # TypeScript types (Employee, Company, etc.)
│
├── backend/                  # Reserved for later backend development
│   ├── src/
│   │   ├── api/              # REST/GraphQL handlers (future)
│   │   ├── services/         # Business logic (future)
│   │   ├── models/           # DB models (future)
│   │   ├── utils/            # Auth, errors, etc.
│   │   └── index.ts          # Entrypoint placeholder
│   ├── prisma/               # Future DB schema + migrations
│   ├── tests/                # Backend test suite
│   └── .env.example
│
├── scripts/                  # Optional setup scripts
├── public/                   # Static assets (logos, badges)
├── .env                      # Root env vars (frontend only for demo)
├── package.json              # Root dependencies (frontend + tooling only)
└── README.md
```

---

## 🔑 Demo Data Strategy

* **All demo flows pull from `src/lib/mock/*.ts`**
* Example: `companies.ts` exports mock company profiles (opted-in vs watchlist).
* Example: `employees.ts` exports survey questions + fake response submission.
* Example: `tokens.ts` handles TruthPoints and TruthTokens counters (local state only).

Cursor AI instructions updated so that **mock data is wired into pages and components directly**. No API routes yet.

---

## 🗂️ Development Milestones (Venturethon Slice)

1. Repo setup, Tailwind + shadcn config, global layout.
2. Public Hub (homepage, pledge counter, company profiles with mock data).
3. Employee Flow (survey → TruthPoints → pledge).
4. Company Flow (mock dashboard, opt-in toggle → badge on public profile).
5. Affiliate Flow lite (referral link generator + fake counters).
6. Integration — homepage counters pull from all mock modules.
7. QA + Demo polish.

---

## 📝 Cursor AI Prompting Guidelines

Each prompt should:

* Explicitly create a file at the path noted above.
* Import from `src/lib/mock/*.ts` for data.
* Use shadcn/ui for UI.
* Keep backend references as placeholders only.

### Example Prompt (Public Hub Homepage)

```
// Create file: src/app/page.tsx
// A homepage showing mission statement, pledge counter (from lib/mock/tokens),
// featured partners (from lib/mock/companies), and a watchlist preview.
// Use shadcn Card, Badge, Button components. Responsive grid layout.
```

---

## ✅ Goals and features for Demo

* Entire MVP runs without a backend, using only mock data.
* Public Hub: Displays pledge counter + 2 mock company profiles (one opted-in, one on watchlist).
* Employee Flow: Survey submission → TruthPoints increment → pledge confirmation.
* Company Flow: Dashboard mock → Opt-in toggle updates badge on profile.
* Affiliate Flow (lite): Shows referral link + fake stats.
* All counters update consistently across app (mock state).

---

## 🚀 Next Steps After Demo

* Replace `src/lib/mock/` services with real API calls.
* Move scoring logic + tokens into `/backend/` services.
* Add persistence layer (DB + Prisma in `/backend/`).
* Secure public/private flows with authentication.

