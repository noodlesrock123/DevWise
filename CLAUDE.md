# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevWise is a multi-user SaaS construction intelligence platform for property developers and general contractors. Currently in Phase 1, it provides secure foundation with intelligent proposal extraction using Claude API.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Supabase (PostgreSQL + Auth + Storage), Anthropic Claude API (claude-sonnet-4-5-20250929), Tailwind CSS + shadcn/ui

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Environment Setup

Required environment variables in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Architecture Overview

### Authentication Flow
- **Server-side auth:** Use `createServerClient()` from `lib/supabase-server.ts` for Server Components and API routes
- **Client-side auth:** Use `createClient()` from `lib/supabase-client.ts` for Client Components
- **Middleware protection:** `middleware.ts` redirects unauthenticated users away from `/dashboard/*` routes and authenticated users away from `/login` and `/signup`
- **Auth helpers:** Use `requireAuth()` in API routes to enforce authentication and get current user

### Database Schema (Row Level Security Enforced)
All tables enforce user-specific access via RLS policies. Schema in `supabase-phase1-schema.sql`:

- **projects:** Core project data with comprehensive site characteristics (topography, soil, utilities, etc.)
- **parties:** Contractors, subcontractors, suppliers (unique per project+name)
- **proposals:** File uploads linked to projects, tracks extraction status
- **line_items:** Extracted line items from proposals, with edit history tracking

Key relationships:
- Projects → Proposals (one-to-many)
- Proposals → Line Items (one-to-many)
- Parties → Line Items (one-to-many, tracks which party is responsible)

### File Upload and AI Extraction Pipeline

**Upload flow** (`app/api/proposals/upload/route.ts`):
1. Validate file type (PDF/Excel only, max 10MB)
2. Upload to Supabase Storage at `{user_id}/{timestamp}-{filename}`
3. Create proposal record with `extraction_status: 'pending'`

**Extraction flow** (`app/api/proposals/[id]/extract/route.ts`):
1. Download file from Supabase Storage
2. Extract text (pdf-parse for PDF, xlsx for Excel)
3. Send to Claude API with structured prompt requesting JSON format
4. Parse Claude's response to extract line items
5. Auto-create party record if contractor doesn't exist
6. Bulk insert line items with party attribution
7. Update proposal with `extraction_status: 'completed'` and `total_amount`

**IMPORTANT:** Phase 1 extraction route does NOT track API costs. This will be retrofitted in Phase 2 Step 1.

### Edit History Tracking

Line items preserve original values when edited:
- `is_edited` flag marks modified items
- `original_*` columns store first extracted values
- Original values never change on subsequent edits
- UI shows "(edited)" indicator for modified items

### Path Aliases

Configured in `tsconfig.json` and `components.json`:
- `@/*` → root directory
- `@/components` → components directory
- `@/lib` → lib directory
- `@/hooks` → hooks directory

### UI Components

Uses shadcn/ui (new-york style) with Tailwind CSS. Component config in `components.json`. Custom components:
- `UploadProposalButton.tsx`: Handles file upload with real-time extraction progress
- `ProposalCard.tsx`: Displays proposal status with color-coded extraction states
- `LineItemRow.tsx`: Shows line item with edit history indicator

## Key Implementation Patterns

### Server Components with Auth
```typescript
import { requireAuth, createServerClient } from '@/lib/supabase-server';

export default async function Page() {
  const user = await requireAuth(); // Throws if not authenticated
  const supabase = createServerClient();
  // ... query data
}
```

### API Routes with RLS
Always include `user_id` in queries and inserts. RLS policies automatically filter to current user:
```typescript
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', user.id); // RLS enforces this
```

### Claude API Integration
Model: `claude-sonnet-4-5-20250929`
- Request structured JSON output in prompt
- Use regex to extract JSON from response text
- Always validate response structure before processing

## Database Operations

Run SQL scripts in Supabase SQL Editor:
1. `supabase-phase1-schema.sql` - Creates tables with RLS policies
2. `supabase-storage-policies.sql` - Sets up storage bucket policies

Create storage bucket named `proposals` (private) in Supabase dashboard.

## Testing Multi-User Isolation

1. Create User A, add project + proposal
2. Create User B in incognito browser
3. Verify User B cannot see User A's data
4. All queries automatically filtered by RLS policies

## Error Handling

### Error Boundaries
Application includes error boundaries for graceful error recovery:
- `app/error.tsx`: Global error boundary
- `app/dashboard/error.tsx`: Dashboard-specific errors
- `app/dashboard/projects/error.tsx`: Project page errors

Each provides user-friendly error messages, retry options, and navigation back to safety.

### Rate Limiting
Protected expensive API operations with in-memory rate limiting (`lib/rate-limit.ts`):
- Upload route: 10 uploads per hour per user
- Extract route: 5 extractions per hour per user
- Returns HTTP 429 with `X-RateLimit-*` headers

**Note:** In-memory rate limiting is fine for single-instance deployments. For production with multiple servers, migrate to Redis or Upstash Rate Limit.

## TypeScript Types

Comprehensive type definitions in `lib/types.ts`:
- Database models (Project, Proposal, LineItem, Party)
- API response types
- Form types
- Claude API extraction types

## Phase 1 Status

✅ Multi-user auth with RLS
✅ Projects with site characteristics
✅ Parties management
✅ Proposal upload to Supabase Storage
✅ PDF/Excel extraction via Claude API (with 2-minute timeout)
✅ Party attribution system
✅ Edit history tracking
✅ Line items CRUD
✅ Responsive UI
✅ Error boundaries (global + dashboard)
✅ Rate limiting (prevents API abuse)
✅ TypeScript type definitions
✅ Properly typed middleware

⚠️ API cost tracking intentionally deferred to Phase 2
