# Blucentia Backend

This directory contains the backend structure for the Blucentia transparency movement platform.

## Current Status

This is a **placeholder skeleton** for future backend development. The current MVP runs entirely on the frontend with mock data.

## Future Development

When ready to implement the backend, this structure will include:

- **API Routes**: REST/GraphQL endpoints for all frontend operations
- **Services**: Business logic for employees, companies, affiliates, and tokens
- **Models**: Database models and schemas
- **Authentication**: User authentication and authorization
- **Database**: Prisma ORM with PostgreSQL
- **Testing**: Comprehensive test suite

## Getting Started (Future)

1. Install dependencies: `npm install`
2. Set up environment variables: `cp .env.example .env`
3. Set up database: `npx prisma migrate dev`
4. Start development server: `npm run dev`

## Architecture

```
backend/
├── src/
│   ├── api/          # API route handlers
│   ├── services/     # Business logic
│   ├── models/       # Database models
│   ├── utils/        # Utilities and helpers
│   └── index.ts      # Entry point
├── prisma/           # Database schema and migrations
├── tests/            # Test suite
└── .env.example      # Environment variables template
```
