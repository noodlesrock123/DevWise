# DevWise - Phase 1: Production Foundation

DevWise is a multi-user SaaS construction intelligence platform for property developers and general contractors. Phase 1 provides secure foundation with intelligent proposal extraction.

## Phase 1 Features

✅ Multi-user authentication with Row Level Security (RLS)  
✅ Projects table with comprehensive site characteristics  
✅ Parties table (contractors, suppliers, subs)  
✅ Proposals table with file upload to Supabase storage  
✅ PDF/Excel extraction using Claude API (claude-sonnet-4-5-20250929)  
✅ Party attribution system (manual vendor assignment)  
✅ Edit history tracking (preserves original values)  
✅ Line items table with CRUD operations  
✅ Clean, responsive UI with Tailwind + shadcn/ui  

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI:** Anthropic Claude API (claude-sonnet-4-5-20250929)
- **UI:** Tailwind CSS + shadcn/ui
- **PDF Processing:** pdf-parse
- **Excel Processing:** xlsx

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- Supabase account
- Anthropic API key

### 2. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL from `supabase-phase1-schema.sql` to create all tables with RLS policies
4. Go to Storage section
5. Create a new bucket called `proposals` (make it private)
6. Run the SQL from `supabase-storage-policies.sql` to set up storage policies

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Project

1. Sign up or log in
2. Click "New Project" on the dashboard
3. Fill in required fields (name, address, city, state, project type, quality level)
4. Optionally add site characteristics for better cost analysis in Phase 2+
5. Click "Create Project"

### Uploading a Proposal

1. Navigate to a project
2. Click "Upload Proposal"
3. Enter the contractor/vendor name
4. Select a PDF or Excel file (max 10MB)
5. Click "Upload & Extract"
6. Wait for extraction to complete (usually 30-60 seconds)

### Viewing Line Items

1. Click on a proposal to view extracted line items
2. Line items are grouped by location/division
3. Each item shows description, party, quantity, unit price, and total
4. Items marked "(edited)" have been modified from original values

## Security Features

- **Row Level Security (RLS):** All tables enforce user-specific access
- **Authentication Middleware:** Protects all dashboard routes
- **User-Specific Storage:** Files stored in user-specific folders
- **Complete Data Isolation:** Users cannot see each other's data

## Phase 1 Limitations

⚠️ **Phase 1 extraction route does NOT track API costs** - This is intentional and will be retrofitted in Phase 2 Step 1.

## Testing Phase 1

### Multi-User Isolation Test

1. Create User A account
2. Create a project and upload a proposal
3. Create User B account in a different browser/incognito
4. Verify User B cannot see User A's data
5. Verify RLS policies are working correctly

### Extraction Test

1. Upload a PDF proposal (e.g., VIP Structures proposal)
2. Verify ~200 line items are extracted
3. Check items are grouped by location
4. Verify party attribution (all items assigned to contractor)

### Edit History Test

1. Edit a line item (change quantity)
2. Verify original values are preserved
3. Verify "(edited)" indicator shows
4. Edit again, verify original values unchanged

## Cost Estimate

Phase 1 testing: ~$10 (PDF extraction only)

## Next Steps: Phase 2

Phase 2 will add:
- Cost research (Brave Search + Claude)
- Red/yellow/green variance flags
- AI hover chatbot
- User ratings system
- Budget controls ($20/day spending limit)
- Smart caching

## Support

For issues or questions, refer to the complete build guide: `devwise_complete_build_guide.md`
