# DEVWISE - COMPLETE BUILD GUIDE (ALL 4 PHASES)
## Production-Ready Construction Intelligence Platform

---

## 📋 TABLE OF CONTENTS

### OVERVIEW
- [What You're Building](#what-youre-building)
- [Four-Phase Approach](#four-phase-approach)
- [Tech Stack](#tech-stack)
- [Critical Requirements](#critical-requirements)

### PHASE 1: FOUNDATION
- [Phase 1 Overview](#phase-1-overview)
- [Database Schema - Phase 1](#database-schema-phase-1)
- [Authentication System](#authentication-system)
- [File Upload & Storage](#file-upload--storage)
- [PDF/Excel Extraction](#pdfexcel-extraction)
- [Party Attribution System](#party-attribution-system)
- [Line Items Management](#line-items-management)
- [Phase 1 UI Components](#phase-1-ui-components)
- [Phase 1 Testing](#phase-1-testing)
- [Phase 1 to Phase 2 Transition](#phase-1-to-phase-2-transition)

### PHASE 2: COST INTELLIGENCE
- [Phase 2 Overview](#phase-2-overview)
- [What Changed in Phase 2](#what-changed-in-phase-2)
- [Database Updates - Phase 2](#database-updates-phase-2)
- [Brave Search Integration](#brave-search-integration)
- [Cost Research Engine](#cost-research-engine)
- [Cost Tracking & Budget Controls](#cost-tracking--budget-controls)
- [AI Hover Chatbot](#ai-hover-chatbot)
- [User Ratings System](#user-ratings-system)
- [Phase 2 UI Updates](#phase-2-ui-updates)
- [Phase 2 Testing](#phase-2-testing)
- [Phase 2 to Phase 3 Transition](#phase-2-to-phase-3-transition)

### PHASE 3: SCOPE GENERATION
- [Phase 3 Overview](#phase-3-overview)
- [What Changed in Phase 3](#what-changed-in-phase-3)
- [Database Updates - Phase 3](#database-updates-phase-3)
- [Two-Tier Scope Generation System](#two-tier-scope-generation-system)
- [User Preferences Memory](#user-preferences-memory)
- [Alternative Decision Memory](#alternative-decision-memory)
- [Phase 3 UI Components](#phase-3-ui-components)
- [Phase 3 Testing](#phase-3-testing)
- [Phase 3 to Phase 4 Transition](#phase-3-to-phase-4-transition)

### PHASE 4: ALTERNATIVES & OPTIMIZATION
- [Phase 4 Overview](#phase-4-overview)
- [What Changed in Phase 4](#what-changed-in-phase-4)
- [Database Updates - Phase 4](#database-updates-phase-4)
- [Multi-Level Alternatives](#multi-level-alternatives)
- [Proposal Comparison](#proposal-comparison)
- [Budget Optimization](#budget-optimization)
- [Export Reports](#export-reports)
- [Phase 4 UI Components](#phase-4-ui-components)
- [Phase 4 Testing](#phase-4-testing)

### DEPLOYMENT & MAINTENANCE
- [Environment Setup](#environment-setup)
- [Deployment Checklist](#deployment-checklist)
- [Cost Monitoring](#cost-monitoring)
- [Troubleshooting Guide](#troubleshooting-guide)

---

## 🎯 WHAT YOU'RE BUILDING

**DevWise** is a commercial multi-user SaaS construction intelligence platform for property developers and general contractors. It generates baseline cost estimates, analyzes contractor proposals, benchmarks costs using AI-powered research, and identifies optimization opportunities.

**Core Innovation:** Instead of expensive, outdated cost databases (like RSMeans at $400/year), DevWise uses Claude API + Brave Search to research current market costs in real-time, and can generate baseline estimates before contractor bids are received.

**Target Users:**
- Small to mid-size property developers (1-20 unit projects)
- General contractors checking their own pricing
- Real estate investors managing construction

**Test Data:**
For testing and validation, use a real construction proposal PDF with:
- Multiple divisions/sections (01 General Requirements through 16 Electrical, etc.)
- ~200 line items with nested hierarchy
- Mix of lump sum and unit-priced items
- Total value in the $1M-$5M range

Test goal: Validate extraction accuracy, cost research quality, alternatives generation relevance, and optimization scenarios across diverse construction scopes.

---

## 🏗️ FOUR-PHASE APPROACH

### **PHASE 1: PRODUCTION FOUNDATION**
Build secure, multi-user foundation with intelligent extraction:
- ✅ Multi-user authentication with Row Level Security (RLS)
- ✅ Project & proposal CRUD operations
- ✅ PDF/Excel upload with validation
- ✅ AI extraction to structured line items
- ✅ **Party attribution system (manual vendor assignment)**
- ✅ **Edit history tracking (preserve original values)**
- ✅ Basic line item CRUD
- ✅ Clean, responsive UI

**Cost:** ~$10 for testing (PDF extraction only)

### **PHASE 2: COST INTELLIGENCE**
Add AI-powered cost analysis:
- ✅ Automated cost research (Brave Search + Claude)
- ✅ Red/yellow/green variance flags
- ✅ AI hover chatbot for questions
- ✅ Anonymous cost learning database
- ✅ User ratings to improve accuracy
- ✅ **Budget controls & cost monitoring ($100/month limit)**
- ✅ Smart caching (80-90% cost reduction)

**Cost:** ~$15 for testing (includes research + chatbot)

### **PHASE 3: SCOPE GENERATION**
Add AI-powered baseline estimate generation:
- ✅ Two-tier generation system (Quick & Comprehensive)
- ✅ Multi-input support (text, photos, documents)
- ✅ User preferences memory system
- ✅ Alternative decision tracking
- ✅ Baseline proposal management
- ✅ Claude Vision for site analysis
- ✅ Live market research integration

**Cost:** ~$70 for testing (scope generation is expensive)

### **PHASE 4: ALTERNATIVES & OPTIMIZATION**
Add power features for optimization:
- ✅ Multi-level alternatives (macro/system/detail)
- ✅ Side-by-side proposal comparison
- ✅ AI scope difference detection
- ✅ Budget optimization scenarios
- ✅ Professional report exports

**Cost:** ~$10-15 for testing

**Total estimated testing cost: $105-110**

**Potential Savings:** Calculated from actual alternatives identified in the proposal scope (macro-level building methodology changes, system-level component alternatives, and detail-level material substitutions)

---

## 💻 TECH STACK

**Framework:** Next.js 14 (App Router)
**Language:** TypeScript
**Database:** Supabase (PostgreSQL)
**Authentication:** Supabase Auth
**AI:** Anthropic Claude API (claude-sonnet-4-5-20250929)
**Search:** Brave Search API
**UI:** Tailwind CSS + shadcn/ui
**PDF Processing:** pdf-parse
**Excel Processing:** xlsx
**Reports:** PDFKit

---

## 🔐 CRITICAL REQUIREMENTS

### **1. Multi-User Security (Phase 1)**
- Every table has `user_id` column
- Row Level Security (RLS) policies on ALL tables
- Auth middleware protects all routes
- File storage uses user-specific paths
- Test with 2+ users to verify isolation

### **2. Cost Controls (Phase 2)**
- Track ALL API usage (Anthropic + Brave)
- User spending limits ($20/day per user)
- Require confirmation for operations >$5
- Daily budget reset mechanism
- Alert when approaching monthly limit

### **3. Manual Party Attribution (All Phases)**
- User enters vendor name when uploading proposal
- All extracted line items batch-assigned to that vendor
- User can manually reassign items to different parties
- Parties can be added anytime (contractors, subs, suppliers)

### **4. Consistency Across Phases**
- All features respect authentication & RLS
- All operations tracked in api_usage table (Phase 2+)
- All line items support party attribution & edit history
- UI remains consistent across all phases

---

## 🎯 WHY SITE CHARACTERISTICS MATTER

**Critical for Cost Analysis Accuracy:**

DevWise uses AI to research market costs and identify alternatives. The accuracy of this analysis depends heavily on understanding the project's site conditions. Here's why each field matters:

### **Topography (30-200% cost impact)**
- **Flat:** Standard foundation costs, normal excavation
- **Gentle/Moderate Slope:** Requires some grading, stepped foundations
- **Steep/Very Steep:** Needs retaining walls ($$$), engineered foundations, specialized equipment

*Example:* Foundation on flat lot: $50k | Same foundation on steep terrain: $150-200k

### **Soil Type (25-100% cost impact)**
- **Stable/Sand:** Normal excavation, standard foundation design
- **Clay:** Requires special drainage systems, engineered solutions
- **Rock:** Needs blasting or drilling, specialized equipment

*Example:* Rock excavation costs $50-150/cubic yard vs $10-20/cubic yard for normal soil

### **Access & Location (15-50% cost impact)**
- **Urban/Paved Road:** Easy material delivery, local labor available
- **Rural/Difficult Access:** Limited equipment size, higher material delivery costs, travel time
- **Remote:** May need temporary housing for workers, specialized logistics

*Example:* Rural projects can add 20-40% to labor costs due to travel time and housing

### **Utilities Proximity (Fixed $50k-150k+)**
- **On-site/At Street:** Standard utility connection costs
- **Extended Run:** 500+ feet can add $50-150k for water, sewer, electric, gas lines

*Example:* 1000' utility run = ~$100k+ in additional costs not in base building estimate

### **How DevWise Uses This Context:**

1. **Smarter Search Queries:** "Foundation cost steep terrain Vermont" vs generic "foundation cost Vermont"
2. **Contextual Analysis:** AI knows $150k foundation is reasonable for steep/rocky site, not overpriced
3. **Appropriate Alternatives:** Won't suggest slab foundation for steep terrain
4. **Macro-Level Insights:** Identifies when modular construction saves money due to rural location

**User Benefits:**
- ✅ More accurate cost research (not comparing apples to oranges)
- ✅ Context-aware alternatives (site-appropriate suggestions)
- ✅ Better negotiation position (understand what's driving costs)
- ✅ Realistic savings targets (account for unavoidable site costs)

**Data Entry Guidance:**
- **Required:** Address, city, state, project type, quality level
- **Highly Recommended:** Topography, urban/rural, site access
- **Optional but Valuable:** Soil type, utilities proximity, lot size, clearing needs

Even basic site info (just topography + access) dramatically improves analysis quality.

---

# PHASE 1: PRODUCTION FOUNDATION

## 📋 PHASE 1 OVERVIEW

**Goal:** Build secure, multi-user foundation with intelligent proposal extraction

**What you'll build:**
1. Authentication system (sign up, sign in, RLS)
2. Project management (CRUD)
3. Proposal upload with validation
4. PDF/Excel extraction using Claude
5. **Party attribution (manual vendor assignment)**
6. **Edit history tracking**
7. Line items table with CRUD operations

**What you WON'T build yet:**
- ❌ Cost research/benchmarking
- ❌ AI chatbot
- ❌ Red/yellow/green flags
- ❌ Alternatives analysis
- ❌ Proposal comparison

---

## 📊 DATABASE SCHEMA - PHASE 1

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table with site characteristics
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Project details (REQUIRED)
  name TEXT NOT NULL,
  
  -- Location (REQUIRED for accurate cost research)
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  
  -- Project characteristics (REQUIRED)
  project_type TEXT NOT NULL, -- 'residential', 'commercial', 'mixed-use', 'industrial'
  quality_level TEXT, -- 'economy', 'standard', 'luxury'
  
  -- Basic scope
  num_units INTEGER,
  square_footage INTEGER,
  budget_range DECIMAL(12,2),
  timeline_flexibility TEXT, -- 'fixed', 'flexible', 'very_flexible'
  
  -- SITE CHARACTERISTICS (Optional but highly recommended for accuracy)
  -- These dramatically affect cost analysis accuracy
  
  -- Lot/Site
  lot_size_acres DECIMAL(10,2),
  topography TEXT, -- 'flat', 'gentle_slope', 'moderate_slope', 'steep', 'very_steep', 'mixed'
  
  -- Access & Infrastructure
  site_access TEXT, -- 'paved_road', 'gravel_road', 'dirt_road', 'difficult', 'seasonal'
  distance_to_paved_road_miles DECIMAL(5,2),
  utilities_proximity TEXT, -- 'on_site', 'at_street', 'nearby', 'extended_run', 'none'
  utility_distance_feet INTEGER,
  
  -- Soil & Ground Conditions
  soil_type TEXT, -- 'stable', 'clay', 'sand', 'rock', 'mixed', 'fill', 'unknown'
  bedrock_depth_feet INTEGER,
  water_table_depth_feet INTEGER,
  
  -- Existing Conditions
  existing_structures BOOLEAN DEFAULT FALSE,
  existing_structure_demo_needed BOOLEAN DEFAULT FALSE,
  tree_clearing_needed BOOLEAN DEFAULT FALSE,
  clearing_acres DECIMAL(10,2),
  
  -- Context
  urban_rural TEXT, -- 'urban', 'suburban', 'rural', 'remote'
  permit_complexity TEXT, -- 'standard', 'moderate', 'complex', 'very_complex'
  environmental_constraints TEXT, -- 'none', 'wetlands', 'floodplain', 'endangered_species', 'multiple'
  hoa_restrictions BOOLEAN DEFAULT FALSE,
  
  -- Notes
  site_notes TEXT,
  special_requirements TEXT,
  
  -- Status
  status TEXT DEFAULT 'active' -- 'active', 'archived', 'completed'
);

-- Add helpful indexes
CREATE INDEX idx_projects_location ON projects(state, city);
CREATE INDEX idx_projects_type ON projects(project_type);
CREATE INDEX idx_projects_topography ON projects(topography) WHERE topography IS NOT NULL;

-- Parties table (contractors, suppliers, subs)
CREATE TABLE parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  name TEXT NOT NULL,
  party_type TEXT NOT NULL, -- 'contractor', 'subcontractor', 'supplier', 'developer'
  contact_info TEXT,
  
  UNIQUE(project_id, name)
);

-- Proposals table
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Proposal details
  contractor_name TEXT NOT NULL,
  contractor_party_id UUID REFERENCES parties(id), -- Party who submitted this proposal
  proposal_date DATE,
  total_amount DECIMAL(12,2),
  
  -- File info
  file_name TEXT,
  file_path TEXT,
  file_type TEXT, -- 'pdf', 'excel', 'manual'
  
  -- Extraction status
  extraction_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  extraction_started_at TIMESTAMPTZ,
  extraction_completed_at TIMESTAMPTZ
);

-- Line items table
CREATE TABLE line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Hierarchy
  location TEXT, -- e.g., "01 General Requirements"
  category TEXT, -- e.g., "PROJECT MANAGEMENT"
  
  -- Item details
  description TEXT NOT NULL,
  unit TEXT, -- 'EA', 'SF', 'LF', etc.
  quantity DECIMAL(12,4),
  unit_price DECIMAL(12,2),
  total_price DECIMAL(12,2) NOT NULL,
  
  -- Party attribution
  party_id UUID REFERENCES parties(id), -- Which party is responsible
  
  -- Edit history (for tracking changes)
  is_edited BOOLEAN DEFAULT FALSE,
  original_description TEXT,
  original_quantity DECIMAL(12,4),
  original_unit_price DECIMAL(12,2),
  original_total_price DECIMAL(12,2),
  
  -- Metadata
  notes TEXT
);

-- Indexes for performance
CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_parties_project ON parties(project_id);
CREATE INDEX idx_parties_user ON parties(user_id);
CREATE INDEX idx_proposals_project ON proposals(project_id);
CREATE INDEX idx_proposals_user ON proposals(user_id);
CREATE INDEX idx_line_items_proposal ON line_items(proposal_id);
CREATE INDEX idx_line_items_user ON line_items(user_id);
CREATE INDEX idx_line_items_party ON line_items(party_id);

-- Row Level Security (RLS) Policies

-- Projects policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Parties policies
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own parties"
  ON parties FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own parties"
  ON parties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own parties"
  ON parties FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own parties"
  ON parties FOR DELETE
  USING (auth.uid() = user_id);

-- Proposals policies
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own proposals"
  ON proposals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own proposals"
  ON proposals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own proposals"
  ON proposals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own proposals"
  ON proposals FOR DELETE
  USING (auth.uid() = user_id);

-- Line items policies
ALTER TABLE line_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own line items"
  ON line_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own line items"
  ON line_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own line items"
  ON line_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own line items"
  ON line_items FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 🔒 AUTHENTICATION SYSTEM

### **Middleware for Route Protection:**

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect all /dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect authenticated users away from auth pages
  if (
    (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') &&
    session
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
```

### **Supabase Client Utilities:**

```typescript
// lib/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// For client components
export const createClient = () => createClientComponentClient();

// For server components
export const createServerClient = () =>
  createServerComponentClient({ cookies });

// Helper for API routes
export async function requireAuth() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session.user;
}
```

### **Auth Pages:**

```typescript
// app/signup/page.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Sign Up for DevWise</h2>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
```

```typescript
// app/login/page.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Log In to DevWise</h2>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

## 📁 FILE UPLOAD & STORAGE

### **Supabase Storage Configuration:**

1. In Supabase Dashboard, create a storage bucket called `proposals`
2. Set RLS policies for user-specific access:

```sql
-- Storage policies
CREATE POLICY "Users can upload their own files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'proposals' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'proposals' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'proposals' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### **File Upload API Route:**

```typescript
// app/api/proposals/upload/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const formData = await req.formData();
    
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    const contractorName = formData.get('contractorName') as string;

    if (!file || !projectId || !contractorName) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: 'Invalid file type. Only PDF and Excel files allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return Response.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Upload to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('proposals')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return Response.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Create proposal record
    const { data: proposal, error: dbError } = await supabase
      .from('proposals')
      .insert({
        user_id: user.id,
        project_id: projectId,
        contractor_name: contractorName,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type.includes('pdf') ? 'pdf' : 'excel',
        extraction_status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return Response.json(
        { error: 'Failed to create proposal record' },
        { status: 500 }
      );
    }

    return Response.json({ proposal });

  } catch (error: any) {
    console.error('Upload error:', error);
    return Response.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
```

---

## 📄 PDF/EXCEL EXTRACTION

### **Extraction API Route:**

```typescript
// app/api/proposals/[id]/extract/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';
import Anthropic from '@anthropic-ai/sdk';
import pdf from 'pdf-parse';
import * as XLSX from 'xlsx';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const supabase = createServerClient();

    // Get proposal
    const { data: proposal, error: proposalError } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', proposalId)
      .eq('user_id', user.id)
      .single();

    if (proposalError || !proposal) {
      return Response.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Update status
    await supabase
      .from('proposals')
      .update({
        extraction_status: 'processing',
        extraction_started_at: new Date().toISOString(),
      })
      .eq('id', proposalId);

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('proposals')
      .download(proposal.file_path);

    if (downloadError) {
      throw new Error('Failed to download file');
    }

    // Extract text based on file type
    let extractedText = '';

    if (proposal.file_type === 'pdf') {
      const buffer = await fileData.arrayBuffer();
      const pdfData = await pdf(Buffer.from(buffer));
      extractedText = pdfData.text;
    } else {
      // Excel
      const buffer = await fileData.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      extractedText = XLSX.utils.sheet_to_csv(sheet);
    }

    // Send to Claude for structured extraction
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `You are a construction proposal analyzer. Extract all line items from this proposal into a structured JSON format.

PROPOSAL TEXT:
${extractedText}

Extract each line item with:
- location: The section/division (e.g., "01 General Requirements", "03 Concrete")
- category: The subsection (e.g., "PROJECT MANAGEMENT", "FOOTINGS")
- description: Clear description of the work
- unit: Unit of measure (EA, SF, LF, etc.)
- quantity: Numeric quantity
- unit_price: Price per unit
- total_price: Total cost for this item

Return ONLY valid JSON in this format:
{
  "line_items": [
    {
      "location": "01 General Requirements",
      "category": "PROJECT MANAGEMENT",
      "description": "Project Management",
      "unit": "LS",
      "quantity": 1,
      "unit_price": 50000,
      "total_price": 50000
    }
  ]
}

IMPORTANT: 
- Extract ALL line items from the document
- Ensure total_price = quantity * unit_price
- Use null for missing values
- Do NOT include any text outside the JSON`,
        },
      ],
    });

    // TODO: In Phase 2, add cost tracking after extraction completes

    // Parse response
    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse extraction response');
    }

    const extracted = JSON.parse(jsonMatch[0]);

    if (!extracted.line_items || !Array.isArray(extracted.line_items)) {
      throw new Error('Invalid extraction format');
    }

    // Create party for contractor if doesn't exist
    const { data: existingParty } = await supabase
      .from('parties')
      .select('id')
      .eq('project_id', proposal.project_id)
      .eq('name', proposal.contractor_name)
      .single();

    let partyId = existingParty?.id;

    if (!partyId) {
      const { data: newParty } = await supabase
        .from('parties')
        .insert({
          user_id: user.id,
          project_id: proposal.project_id,
          name: proposal.contractor_name,
          party_type: 'contractor',
        })
        .select('id')
        .single();

      partyId = newParty?.id;
    }

    // Insert line items
    const lineItemsToInsert = extracted.line_items.map((item: any) => ({
      user_id: user.id,
      proposal_id: proposalId,
      party_id: partyId,
      location: item.location || null,
      category: item.category || null,
      description: item.description,
      unit: item.unit || null,
      quantity: item.quantity || null,
      unit_price: item.unit_price || null,
      total_price: item.total_price,
    }));

    const { error: insertError } = await supabase
      .from('line_items')
      .insert(lineItemsToInsert);

    if (insertError) {
      throw new Error(`Failed to insert line items: ${insertError.message}`);
    }

    // Calculate total
    const totalAmount = extracted.line_items.reduce(
      (sum: number, item: any) => sum + (item.total_price || 0),
      0
    );

    // Update proposal status
    await supabase
      .from('proposals')
      .update({
        extraction_status: 'completed',
        extraction_completed_at: new Date().toISOString(),
        total_amount: totalAmount,
        contractor_party_id: partyId,
      })
      .eq('id', proposalId);

    return Response.json({
      success: true,
      line_items_count: extracted.line_items.length,
      total_amount: totalAmount,
    });

  } catch (error: any) {
    console.error('Extraction error:', error);

    // Update status to failed
    const supabase = createServerClient();
    await supabase
      .from('proposals')
      .update({ extraction_status: 'failed' })
      .eq('id', params.id);

    return Response.json(
      { error: error.message || 'Extraction failed' },
      { status: 500 }
    );
  }
}
```

---

## 👥 PARTY ATTRIBUTION SYSTEM

### **Party Management API:**

```typescript
// app/api/projects/[id]/parties/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';

// GET all parties for a project
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const projectId = params.id;
    const supabase = createServerClient();

    const { data: parties, error } = await supabase
      .from('parties')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .order('name');

    if (error) throw error;

    return Response.json({ parties });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new party
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const projectId = params.id;
    const body = await req.json();
    const supabase = createServerClient();

    const { data: party, error } = await supabase
      .from('parties')
      .insert({
        user_id: user.id,
        project_id: projectId,
        name: body.name,
        party_type: body.party_type,
        contact_info: body.contact_info,
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({ party });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### **Reassign Line Item Party:**

```typescript
// app/api/line-items/[id]/reassign/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const { party_id } = await req.json();
    const supabase = createServerClient();

    const { data: lineItem, error } = await supabase
      .from('line_items')
      .update({ party_id })
      .eq('id', lineItemId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return Response.json({ lineItem });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## 📝 LINE ITEMS MANAGEMENT

### **Line Items CRUD API:**

```typescript
// app/api/proposals/[id]/line-items/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';

// GET all line items for a proposal
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const supabase = createServerClient();

    const { data: lineItems, error } = await supabase
      .from('line_items')
      .select('*, party:parties(name)')
      .eq('proposal_id', proposalId)
      .eq('user_id', user.id)
      .order('location')
      .order('category');

    if (error) throw error;

    return Response.json({ lineItems });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new line item
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const body = await req.json();
    const supabase = createServerClient();

    // TODO (Phase 2): Add cost tracking here

    const { data: lineItem, error } = await supabase
      .from('line_items')
      .insert({
        user_id: user.id,
        proposal_id: proposalId,
        ...body,
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({ lineItem });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

```typescript
// app/api/line-items/[id]/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';

// GET single line item
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const supabase = createServerClient();

    const { data: lineItem, error } = await supabase
      .from('line_items')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;

    return Response.json({ lineItem });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update line item (with edit history)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const supabase = createServerClient();

    // Get current values
    const { data: current } = await supabase
      .from('line_items')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (!current) {
      return Response.json(
        { error: 'Line item not found' },
        { status: 404 }
      );
    }

    // If not edited before, save original values
    const updateData: any = { ...body };

    if (!current.is_edited) {
      updateData.is_edited = true;
      updateData.original_description = current.description;
      updateData.original_quantity = current.quantity;
      updateData.original_unit_price = current.unit_price;
      updateData.original_total_price = current.total_price;
    }

    const { data: lineItem, error } = await supabase
      .from('line_items')
      .update(updateData)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return Response.json({ lineItem });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE line item
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const supabase = createServerClient();

    const { error } = await supabase
      .from('line_items')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

    if (error) throw error;

    return Response.json({ success: true });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## 🎨 PHASE 1 UI COMPONENTS

### **Dashboard (Project List):**

```typescript
// app/dashboard/page.tsx
import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createServerClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">DevWise</h1>
          <form action="/api/auth/signout" method="post">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">My Projects</h2>
          <Link
            href="/dashboard/projects/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + New Project
          </Link>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{project.address}</p>
                {project.budget_range && (
                  <p className="text-sm text-gray-500">
                    Budget: ${project.budget_range.toLocaleString()}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-4">
                  Created {new Date(project.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">No projects yet</p>
            <Link
              href="/dashboard/projects/new"
              className="text-blue-600 hover:underline"
            >
              Create your first project
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
```

### **Project Detail Page:**

```typescript
// app/dashboard/projects/[id]/page.tsx
import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import UploadProposalButton from '@/components/UploadProposalButton';
import ProposalCard from '@/components/ProposalCard';

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', session.user.id)
    .single();

  if (!project) {
    redirect('/dashboard');
  }

  const { data: proposals } = await supabase
    .from('proposals')
    .select('*')
    .eq('project_id', params.id)
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a href="/dashboard" className="text-blue-600 hover:underline">
            ← Back to Projects
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <p className="text-gray-600">{project.address}</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Proposals</h2>
          <UploadProposalButton projectId={project.id} />
        </div>

        {proposals && proposals.length > 0 ? (
          <div className="grid gap-4">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">No proposals yet</p>
            <UploadProposalButton projectId={project.id} />
          </div>
        )}
      </main>
    </div>
  );
}
```

### **Upload Proposal Modal:**

```typescript
// components/UploadProposalButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadProposalButton({
  projectId,
}: {
  projectId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [contractorName, setContractorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleUpload() {
    if (!file || !contractorName) {
      setError('Please select a file and enter contractor name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);
      formData.append('contractorName', contractorName);

      const res = await fetch('/api/proposals/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const { proposal } = await res.json();

      // Start extraction
      await fetch(`/api/proposals/${proposal.id}/extract`, {
        method: 'POST',
      });

      setIsOpen(false);
      router.refresh();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Upload Proposal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Upload Proposal</h3>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contractor/Vendor Name
                </label>
                <input
                  type="text"
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  placeholder="e.g., VIP Structures"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Proposal File (PDF or Excel)
                </label>
                <input
                  type="file"
                  accept=".pdf,.xlsx,.xls"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={loading || !file || !contractorName}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Uploading...' : 'Upload & Extract'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

### **Line Items Table:**

```typescript
// app/dashboard/proposals/[id]/page.tsx
import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import LineItemRow from '@/components/LineItemRow';

export default async function ProposalPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: proposal } = await supabase
    .from('proposals')
    .select('*, project:projects(*)')
    .eq('id', params.id)
    .eq('user_id', session.user.id)
    .single();

  if (!proposal) {
    redirect('/dashboard');
  }

  const { data: lineItems } = await supabase
    .from('line_items')
    .select('*, party:parties(name)')
    .eq('proposal_id', params.id)
    .eq('user_id', session.user.id)
    .order('location')
    .order('category');

  // Group by location
  const grouped: Record<string, any[]> = {};
  lineItems?.forEach((item) => {
    const loc = item.location || 'Uncategorized';
    if (!grouped[loc]) grouped[loc] = [];
    grouped[loc].push(item);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a
            href={`/dashboard/projects/${proposal.project_id}`}
            className="text-blue-600 hover:underline"
          >
            ← Back to {proposal.project.name}
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {proposal.contractor_name}
          </h1>
          <p className="text-gray-600">{proposal.project.name}</p>
          {proposal.total_amount && (
            <p className="text-2xl font-bold mt-4">
              ${proposal.total_amount.toLocaleString()}
            </p>
          )}
        </div>

        {proposal.extraction_status === 'processing' && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded mb-6">
            Extracting line items... This may take a minute.
          </div>
        )}

        {proposal.extraction_status === 'failed' && (
          <div className="bg-red-50 text-red-700 p-4 rounded mb-6">
            Extraction failed. Please try uploading again.
          </div>
        )}

        {lineItems && lineItems.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Party
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Total
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(grouped).map((location) => (
                  <React.Fragment key={location}>
                    <tr className="bg-gray-100">
                      <td
                        colSpan={6}
                        className="px-4 py-2 font-bold text-sm"
                      >
                        {location}
                      </td>
                    </tr>
                    {grouped[location].map((item) => (
                      <LineItemRow key={item.id} item={item} />
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
```

```typescript
// components/LineItemRow.tsx
'use client';

export default function LineItemRow({ item }: { item: any }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="text-sm">
          {item.category && (
            <div className="text-gray-500 text-xs">{item.category}</div>
          )}
          <div>
            {item.description}
            {item.is_edited && (
              <span className="ml-2 text-xs text-orange-600">(edited)</span>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{item.party?.name || '-'}</td>
      <td className="px-4 py-3 text-right text-sm">
        {item.quantity} {item.unit}
      </td>
      <td className="px-4 py-3 text-right text-sm">
        {item.unit_price ? `$${item.unit_price.toLocaleString()}` : '-'}
      </td>
      <td className="px-4 py-3 text-right text-sm font-medium">
        ${item.total_price.toLocaleString()}
      </td>
      <td className="px-4 py-3 text-center">
        <button className="text-blue-600 hover:underline text-sm">
          Edit
        </button>
      </td>
    </tr>
  );
}
```

---

## 🧪 PHASE 1 TESTING

### **Test Plan:**

1. **Multi-User Isolation:**
   - Create User A, create project, upload proposal
   - Create User B, verify they can't see User A's data
   - Verify RLS policies working on all tables

2. **Project Management:**
   - Create new project with all fields
   - Edit project details
   - Delete project (verify cascade deletes)

3. **File Upload:**
   - Upload PDF proposal
   - Upload Excel proposal
   - Try uploading invalid file (should reject)
   - Try uploading >10MB file (should reject)

4. **PDF Extraction:**
   - Upload VIP Structures PDF
   - Verify ~200 line items extracted
   - Check items grouped by location
   - Verify party attribution (all items assigned to VIP Structures)

5. **Party Management:**
   - Add new party (subcontractor)
   - Reassign some line items to new party
   - Delete party (line items should nullify party_id)

6. **Edit History:**
   - Edit a line item (change quantity)
   - Verify original values preserved
   - Verify "(edited)" indicator shows
   - Edit again, verify original values unchanged

7. **Line Item CRUD:**
   - Create new line item manually
   - Update existing line item
   - Delete line item

### **Expected Results:**

- VIP proposal extracts ~198 items
- Total amount ~$4.4M
- All items initially assigned to "VIP Structures" party
- Edit tracking works correctly
- Users cannot see each other's data

### **API Cost Estimate:**

- One PDF extraction (VIP proposal): ~$0.50
- Additional test extractions: ~$2-3
- **Total Phase 1 testing: ~$10**

---

## 🔄 PHASE 1 TO PHASE 2 TRANSITION

**Before starting Phase 2, verify:**

**Database:**
- [ ] All 4 tables created with RLS policies
- [ ] Indexes created
- [ ] Storage bucket configured with policies

**Authentication:**
- [ ] Sign up/login working
- [ ] Middleware protecting dashboard routes
- [ ] RLS filtering all queries

**Extraction:**
- [ ] PDF extraction working
- [ ] Excel extraction working
- [ ] Line items created correctly
- [ ] Party attribution working

**Known Limitation (will fix in Phase 2):**
- ⚠️ **Phase 1 extraction route does NOT track API costs**
- This is intentional - we'll retrofit cost tracking in Phase 2 Step 1
- See comments in extraction route marked "TODO: In Phase 2..."

**Testing:**
- [ ] Tested with 2 different user accounts
- [ ] Verified complete data isolation
- [ ] VIP proposal extracted successfully

**Phase 2 Preview:**

In Phase 2, you'll add:
1. **FIRST:** Retrofit cost tracking to extraction route
2. Cost research (Brave Search + Claude)
3. Red/yellow/green variance flags
4. AI hover chatbot
5. User ratings system
6. Budget controls ($20/day spending limit)
7. Smart caching

**All Phase 2 operations will automatically inherit:**
- ✅ Authentication & RLS from Phase 1
- ✅ Party attribution from Phase 1
- ✅ Edit history from Phase 1

**Ready to proceed?** If all checklist items are complete, move to Phase 2!

---

# PHASE 2: COST INTELLIGENCE

## 📋 PHASE 2 OVERVIEW

**Goal:** Add AI-powered cost analysis and budget controls

**What you'll build:**
1. **CRITICAL FIRST STEP:** Retrofit cost tracking to extraction route
2. Brave Search API integration
3. Automated cost research engine
4. Red/yellow/green variance flags
5. AI hover chatbot for questions
6. User ratings system
7. Anonymous learning database
8. **Budget controls & cost monitoring**

**Inherits from Phase 1:**
- ✅ All authentication & RLS
- ✅ All party attribution
- ✅ All edit history
- ✅ All file upload/extraction

---

## 🔄 WHAT CHANGED IN PHASE 2

**New Tables Added:**
- `api_usage` - Track all API calls and costs
- `user_budget` - Track user spending limits
- `research_jobs` - Track cost research operations
- `cost_benchmarks` - Store researched market costs
- `user_ratings` - Store user feedback on accuracy
- `chat_messages` - Store chatbot conversations

**New Functionality:**
- Automated cost research for line items
- Budget monitoring with daily limits
- Smart caching to reduce costs
- AI chatbot for questions
- User ratings to improve accuracy

**CRITICAL FIRST STEP:**
- Retrofit the extraction route from Phase 1 to track API costs
- This ensures consistency across all API operations

**What Stays the Same:**
- All Phase 1 features continue working
- All authentication & security
- All party attribution & edit history
- All existing UI components

---

## 📊 DATABASE UPDATES - PHASE 2

```sql
-- API usage tracking table
CREATE TABLE api_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Operation details
  operation_type TEXT NOT NULL, -- 'extraction', 'research', 'chat', 'alternatives', etc.
  api_provider TEXT NOT NULL, -- 'anthropic', 'brave'
  
  -- Cost tracking
  tokens_used INTEGER,
  estimated_cost DECIMAL(10,4) NOT NULL,
  
  -- Context
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  line_item_id UUID REFERENCES line_items(id) ON DELETE SET NULL,
  
  -- Metadata
  request_data JSONB,
  response_data JSONB
);

-- User budget tracking
CREATE TABLE user_budget (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Daily limits
  daily_limit DECIMAL(10,2) DEFAULT 20.00,
  daily_spent DECIMAL(10,2) DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  
  -- Monthly tracking
  monthly_spent DECIMAL(10,2) DEFAULT 0,
  monthly_limit DECIMAL(10,2) DEFAULT 100.00
);

-- Research jobs table
CREATE TABLE research_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  line_item_id UUID REFERENCES line_items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  
  -- Job details
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  search_query TEXT,
  
  -- Results
  market_low DECIMAL(12,2),
  market_high DECIMAL(12,2),
  market_avg DECIMAL(12,2),
  confidence_score DECIMAL(3,2),
  sources TEXT[],
  
  -- Analysis
  variance_percent DECIMAL(5,2),
  flag_color TEXT, -- 'green', 'yellow', 'red'
  explanation TEXT
);

-- Cost benchmarks (anonymous learning database)
CREATE TABLE cost_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Item categorization
  item_category TEXT NOT NULL,
  item_description_normalized TEXT NOT NULL,
  
  -- Location/context
  region TEXT,
  project_type TEXT,
  quality_level TEXT,
  
  -- Cost data (anonymized)
  unit TEXT,
  unit_price DECIMAL(12,2),
  total_price DECIMAL(12,2),
  year INTEGER,
  quarter INTEGER,
  
  -- Quality indicators
  confidence_score DECIMAL(3,2),
  source TEXT, -- 'user_rated', 'researched', 'verified'
  
  -- No user_id - this is anonymous learning data
  UNIQUE(item_category, item_description_normalized, region, year, quarter)
);

-- User ratings on cost accuracy
CREATE TABLE user_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  line_item_id UUID REFERENCES line_items(id) ON DELETE CASCADE,
  research_job_id UUID REFERENCES research_jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Rating
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  accuracy_feedback TEXT, -- 'accurate', 'too_high', 'too_low'
  actual_cost DECIMAL(12,2), -- User's actual negotiated cost
  
  -- Feedback
  comments TEXT
);

-- Chat messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  line_item_id UUID REFERENCES line_items(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Message details
  role TEXT NOT NULL, -- 'user', 'assistant'
  content TEXT NOT NULL,
  
  -- Cost tracking
  tokens_used INTEGER,
  estimated_cost DECIMAL(10,4)
);

-- Indexes
CREATE INDEX idx_api_usage_user ON api_usage(user_id);
CREATE INDEX idx_api_usage_date ON api_usage(created_at);
CREATE INDEX idx_research_jobs_item ON research_jobs(line_item_id);
CREATE INDEX idx_research_jobs_user ON research_jobs(user_id);
CREATE INDEX idx_benchmarks_category ON cost_benchmarks(item_category);
CREATE INDEX idx_ratings_user ON user_ratings(user_id);
CREATE INDEX idx_ratings_item ON user_ratings(line_item_id);
CREATE INDEX idx_chat_user ON chat_messages(user_id);
CREATE INDEX idx_chat_item ON chat_messages(line_item_id);

-- RLS Policies
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_budget ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- cost_benchmarks has NO RLS - it's shared anonymous data

CREATE POLICY "Users can view their API usage"
  ON api_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their budget"
  ON user_budget FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their budget"
  ON user_budget FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their research jobs"
  ON research_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their ratings"
  ON user_ratings FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their chat messages"
  ON chat_messages FOR ALL
  USING (auth.uid() = user_id);

-- Update line_items table with Phase 2 fields
ALTER TABLE line_items ADD COLUMN research_job_id UUID REFERENCES research_jobs(id);
ALTER TABLE line_items ADD COLUMN flag_color TEXT; -- 'green', 'yellow', 'red'
ALTER TABLE line_items ADD COLUMN variance_percent DECIMAL(5,2);
ALTER TABLE line_items ADD COLUMN market_avg DECIMAL(12,2);
ALTER TABLE line_items ADD COLUMN last_researched_at TIMESTAMPTZ;

CREATE INDEX idx_line_items_flag ON line_items(flag_color);
CREATE INDEX idx_line_items_research ON line_items(research_job_id);
```

---

## PHASE 2 STEP 1: RETROFIT COST TRACKING TO EXTRACTION

**CRITICAL:** Before building any new Phase 2 features, update the extraction route to track costs.

```typescript
// app/api/proposals/[id]/extract/route.ts
// Add cost tracking to the existing extraction route

import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';
import Anthropic from '@anthropic-ai/sdk';
import pdf from 'pdf-parse';
import * as XLSX from 'xlsx';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Cost calculation helper
function calculateAnthropicCost(usage: any): number {
  const inputCostPer1M = 3.00; // $3 per 1M input tokens
  const outputCostPer1M = 15.00; // $15 per 1M output tokens
  
  const inputCost = (usage.input_tokens / 1_000_000) * inputCostPer1M;
  const outputCost = (usage.output_tokens / 1_000_000) * outputCostPer1M;
  
  return inputCost + outputCost;
}

// Budget check helper
async function checkAndUpdateBudget(
  supabase: any,
  userId: string,
  estimatedCost: number
): Promise<{ allowed: boolean; reason?: string }> {
  // Get or create user budget
  let { data: budget } = await supabase
    .from('user_budget')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!budget) {
    // Create budget for new user
    const { data: newBudget } = await supabase
      .from('user_budget')
      .insert({
        user_id: userId,
        daily_limit: 20.00,
        daily_spent: 0,
        monthly_limit: 100.00,
        monthly_spent: 0,
      })
      .select()
      .single();
    
    budget = newBudget;
  }

  // Check if need to reset daily spending
  const today = new Date().toISOString().split('T')[0];
  if (budget.last_reset_date !== today) {
    await supabase
      .from('user_budget')
      .update({
        daily_spent: 0,
        last_reset_date: today,
      })
      .eq('user_id', userId);
    
    budget.daily_spent = 0;
  }

  // Check daily limit
  if (budget.daily_spent + estimatedCost > budget.daily_limit) {
    return {
      allowed: false,
      reason: `Daily budget limit ($${budget.daily_limit}) would be exceeded. Current: $${budget.daily_spent.toFixed(2)}`,
    };
  }

  // Check monthly limit
  if (budget.monthly_spent + estimatedCost > budget.monthly_limit) {
    return {
      allowed: false,
      reason: `Monthly budget limit ($${budget.monthly_limit}) would be exceeded. Current: $${budget.monthly_spent.toFixed(2)}`,
    };
  }

  return { allowed: true };
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const supabase = createServerClient();

    // Get proposal
    const { data: proposal, error: proposalError } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', proposalId)
      .eq('user_id', user.id)
      .single();

    if (proposalError || !proposal) {
      return Response.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Estimate cost (typical PDF extraction: $0.30-0.70)
    const estimatedCost = 0.70;
    
    // Check budget
    const budgetCheck = await checkAndUpdateBudget(
      supabase,
      user.id,
      estimatedCost
    );

    if (!budgetCheck.allowed) {
      return Response.json(
        { error: budgetCheck.reason },
        { status: 402 } // Payment Required
      );
    }

    // Update status
    await supabase
      .from('proposals')
      .update({
        extraction_status: 'processing',
        extraction_started_at: new Date().toISOString(),
      })
      .eq('id', proposalId);

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('proposals')
      .download(proposal.file_path);

    if (downloadError) {
      throw new Error('Failed to download file');
    }

    // Extract text based on file type
    let extractedText = '';

    if (proposal.file_type === 'pdf') {
      const buffer = await fileData.arrayBuffer();
      const pdfData = await pdf(Buffer.from(buffer));
      extractedText = pdfData.text;
    } else {
      // Excel
      const buffer = await fileData.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      extractedText = XLSX.utils.sheet_to_csv(sheet);
    }

    // Send to Claude for structured extraction
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `You are a construction proposal analyzer. Extract all line items from this proposal into a structured JSON format.

PROPOSAL TEXT:
${extractedText}

Extract each line item with:
- location: The section/division (e.g., "01 General Requirements", "03 Concrete")
- category: The subsection (e.g., "PROJECT MANAGEMENT", "FOOTINGS")
- description: Clear description of the work
- unit: Unit of measure (EA, SF, LF, etc.)
- quantity: Numeric quantity
- unit_price: Price per unit
- total_price: Total cost for this item

Return ONLY valid JSON in this format:
{
  "line_items": [
    {
      "location": "01 General Requirements",
      "category": "PROJECT MANAGEMENT",
      "description": "Project Management",
      "unit": "LS",
      "quantity": 1,
      "unit_price": 50000,
      "total_price": 50000
    }
  ]
}

IMPORTANT: 
- Extract ALL line items from the document
- Ensure total_price = quantity * unit_price
- Use null for missing values
- Do NOT include any text outside the JSON`,
        },
      ],
    });

    // Calculate actual cost
    const actualCost = calculateAnthropicCost(message.usage);

    // Track API usage
    await supabase.from('api_usage').insert({
      user_id: user.id,
      operation_type: 'extraction',
      api_provider: 'anthropic',
      tokens_used: message.usage.input_tokens + message.usage.output_tokens,
      estimated_cost: actualCost,
      proposal_id: proposalId,
      request_data: { file_type: proposal.file_type },
      response_data: { line_items_count: 0 }, // Will update below
    });

    // Update user budget
    await supabase.rpc('increment_spending', {
      p_user_id: user.id,
      p_amount: actualCost,
    });

    // Parse response
    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse extraction response');
    }

    const extracted = JSON.parse(jsonMatch[0]);

    if (!extracted.line_items || !Array.isArray(extracted.line_items)) {
      throw new Error('Invalid extraction format');
    }

    // Create party for contractor if doesn't exist
    const { data: existingParty } = await supabase
      .from('parties')
      .select('id')
      .eq('project_id', proposal.project_id)
      .eq('name', proposal.contractor_name)
      .single();

    let partyId = existingParty?.id;

    if (!partyId) {
      const { data: newParty } = await supabase
        .from('parties')
        .insert({
          user_id: user.id,
          project_id: proposal.project_id,
          name: proposal.contractor_name,
          party_type: 'contractor',
        })
        .select('id')
        .single();

      partyId = newParty?.id;
    }

    // Insert line items
    const lineItemsToInsert = extracted.line_items.map((item: any) => ({
      user_id: user.id,
      proposal_id: proposalId,
      party_id: partyId,
      location: item.location || null,
      category: item.category || null,
      description: item.description,
      unit: item.unit || null,
      quantity: item.quantity || null,
      unit_price: item.unit_price || null,
      total_price: item.total_price,
    }));

    const { error: insertError } = await supabase
      .from('line_items')
      .insert(lineItemsToInsert);

    if (insertError) {
      throw new Error(`Failed to insert line items: ${insertError.message}`);
    }

    // Calculate total
    const totalAmount = extracted.line_items.reduce(
      (sum: number, item: any) => sum + (item.total_price || 0),
      0
    );

    // Update proposal status
    await supabase
      .from('proposals')
      .update({
        extraction_status: 'completed',
        extraction_completed_at: new Date().toISOString(),
        total_amount: totalAmount,
        contractor_party_id: partyId,
      })
      .eq('id', proposalId);

    return Response.json({
      success: true,
      line_items_count: extracted.line_items.length,
      total_amount: totalAmount,
      cost: actualCost,
    });

  } catch (error: any) {
    console.error('Extraction error:', error);

    // Update status to failed
    const supabase = createServerClient();
    await supabase
      .from('proposals')
      .update({ extraction_status: 'failed' })
      .eq('id', params.id);

    return Response.json(
      { error: error.message || 'Extraction failed' },
      { status: 500 }
    );
  }
}
```

**Also add this PostgreSQL function for budget tracking:**

```sql
-- Helper function to increment user spending
CREATE OR REPLACE FUNCTION increment_spending(
  p_user_id UUID,
  p_amount DECIMAL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO user_budget (user_id, daily_spent, monthly_spent)
  VALUES (p_user_id, p_amount, p_amount)
  ON CONFLICT (user_id)
  DO UPDATE SET
    daily_spent = user_budget.daily_spent + p_amount,
    monthly_spent = user_budget.monthly_spent + p_amount,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 🔍 BRAVE SEARCH INTEGRATION

### **Setup:**

1. Sign up for Brave Search API at https://brave.com/search/api/
2. Get API key
3. Add to `.env.local`:

```bash
BRAVE_API_KEY=your_brave_api_key_here
```

### **Brave Search Helper:**

```typescript
// lib/brave-search.ts

interface BraveSearchResult {
  title: string;
  url: string;
  description: string;
  snippet?: string;
}

export async function searchBrave(
  query: string,
  count: number = 10
): Promise<BraveSearchResult[]> {
  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', count.toString());

  const response = await fetch(url.toString(), {
    headers: {
      'X-Subscription-Token': process.env.BRAVE_API_KEY!,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Brave Search failed: ${response.statusText}`);
  }

  const data = await response.json();

  return (data.web?.results || []).map((result: any) => ({
    title: result.title,
    url: result.url,
    description: result.description,
    snippet: result.extra_snippets?.[0],
  }));
}

// Cost calculation
export function calculateBraveCost(numResults: number): number {
  // Brave Search Paid Tier: $5 per 1000 queries
  // Free tier: 1 request per second, 15,000 per month
  return (numResults / 1000) * 5.00;
}
```

---

## 🤖 COST RESEARCH ENGINE

### **Research API Route:**

```typescript
// app/api/line-items/[id]/research/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';
import { searchBrave, calculateBraveCost } from '@/lib/brave-search';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

function calculateAnthropicCost(usage: any): number {
  const inputCostPer1M = 3.00;
  const outputCostPer1M = 15.00;
  return ((usage.input_tokens / 1_000_000) * inputCostPer1M) +
         ((usage.output_tokens / 1_000_000) * outputCostPer1M);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const supabase = createServerClient();

    // Get line item
    const { data: lineItem, error: itemError } = await supabase
      .from('line_items')
      .select('*, proposal:proposals(*, project:projects(*))')
      .eq('id', lineItemId)
      .eq('user_id', user.id)
      .single();

    if (itemError || !lineItem) {
      return Response.json(
        { error: 'Line item not found' },
        { status: 404 }
      );
    }

    // Check cache first
    const cacheKey = normalizeForCache(lineItem);
    const cached = await checkCache(supabase, cacheKey, lineItem.proposal.project);

    if (cached) {
      // Use cached result
      await supabase.from('line_items').update({
        market_avg: cached.market_avg,
        variance_percent: calculateVariance(lineItem.total_price, cached.market_avg),
        flag_color: cached.flag_color,
        last_researched_at: new Date().toISOString(),
      }).eq('id', lineItemId);

      return Response.json({
        cached: true,
        market_avg: cached.market_avg,
        flag_color: cached.flag_color,
        cost: 0,
      });
    }

    // Estimate cost
    const estimatedCost = 0.30; // Typical research cost
    
    // Check budget
    const budgetCheck = await checkAndUpdateBudget(supabase, user.id, estimatedCost);
    if (!budgetCheck.allowed) {
      return Response.json({ error: budgetCheck.reason }, { status: 402 });
    }

    // Create research job
    const { data: job } = await supabase
      .from('research_jobs')
      .insert({
        user_id: user.id,
        line_item_id: lineItemId,
        status: 'processing',
        search_query: buildSearchQuery(lineItem),
      })
      .select()
      .single();

    // Search web
    const searchQuery = buildSearchQuery(lineItem);
    const searchResults = await searchBrave(searchQuery, 10);
    
    const braveCost = calculateBraveCost(1);

    // Track Brave API usage
    await supabase.from('api_usage').insert({
      user_id: user.id,
      operation_type: 'research',
      api_provider: 'brave',
      estimated_cost: braveCost,
      line_item_id: lineItemId,
    });

    // Analyze with Claude
    const searchContext = searchResults
      .map((r, i) => `[${i + 1}] ${r.title}\n${r.description}\nURL: ${r.url}`)
      .join('\n\n');

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `You are a construction cost analyst. Analyze current market costs for this line item based on web search results.

LINE ITEM:
${lineItem.description}
Quantity: ${lineItem.quantity} ${lineItem.unit}
Contractor Price: $${lineItem.total_price.toLocaleString()}
${lineItem.unit_price ? `Unit Price: $${lineItem.unit_price}/` + lineItem.unit : ''}

PROJECT CONTEXT:
Location: ${lineItem.proposal.project.city}, ${lineItem.proposal.project.state}
Project Type: ${lineItem.proposal.project.project_type}
Quality: ${lineItem.proposal.project.quality_level}
${lineItem.proposal.project.lot_size_acres ? `Lot Size: ${lineItem.proposal.project.lot_size_acres} acres` : ''}
${lineItem.proposal.project.topography ? `Topography: ${lineItem.proposal.project.topography}` : ''}
${lineItem.proposal.project.soil_type ? `Soil Type: ${lineItem.proposal.project.soil_type}` : ''}
${lineItem.proposal.project.site_access ? `Site Access: ${lineItem.proposal.project.site_access}` : ''}
${lineItem.proposal.project.utilities_proximity ? `Utilities: ${lineItem.proposal.project.utilities_proximity}` : ''}
${lineItem.proposal.project.urban_rural ? `Setting: ${lineItem.proposal.project.urban_rural}` : ''}
${lineItem.proposal.project.tree_clearing_needed ? 'Clearing Required: Yes' : ''}

IMPORTANT: Consider these site conditions when evaluating costs. Steep terrain, difficult access, 
rock excavation, and rural locations can legitimately increase costs by 30-200% compared to ideal conditions.

SEARCH RESULTS:
${searchContext}

Provide a JSON analysis:
{
  "market_low": 45000,
  "market_high": 75000,
  "market_avg": 60000,
  "confidence_score": 0.85,
  "variance_percent": 10.5,
  "flag_color": "yellow",
  "explanation": "Brief explanation of your analysis",
  "sources": ["url1", "url2"]
}

IMPORTANT:
- market values should be total cost for the quantity specified
- variance_percent = ((contractor_price - market_avg) / market_avg) * 100
- flag_color: "green" if within 10%, "yellow" if 10-30%, "red" if >30%
- confidence_score: 0-1, how confident you are in the data
- Return ONLY valid JSON`,
        },
      ],
    });

    const claudeCost = calculateAnthropicCost(message.usage);

    // Track Claude API usage
    await supabase.from('api_usage').insert({
      user_id: user.id,
      operation_type: 'research',
      api_provider: 'anthropic',
      tokens_used: message.usage.input_tokens + message.usage.output_tokens,
      estimated_cost: claudeCost,
      line_item_id: lineItemId,
    });

    // Update budget
    const totalCost = braveCost + claudeCost;
    await supabase.rpc('increment_spending', {
      p_user_id: user.id,
      p_amount: totalCost,
    });

    // Parse response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Failed to parse analysis');

    const analysis = JSON.parse(jsonMatch[0]);

    // Validate analysis
    if (!validateAnalysis(analysis, lineItem)) {
      throw new Error('Analysis failed validation - appears to be hallucinated');
    }

    // Update research job
    await supabase.from('research_jobs').update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      ...analysis,
    }).eq('id', job.id);

    // Update line item
    await supabase.from('line_items').update({
      research_job_id: job.id,
      market_avg: analysis.market_avg,
      variance_percent: analysis.variance_percent,
      flag_color: analysis.flag_color,
      last_researched_at: new Date().toISOString(),
    }).eq('id', lineItemId);

    // Add to learning database
    await addToBenchmarks(supabase, lineItem, analysis);

    return Response.json({
      ...analysis,
      cost: totalCost,
    });

  } catch (error: any) {
    console.error('Research error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function buildSearchQuery(lineItem: any): string {
  const project = lineItem.proposal.project;
  
  // Base query with location and year
  let query = `${lineItem.description} cost ${project.city} ${project.state} ${new Date().getFullYear()}`;
  
  // Add topography context for site-sensitive items
  if (lineItem.category && isTopographySensitive(lineItem.category)) {
    if (project.topography && ['steep', 'very_steep'].includes(project.topography)) {
      query += ' steep terrain';
    }
  }
  
  // Add urban/rural context (affects labor, access, material delivery)
  if (project.urban_rural === 'rural' || project.urban_rural === 'remote') {
    query += ' rural';
  }
  
  // Add soil context for foundation/excavation items
  if (lineItem.category && isFoundationRelated(lineItem.category)) {
    if (project.soil_type === 'rock') {
      query += ' rock excavation';
    } else if (project.soil_type === 'clay') {
      query += ' clay soil';
    }
  }
  
  // Add access context for large material deliveries
  if (project.site_access && ['gravel_road', 'dirt_road', 'difficult'].includes(project.site_access)) {
    query += ' difficult access';
  }
  
  return query;
}

function isTopographySensitive(category: string): boolean {
  const sensitive = [
    'FOUNDATION', 'FOOTINGS', 'GRADING', 'EXCAVATION', 
    'SITE WORK', 'DRAINAGE', 'RETAINING'
  ];
  return sensitive.some(s => category?.toUpperCase().includes(s));
}

function isFoundationRelated(category: string): boolean {
  const foundation = [
    'FOUNDATION', 'FOOTINGS', 'EXCAVATION', 'CONCRETE',
    'BASEMENT', 'CRAWL SPACE'
  ];
  return foundation.some(s => category?.toUpperCase().includes(s));
}

function normalizeForCache(lineItem: any): string {
  return `${lineItem.category}_${lineItem.description.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
}

async function checkCache(supabase: any, cacheKey: string, project: any) {
  const { data } = await supabase
    .from('cost_benchmarks')
    .select('*')
    .eq('item_description_normalized', cacheKey)
    .eq('region', `${project.city}, ${project.state}`)
    .eq('year', new Date().getFullYear())
    .order('confidence_score', { ascending: false })
    .limit(1)
    .single();

  return data;
}

function validateAnalysis(analysis: any, lineItem: any): boolean {
  // Check for reasonable values
  if (analysis.market_avg <= 0) return false;
  if (analysis.market_low > analysis.market_avg) return false;
  if (analysis.market_high < analysis.market_avg) return false;
  if (analysis.confidence_score < 0 || analysis.confidence_score > 1) return false;
  
  // Check variance makes sense
  const expectedVariance = ((lineItem.total_price - analysis.market_avg) / analysis.market_avg) * 100;
  if (Math.abs(expectedVariance - analysis.variance_percent) > 5) return false;
  
  return true;
}

function calculateVariance(contractorPrice: number, marketAvg: number): number {
  return ((contractorPrice - marketAvg) / marketAvg) * 100;
}

async function addToBenchmarks(supabase: any, lineItem: any, analysis: any) {
  const project = lineItem.proposal.project;
  const now = new Date();
  
  await supabase.from('cost_benchmarks').upsert({
    item_category: lineItem.category,
    item_description_normalized: normalizeForCache(lineItem),
    region: `${project.city}, ${project.state}`,
    project_type: project.project_type,
    quality_level: project.quality_level,
    unit: lineItem.unit,
    unit_price: lineItem.unit_price,
    total_price: analysis.market_avg,
    year: now.getFullYear(),
    quarter: Math.floor(now.getMonth() / 3) + 1,
    confidence_score: analysis.confidence_score,
    source: 'researched',
  }, {
    onConflict: 'item_category,item_description_normalized,region,year,quarter',
  });
}

async function checkAndUpdateBudget(supabase: any, userId: string, cost: number) {
  let { data: budget } = await supabase
    .from('user_budget')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!budget) {
    const { data: newBudget } = await supabase
      .from('user_budget')
      .insert({
        user_id: userId,
        daily_limit: 20.00,
        daily_spent: 0,
        monthly_limit: 100.00,
        monthly_spent: 0,
      })
      .select()
      .single();
    
    budget = newBudget;
  }

  const today = new Date().toISOString().split('T')[0];
  if (budget.last_reset_date !== today) {
    await supabase
      .from('user_budget')
      .update({
        daily_spent: 0,
        last_reset_date: today,
      })
      .eq('user_id', userId);
    
    budget.daily_spent = 0;
  }

  if (budget.daily_spent + cost > budget.daily_limit) {
    return {
      allowed: false,
      reason: `Daily budget limit ($${budget.daily_limit}) would be exceeded`,
    };
  }

  if (budget.monthly_spent + cost > budget.monthly_limit) {
    return {
      allowed: false,
      reason: `Monthly budget limit ($${budget.monthly_limit}) would be exceeded`,
    };
  }

  return { allowed: true };
}
```

---

## 💰 COST TRACKING & BUDGET CONTROLS

### **Budget Monitor Dashboard:**

```typescript
// app/dashboard/budget/page.tsx
import { createServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function BudgetPage() {
  const supabase = createServerClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: budget } = await supabase
    .from('user_budget')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  const { data: usage } = await supabase
    .from('api_usage')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const dailyPercent = budget ? (budget.daily_spent / budget.daily_limit) * 100 : 0;
  const monthlyPercent = budget ? (budget.monthly_spent / budget.monthly_limit) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a href="/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">API Budget Monitor</h1>

        {budget && (
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Daily Spending</h2>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Today</span>
                  <span>${budget.daily_spent.toFixed(2)} / ${budget.daily_limit.toFixed(2)}</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      dailyPercent > 80 ? 'bg-red-500' :
                      dailyPercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(dailyPercent, 100)}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Resets daily at midnight
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Monthly Spending</h2>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>This Month</span>
                  <span>${budget.monthly_spent.toFixed(2)} / ${budget.monthly_limit.toFixed(2)}</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      monthlyPercent > 80 ? 'bg-red-500' :
                      monthlyPercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(monthlyPercent, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Recent API Usage</h2>
          </div>
          
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Operation</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Provider</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {usage?.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-6 py-4 text-sm">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {item.operation_type}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {item.api_provider}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    ${item.estimated_cost.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
```

---

## 💬 AI HOVER CHATBOT

### **Chat API Route:**

```typescript
// app/api/line-items/[id]/chat/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const { message } = await req.json();
    const supabase = createServerClient();

    // Get line item with context
    const { data: lineItem } = await supabase
      .from('line_items')
      .select(`
        *,
        proposal:proposals(
          *,
          project:projects(*)
        ),
        research_job:research_jobs(*)
      `)
      .eq('id', lineItemId)
      .eq('user_id', user.id)
      .single();

    if (!lineItem) {
      return Response.json({ error: 'Line item not found' }, { status: 404 });
    }

    // Get chat history
    const { data: history } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('line_item_id', lineItemId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .limit(10);

    // Build context
    const context = `
LINE ITEM:
${lineItem.description}
Quantity: ${lineItem.quantity} ${lineItem.unit}
Unit Price: $${lineItem.unit_price || 'N/A'}
Total: $${lineItem.total_price.toLocaleString()}

PROJECT:
Name: ${lineItem.proposal.project.name}
Type: ${lineItem.proposal.project.project_type}
Location: ${lineItem.proposal.project.city}, ${lineItem.proposal.project.state}
${lineItem.proposal.project.topography ? `Topography: ${lineItem.proposal.project.topography}` : ''}
${lineItem.proposal.project.soil_type ? `Soil: ${lineItem.proposal.project.soil_type}` : ''}
${lineItem.proposal.project.urban_rural ? `Setting: ${lineItem.proposal.project.urban_rural}` : ''}
${lineItem.proposal.project.site_access ? `Access: ${lineItem.proposal.project.site_access}` : ''}

${lineItem.research_job ? `
MARKET ANALYSIS:
Market Average: $${lineItem.research_job.market_avg?.toLocaleString()}
Variance: ${lineItem.research_job.variance_percent}%
Flag: ${lineItem.research_job.flag_color}
Explanation: ${lineItem.research_job.explanation}
` : ''}
`;

    // Build messages array
    const messages = [
      ...(history || []).map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ];

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: `You are a helpful construction cost advisor. You're helping a property developer understand this line item from a contractor proposal. Be concise and practical.

${context}

Answer questions about:
- What this item means
- Whether the cost seems reasonable
- What alternatives might exist
- Negotiation strategies

Keep responses under 150 words.`,
      messages: messages as any,
    });

    const assistantMessage = response.content[0].type === 'text' 
      ? response.content[0].text 
      : '';

    // Calculate cost
    const cost = ((response.usage.input_tokens / 1_000_000) * 3.00) +
                 ((response.usage.output_tokens / 1_000_000) * 15.00);

    // Save messages
    await supabase.from('chat_messages').insert([
      {
        user_id: user.id,
        line_item_id: lineItemId,
        proposal_id: lineItem.proposal_id,
        role: 'user',
        content: message,
      },
      {
        user_id: user.id,
        line_item_id: lineItemId,
        proposal_id: lineItem.proposal_id,
        role: 'assistant',
        content: assistantMessage,
        tokens_used: response.usage.input_tokens + response.usage.output_tokens,
        estimated_cost: cost,
      },
    ]);

    // Track API usage
    await supabase.from('api_usage').insert({
      user_id: user.id,
      operation_type: 'chat',
      api_provider: 'anthropic',
      tokens_used: response.usage.input_tokens + response.usage.output_tokens,
      estimated_cost: cost,
      line_item_id: lineItemId,
    });

    // Update budget
    await supabase.rpc('increment_spending', {
      p_user_id: user.id,
      p_amount: cost,
    });

    return Response.json({
      message: assistantMessage,
      cost,
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

---

## ⭐ USER RATINGS SYSTEM

### **Rating API Route:**

```typescript
// app/api/line-items/[id]/rate/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const body = await req.json();
    const supabase = createServerClient();

    // Get line item
    const { data: lineItem } = await supabase
      .from('line_items')
      .select('*, research_job:research_jobs(*), proposal:proposals(project:projects(*))')
      .eq('id', lineItemId)
      .eq('user_id', user.id)
      .single();

    if (!lineItem) {
      return Response.json({ error: 'Line item not found' }, { status: 404 });
    }

    // Save rating
    const { data: rating } = await supabase
      .from('user_ratings')
      .insert({
        user_id: user.id,
        line_item_id: lineItemId,
        research_job_id: lineItem.research_job_id,
        rating: body.rating,
        accuracy_feedback: body.accuracy_feedback,
        actual_cost: body.actual_cost,
        comments: body.comments,
      })
      .select()
      .single();

    // If user provided actual cost, add to benchmarks
    if (body.actual_cost) {
      await supabase.from('cost_benchmarks').upsert({
        item_category: lineItem.category,
        item_description_normalized: normalizeDescription(lineItem.description),
        region: `${lineItem.proposal.project.city}, ${lineItem.proposal.project.state}`,
        project_type: lineItem.proposal.project.project_type,
        quality_level: lineItem.proposal.project.quality_level,
        unit: lineItem.unit,
        unit_price: body.actual_cost / lineItem.quantity,
        total_price: body.actual_cost,
        year: new Date().getFullYear(),
        quarter: Math.floor(new Date().getMonth() / 3) + 1,
        confidence_score: body.rating / 5, // Use rating as confidence
        source: 'user_rated',
      }, {
        onConflict: 'item_category,item_description_normalized,region,year,quarter',
      });
    }

    return Response.json({ rating });

  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function normalizeDescription(desc: string): string {
  return desc.toLowerCase().replace(/[^a-z0-9]/g, '_');
}
```

---

## 🎨 PHASE 2 UI UPDATES

### **Line Items Table with Flags:**

Update the line items table to show research results:

```typescript
// components/LineItemRow.tsx
'use client';

import { useState } from 'react';

export default function LineItemRow({ item }: { item: any }) {
  const [showChat, setShowChat] = useState(false);
  const [researching, setResearching] = useState(false);

  async function handleResearch() {
    setResearching(true);
    try {
      const res = await fetch(`/api/line-items/${item.id}/research`, {
        method: 'POST',
      });
      if (res.ok) {
        window.location.reload();
      }
    } finally {
      setResearching(false);
    }
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        {item.flag_color && (
          <div className={`inline-block w-3 h-3 rounded-full mr-2 ${
            item.flag_color === 'green' ? 'bg-green-500' :
            item.flag_color === 'yellow' ? 'bg-yellow-500' :
            'bg-red-500'
          }`} />
        )}
        <div className="text-sm">
          {item.category && (
            <div className="text-gray-500 text-xs">{item.category}</div>
          )}
          <div>
            {item.description}
            {item.is_edited && (
              <span className="ml-2 text-xs text-orange-600">(edited)</span>
            )}
          </div>
          {item.market_avg && (
            <div className="text-xs text-gray-500 mt-1">
              Market avg: ${item.market_avg.toLocaleString()} 
              ({item.variance_percent > 0 ? '+' : ''}{item.variance_percent.toFixed(1)}%)
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{item.party?.name || '-'}</td>
      <td className="px-4 py-3 text-right text-sm">
        {item.quantity} {item.unit}
      </td>
      <td className="px-4 py-3 text-right text-sm">
        {item.unit_price ? `$${item.unit_price.toLocaleString()}` : '-'}
      </td>
      <td className="px-4 py-3 text-right text-sm font-medium">
        ${item.total_price.toLocaleString()}
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex gap-2 justify-center">
          {!item.last_researched_at && (
            <button
              onClick={handleResearch}
              disabled={researching}
              className="text-blue-600 hover:underline text-sm"
            >
              {researching ? 'Researching...' : 'Research'}
            </button>
          )}
          <button
            onClick={() => setShowChat(true)}
            className="text-blue-600 hover:underline text-sm"
          >
            Ask AI
          </button>
        </div>
      </td>
    </tr>
  );
}
```

---

## 🧪 PHASE 2 TESTING

### **Test Plan:**

1. **Budget Controls:**
   - Check budget dashboard shows limits
   - Try to exceed daily limit (should block)
   - Verify confirmation for operations >$5

2. **Cost Research:**
   - Research VIP line items (~198 items)
   - Verify red/yellow/green flags
   - Check market averages are reasonable
   - Test cache (re-research same item = $0)

3. **Chatbot:**
   - Ask questions about line items
   - Verify context-aware responses
   - Check conversation history persists

4. **Ratings:**
   - Rate a researched item
   - Provide actual cost
   - Verify it adds to benchmarks

5. **Budget Tracking:**
   - Verify all operations tracked
   - Check daily reset works
   - Monitor monthly spending

### **Expected Costs:**

- Research 20 items: ~$6-8
- Chatbot conversations: ~$2-3
- Extraction (already tested): ~$10
- **Total Phase 2 testing: ~$15**

---

## ✅ SUCCESS CRITERIA - PHASE 2

**You're done when:**

**Budget Controls:**
- [ ] Budget dashboard shows spending
- [ ] Daily spending tracked
- [ ] Expensive operations require confirmation
- [ ] Extraction route tracks costs

**Research System:**
- [ ] VIP proposal analyzed (~198 items)
- [ ] Red/yellow/green flags display
- [ ] Cache working (test with second analysis)
- [ ] Variance calculations correct

**Chatbot:**
- [ ] Can ask questions on line items
- [ ] Gets contextual responses
- [ ] Chat messages stored
- [ ] Chat costs tracked

**Testing:**
- [ ] All Phase 2 tests passing
- [ ] No budget overruns
- [ ] Cache hit rate >70%

**Next Steps:**

Proceed to Phase 3 to add scope generation capabilities:
1. Two-tier scope generation system (Quick & Comprehensive)
2. User preferences memory (learns design preferences)
3. Alternative decision tracking (learns what users like/reject)
4. Multi-input generation (text, photos, documents)
5. Baseline proposal management

---

# PHASE 3: SCOPE GENERATION

## 📋 PHASE 3 OVERVIEW

**Goal:** Enable users to generate baseline cost estimates BEFORE receiving contractor bids

**Why this matters:**
- Users can create their own "expected cost" baseline to compare contractor proposals against
- Prevents contractors from overcharging uninformed buyers
- Identifies scope gaps in contractor proposals
- Provides intelligent budget planning before architect engagement

**What you'll build:**
1. **Two-Tier Scope Generation System**
   - Quick Estimate (Tier 1): ~$0.40-2 per generation
   - Comprehensive Estimate (Tier 2): ~$25-35 per generation
2. **User Preferences Memory System** (improves accuracy over time)
3. **Alternative Decision Memory** (learns what users like/reject)
4. **Multi-Input Generation Interface**
5. **Baseline Proposal Management**

**Cost:** ~$70 for testing (scope generation is expensive)

---

## 🎯 WHAT CHANGED IN PHASE 3

**New Tables:**
- `user_preferences` - Stores learned design preferences and decision patterns
- `alternative_decisions` - Tracks which alternatives users accept/reject
- `generation_inputs` - Logs how baseline proposals were generated

**Enhanced Tables:**
- `proposals` table gets new columns:
  - `is_baseline` (BOOLEAN) - marks AI-generated proposals
  - `generation_method` (TEXT) - 'quick' or 'comprehensive'
  - `confidence_score` (DECIMAL) - Claude's confidence in the estimate
  - `key_assumptions` (TEXT[]) - assumptions made during generation
  - `missing_information` (TEXT[]) - what info would improve accuracy
  - `generation_prompt` (TEXT) - user's original prompt

**New API Routes:**
- `/api/proposals/generate-quick` - Tier 1 generation
- `/api/proposals/generate-comprehensive` - Tier 2 generation
- `/api/user-preferences` - CRUD for user preferences
- `/api/alternative-decisions` - Track accept/reject decisions

**UI Components:**
- Scope generation wizard (multi-step form)
- Photo upload with preview
- Document upload interface
- Baseline proposal viewer (shows confidence scores, assumptions, missing info)
- User preferences editor
- Decision history viewer

---

## 🗄️ DATABASE UPDATES - PHASE 3

### **1. Update proposals table**

```sql
-- Add scope generation columns to existing proposals table
ALTER TABLE proposals
  ADD COLUMN is_baseline BOOLEAN DEFAULT FALSE,
  ADD COLUMN generation_method TEXT CHECK (generation_method IN ('quick', 'comprehensive', 'uploaded')),
  ADD COLUMN confidence_score DECIMAL(3,2) CHECK (confidence_score BETWEEN 0 AND 1),
  ADD COLUMN key_assumptions TEXT[],
  ADD COLUMN missing_information TEXT[],
  ADD COLUMN generation_prompt TEXT;

-- Add comment
COMMENT ON COLUMN proposals.is_baseline IS 'TRUE if AI-generated baseline, FALSE if uploaded contractor proposal';
COMMENT ON COLUMN proposals.generation_method IS 'How the proposal was created: quick, comprehensive, or uploaded';
COMMENT ON COLUMN proposals.confidence_score IS 'Claude confidence score 0-1 for generated estimates';
```

### **2. Create user_preferences table**

```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Design preferences
  aesthetic_style TEXT[], -- ['modern', 'mountain', 'minimalist', 'traditional']
  preferred_materials JSONB, -- {"counters": "quartz", "flooring": "hardwood", "roofing": "metal"}
  quality_tier TEXT DEFAULT 'standard' CHECK (quality_tier IN ('economy', 'standard', 'luxury')),
  
  -- Feature preferences
  typical_features TEXT[], -- ['covered_porch', 'radiant_heat', 'smart_home', 'energy_efficient']
  avoided_features TEXT[], -- ['carpet', 'vinyl_siding', 'drop_ceiling']
  
  -- Decision patterns
  risk_tolerance TEXT CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')),
  budget_flexibility TEXT CHECK (budget_flexibility IN ('strict', 'flexible', 'very_flexible')),
  timeline_priority TEXT CHECK (timeline_priority IN ('speed', 'balanced', 'quality')),
  
  -- Learned from behavior
  typical_savings_target DECIMAL(5,2), -- Average % they aim to save
  accepts_alternatives_percent DECIMAL(5,2), -- How often they use alternatives
  
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences"
  ON user_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- Create index
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

COMMENT ON TABLE user_preferences IS 'Stores learned user design preferences and decision patterns';
```

### **3. Create alternative_decisions table**

```sql
CREATE TABLE alternative_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  alternative_id UUID REFERENCES alternatives(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Decision
  decision TEXT NOT NULL CHECK (decision IN ('accepted', 'rejected', 'considering')),
  decision_date TIMESTAMPTZ DEFAULT NOW(),
  
  -- Context
  alternative_type TEXT NOT NULL, -- 'modular_construction', 'mini_split_hvac', 'metal_roofing', etc.
  alternative_level TEXT NOT NULL CHECK (alternative_level IN ('macro', 'system', 'detail')),
  cost_delta DECIMAL(12,2),
  
  -- Reasoning (if provided)
  user_note TEXT,
  rejection_reason TEXT, -- 'quality_concern', 'aesthetic_mismatch', 'too_expensive', 'site_inappropriate'
  
  -- Track patterns
  rejection_count INTEGER DEFAULT 0,
  
  -- Metadata
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  line_item_id UUID REFERENCES line_items(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE alternative_decisions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own decisions"
  ON alternative_decisions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own decisions"
  ON alternative_decisions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own decisions"
  ON alternative_decisions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_alt_decisions_user_id ON alternative_decisions(user_id);
CREATE INDEX idx_alt_decisions_alt_type ON alternative_decisions(alternative_type);
CREATE INDEX idx_alt_decisions_level ON alternative_decisions(alternative_level);
CREATE INDEX idx_alt_decisions_decision ON alternative_decisions(decision);

COMMENT ON TABLE alternative_decisions IS 'Tracks user decisions on alternatives to improve future suggestions';
```

### **4. Create generation_inputs table**

```sql
CREATE TABLE generation_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Input tracking
  input_type TEXT NOT NULL CHECK (input_type IN ('text_prompt', 'photo', 'document', 'structured_form')),
  input_data JSONB, -- Stores relevant input details
  
  -- File references (if applicable)
  file_path TEXT, -- Path in Supabase storage
  file_type TEXT, -- 'image/jpeg', 'application/pdf', etc.
  file_size INTEGER,
  
  -- Processing metadata
  tokens_used INTEGER,
  cost DECIMAL(8,4)
);

-- Enable RLS
ALTER TABLE generation_inputs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own generation inputs"
  ON generation_inputs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generation inputs"
  ON generation_inputs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_gen_inputs_user_id ON generation_inputs(user_id);
CREATE INDEX idx_gen_inputs_proposal_id ON generation_inputs(proposal_id);
CREATE INDEX idx_gen_inputs_input_type ON generation_inputs(input_type);

COMMENT ON TABLE generation_inputs IS 'Tracks inputs used to generate baseline proposals';
```

---

## 🚀 TWO-TIER SCOPE GENERATION SYSTEM

### **TIER 1: QUICK ESTIMATE** (~$0.40-2 per generation)

**What it includes:**
- ✅ Natural language text prompt
- ✅ Structured form inputs (dropdowns for common selections)
- ✅ Basic Claude analysis (4096 max_tokens)
- ✅ High-level scope (50-80 line items)
- ✅ Uses CACHED cost data (no live web research)
- ✅ User preferences applied automatically
- ❌ No Vision analysis (no photos)
- ❌ No document parsing (no floor plans/surveys)
- ❌ No detailed site condition analysis

**Use cases:**
- Initial feasibility checks
- Early-stage planning
- Simple/standard projects
- Budget sanity checks before architect engagement

**Example prompt:**
```
"3,000 sqft single-family home, Boston MA, standard quality, 
flat lot, utilities at street. Budget target: $600k"
```

**Implementation:**

```typescript
// /app/api/proposals/generate-quick/route.ts
import Anthropic from '@anthropic-ai/sdk';
import { createServerClient } from '@/lib/supabase';

export async function POST(req: Request) {
  const supabase = createServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check budget before expensive operation
  const budgetCheck = await checkUserBudget(user.id, 2.00); // Reserve $2 for operation
  if (!budgetCheck.allowed) {
    return Response.json({ 
      error: 'Budget exceeded',
      details: budgetCheck.message
    }, { status: 429 });
  }

  const { 
    projectId, 
    prompt, 
    structuredInputs // Optional: { projectType, sqft, quality, location, etc. }
  } = await req.json();

  // Load user preferences
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Build context from preferences
  const preferencesContext = preferences ? `
    LEARNED USER PREFERENCES:
    - Aesthetic: ${preferences.aesthetic_style?.join(', ') || 'Not specified'}
    - Preferred materials: ${JSON.stringify(preferences.preferred_materials) || 'Not specified'}
    - Typical features: ${preferences.typical_features?.join(', ') || 'Not specified'}
    - Avoided features: ${preferences.avoided_features?.join(', ') || 'None'}
    - Quality tier: ${preferences.quality_tier}
    
    Use these as defaults unless the prompt specifies otherwise.
  ` : '';

  // Load cached cost benchmarks for this region
  const { data: cachedCosts } = await supabase
    .from('cost_benchmarks')
    .select('*')
    .ilike('region', `%${structuredInputs?.state || 'national'}%`)
    .limit(100);

  const costContext = cachedCosts?.length ? `
    CACHED COST DATA (${structuredInputs?.state || 'National'} averages):
    ${cachedCosts.map(c => `- ${c.description}: $${c.estimated_cost} ${c.unit ? 'per ' + c.unit : ''}`).join('\n')}
  ` : '';

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });

  const startTime = Date.now();

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    temperature: 0.3,
    system: `You are a construction estimating expert generating quick baseline cost estimates.

IMPORTANT CONSTRAINTS:
- Generate 50-80 line items (high-level only)
- Use cached cost data provided (do NOT make up numbers)
- Include confidence scores and key assumptions
- Note missing information that would improve accuracy
- Format as valid JSON only

${preferencesContext}

${costContext}`,
    messages: [
      {
        role: 'user',
        content: `Generate a quick construction cost estimate for:

USER PROMPT:
${prompt}

${structuredInputs ? `STRUCTURED INPUTS:
${JSON.stringify(structuredInputs, null, 2)}` : ''}

Return ONLY valid JSON in this exact format:
{
  "divisions": [
    {
      "division": "01",
      "name": "General Requirements",
      "items": [
        {
          "description": "Project Management & Supervision",
          "quantity": 1,
          "unit": "LS",
          "unit_cost": 45000,
          "total_cost": 45000,
          "confidence": "medium",
          "note": "Assumes 6-month project duration"
        }
      ]
    }
  ],
  "total_estimate": 580000,
  "line_items_count": 65,
  "confidence_score": 0.70,
  "key_assumptions": [
    "Flat lot requires minimal site work",
    "Standard quality finishes throughout",
    "Utilities at street - no extended runs",
    "Normal soil conditions assumed"
  ],
  "missing_information": [
    "Exact floor plan layout",
    "Specific fixture/finish selections",
    "Site survey with actual topography"
  ]
}

CRITICAL: Output ONLY the JSON. No markdown, no explanation, no backticks.`
      }
    ]
  });

  const endTime = Date.now();
  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  
  // Parse response
  let generatedScope;
  try {
    generatedScope = JSON.parse(responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
  } catch (parseError) {
    console.error('Failed to parse Claude response:', responseText);
    return Response.json({ 
      error: 'Failed to parse estimate',
      details: 'Claude returned invalid JSON'
    }, { status: 500 });
  }

  // Calculate cost
  const inputTokens = message.usage.input_tokens;
  const outputTokens = message.usage.output_tokens;
  const cost = calculateCost(inputTokens, outputTokens);

  // Create proposal record
  const { data: proposal, error: proposalError } = await supabase
    .from('proposals')
    .insert({
      user_id: user.id,
      project_id: projectId,
      name: `Baseline Estimate - ${new Date().toLocaleDateString()}`,
      is_baseline: true,
      generation_method: 'quick',
      confidence_score: generatedScope.confidence_score,
      key_assumptions: generatedScope.key_assumptions,
      missing_information: generatedScope.missing_information,
      generation_prompt: prompt
    })
    .select()
    .single();

  if (proposalError) throw proposalError;

  // Insert line items
  const lineItems = generatedScope.divisions.flatMap((div: any) =>
    div.items.map((item: any) => ({
      user_id: user.id,
      proposal_id: proposal.id,
      project_id: projectId,
      division: div.division,
      division_name: div.name,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      unit_cost: item.unit_cost,
      total_cost: item.total_cost,
      notes: item.note
    }))
  );

  const { error: itemsError } = await supabase
    .from('line_items')
    .insert(lineItems);

  if (itemsError) throw itemsError;

  // Log generation input
  await supabase
    .from('generation_inputs')
    .insert({
      user_id: user.id,
      proposal_id: proposal.id,
      input_type: 'text_prompt',
      input_data: { prompt, structuredInputs },
      tokens_used: inputTokens + outputTokens,
      cost
    });

  // Track cost
  await supabase.from('api_usage').insert({
    user_id: user.id,
    operation: 'scope_generation_quick',
    provider: 'anthropic',
    model: 'claude-sonnet-4-5-20250929',
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    cost,
    duration_ms: endTime - startTime
  });

  return Response.json({
    success: true,
    proposal_id: proposal.id,
    total_estimate: generatedScope.total_estimate,
    line_items_count: generatedScope.line_items_count,
    confidence_score: generatedScope.confidence_score,
    cost
  });
}
```

---

### **TIER 2: COMPREHENSIVE ESTIMATE** (~$25-35 per generation)

**What it includes:**
- ✅ Natural language text prompt
- ✅ Structured form inputs
- ✅ **Claude Vision** (analyze 3-5 site photos)
- ✅ **Document parsing** (floor plans, site surveys, requirements)
- ✅ Advanced Claude analysis (8192 max_tokens)
- ✅ Detailed scope (150-250 line items)
- ✅ **Live web research** for key items
- ✅ Site condition analysis
- ✅ User preferences applied automatically
- ✅ Alternative decision history considered

**Use cases:**
- Serious projects ready for contractor bids
- Complex sites with challenging conditions
- Competitive bidding preparation
- Projects where accuracy is critical

**Example inputs:**
```
Text: "8 luxury cabins, 1200 sqft each, mountain site"
Photos: 
  - Site overview showing steep terrain
  - Access road condition
  - Existing trees and clearing needed
Documents:
  - Preliminary site plan PDF
  - Topographic survey
```

**Implementation:**

```typescript
// /app/api/proposals/generate-comprehensive/route.ts
import Anthropic from '@anthropic-ai/sdk';
import { createServerClient } from '@/lib/supabase';
import { searchBrave } from '@/lib/brave-search';
import FormData from 'form-data';

export async function POST(req: Request) {
  const supabase = createServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check budget - reserve $35 for comprehensive generation
  const budgetCheck = await checkUserBudget(user.id, 35.00);
  if (!budgetCheck.allowed) {
    return Response.json({ 
      error: 'Budget exceeded',
      details: budgetCheck.message
    }, { status: 429 });
  }

  const formData = await req.formData();
  const projectId = formData.get('projectId') as string;
  const prompt = formData.get('prompt') as string;
  const photos = formData.getAll('photos') as File[];
  const documents = formData.getAll('documents') as File[];
  const structuredInputs = JSON.parse(formData.get('structuredInputs') as string || '{}');

  // Load user preferences
  const { data: preferences } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Load alternative decision history
  const { data: altHistory } = await supabase
    .from('alternative_decisions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  // Build preferences context
  const preferencesContext = preferences ? `
    LEARNED USER PREFERENCES:
    - Aesthetic: ${preferences.aesthetic_style?.join(', ') || 'Not specified'}
    - Preferred materials: ${JSON.stringify(preferences.preferred_materials) || 'Not specified'}
    - Typical features: ${preferences.typical_features?.join(', ') || 'Not specified'}
    - Avoided features: ${preferences.avoided_features?.join(', ') || 'None'}
    - Quality tier: ${preferences.quality_tier}
    
    ${altHistory?.length ? `
    PAST ALTERNATIVE DECISIONS:
    The user has consistently:
    ${altHistory.filter(h => h.decision === 'accepted').map(h => 
      `✅ Accepted: ${h.alternative_type} (saved $${Math.abs(h.cost_delta)})`
    ).join('\n')}
    ${altHistory.filter(h => h.decision === 'rejected' && h.rejection_count > 2).map(h =>
      `❌ Repeatedly rejected: ${h.alternative_type} (${h.rejection_reason})`
    ).join('\n')}
    
    Use accepted alternatives as preferred approaches. Avoid suggesting repeatedly-rejected alternatives.
    ` : ''}
  ` : '';

  // Process photos with Claude Vision
  let photoAnalysis = '';
  if (photos.length > 0) {
    const photoContents = await Promise.all(
      photos.slice(0, 5).map(async (photo) => {
        const buffer = Buffer.from(await photo.arrayBuffer());
        const base64 = buffer.toString('base64');
        const mimeType = photo.type;
        
        // Save to storage
        const photoPath = `${user.id}/generations/${Date.now()}_${photo.name}`;
        await supabase.storage
          .from('proposals')
          .upload(photoPath, buffer, { contentType: mimeType });

        return {
          type: 'image' as const,
          source: {
            type: 'base64' as const,
            media_type: mimeType,
            data: base64
          }
        };
      })
    );

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    const visionMessage = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: [
            ...photoContents,
            {
              type: 'text',
              text: `Analyze these site photos for a construction project. Identify:
1. Topography (flat, gentle slope, steep, very steep)
2. Vegetation and clearing requirements
3. Soil/ground conditions (visible)
4. Access challenges
5. Existing structures or obstacles
6. Site constraints
7. Notable features that affect construction costs

Be specific and quantitative where possible.`
            }
          ]
        }
      ]
    });

    photoAnalysis = visionMessage.content[0].type === 'text' ? visionMessage.content[0].text : '';

    // Track vision API cost
    await supabase.from('api_usage').insert({
      user_id: user.id,
      operation: 'scope_generation_vision',
      provider: 'anthropic',
      model: 'claude-sonnet-4-5-20250929',
      input_tokens: visionMessage.usage.input_tokens,
      output_tokens: visionMessage.usage.output_tokens,
      cost: calculateCost(visionMessage.usage.input_tokens, visionMessage.usage.output_tokens)
    });
  }

  // Process documents (PDFs, floor plans)
  let documentContext = '';
  if (documents.length > 0) {
    // Similar document parsing logic as PDF extraction...
    // Extract text from PDFs, parse key info
    documentContext = '...'; // Abbreviated for clarity
  }

  // Perform web research for key cost items
  const researchQueries = [
    `${structuredInputs.state} construction labor rates ${new Date().getFullYear()}`,
    `${structuredInputs.projectType} construction cost per sqft ${structuredInputs.state}`,
    `${structuredInputs.state} building permit costs ${structuredInputs.projectType}`
  ];

  let researchContext = '';
  for (const query of researchQueries) {
    const searchResults = await searchBrave(query);
    researchContext += `\nRESEARCH: ${query}\n${searchResults.web?.results.slice(0, 3).map(r => r.description).join('\n')}\n`;
    
    // Track search cost
    await supabase.from('api_usage').insert({
      user_id: user.id,
      operation: 'scope_generation_research',
      provider: 'brave',
      cost: 0.005
    });
  }

  // Generate comprehensive scope with Claude
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  });

  const startTime = Date.now();

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 8192,
    temperature: 0.3,
    system: `You are a senior construction estimator generating comprehensive baseline cost estimates.

IMPORTANT CONSTRAINTS:
- Generate 150-250 line items (detailed breakdown)
- Use research data and site analysis provided
- Account for site-specific challenges identified in photos
- Include confidence scores and detailed assumptions
- Note missing information that would improve accuracy
- Format as valid JSON only

${preferencesContext}

${photoAnalysis ? `SITE PHOTO ANALYSIS:\n${photoAnalysis}\n` : ''}

${documentContext ? `DOCUMENT CONTEXT:\n${documentContext}\n` : ''}

${researchContext}`,
    messages: [
      {
        role: 'user',
        content: `Generate a comprehensive construction cost estimate for:

USER PROMPT:
${prompt}

STRUCTURED INPUTS:
${JSON.stringify(structuredInputs, null, 2)}

Return ONLY valid JSON in this exact format:
{
  "divisions": [
    {
      "division": "01",
      "name": "General Requirements",
      "items": [
        {
          "description": "...",
          "quantity": 1,
          "unit": "LS",
          "unit_cost": 45000,
          "total_cost": 45000,
          "confidence": "high",
          "note": "..."
        }
      ]
    }
  ],
  "total_estimate": 2840000,
  "line_items_count": 187,
  "confidence_score": 0.85,
  "key_assumptions": [...],
  "missing_information": [...],
  "site_challenges": [...],
  "recommended_next_steps": [...]
}

CRITICAL: Output ONLY the JSON. No markdown, no explanation, no backticks.`
      }
    ]
  });

  const endTime = Date.now();
  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  
  // Parse and save (similar to Quick Estimate)...
  let generatedScope;
  try {
    generatedScope = JSON.parse(responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
  } catch (parseError) {
    console.error('Failed to parse Claude response:', responseText);
    return Response.json({ 
      error: 'Failed to parse estimate',
      details: 'Claude returned invalid JSON'
    }, { status: 500 });
  }

  // Calculate total cost (Vision + Research + Generation)
  const inputTokens = message.usage.input_tokens;
  const outputTokens = message.usage.output_tokens;
  const generationCost = calculateCost(inputTokens, outputTokens);
  const totalCost = generationCost; // Add vision + research costs already tracked

  // Create proposal record
  const { data: proposal, error: proposalError } = await supabase
    .from('proposals')
    .insert({
      user_id: user.id,
      project_id: projectId,
      name: `Comprehensive Baseline - ${new Date().toLocaleDateString()}`,
      is_baseline: true,
      generation_method: 'comprehensive',
      confidence_score: generatedScope.confidence_score,
      key_assumptions: generatedScope.key_assumptions,
      missing_information: generatedScope.missing_information,
      generation_prompt: prompt
    })
    .select()
    .single();

  if (proposalError) throw proposalError;

  // Insert line items...
  const lineItems = generatedScope.divisions.flatMap((div: any) =>
    div.items.map((item: any) => ({
      user_id: user.id,
      proposal_id: proposal.id,
      project_id: projectId,
      division: div.division,
      division_name: div.name,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      unit_cost: item.unit_cost,
      total_cost: item.total_cost,
      notes: item.note
    }))
  );

  await supabase.from('line_items').insert(lineItems);

  // Track cost
  await supabase.from('api_usage').insert({
    user_id: user.id,
    operation: 'scope_generation_comprehensive',
    provider: 'anthropic',
    model: 'claude-sonnet-4-5-20250929',
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    cost: generationCost,
    duration_ms: endTime - startTime
  });

  return Response.json({
    success: true,
    proposal_id: proposal.id,
    total_estimate: generatedScope.total_estimate,
    line_items_count: generatedScope.line_items_count,
    confidence_score: generatedScope.confidence_score,
    total_cost: totalCost
  });
}
```

---

## 🧠 USER PREFERENCES MEMORY

**Purpose:** Learn user's design preferences and decision patterns to make scope generation smarter over time

**How it works:**

1. **Initial Learning:**
   - After user's first project, DevWise analyzes the line items
   - Identifies patterns (materials used, features included)
   - Asks user to confirm preferences

2. **Continuous Refinement:**
   - User can edit preferences anytime in Settings
   - System updates based on observed patterns
   - Tracks savings targets and alternative acceptance rates

3. **Application:**
   - Automatically applied during scope generation as default choices
   - Used to generate smarter alternatives in Phase 4
   - Creates personalized experience

**UI Component:**

```typescript
// /app/dashboard/settings/preferences/page.tsx
export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  async function loadPreferences() {
    const { data } = await supabase
      .from('user_preferences')
      .select('*')
      .single();
    
    setPreferences(data);
    setLoading(false);
  }

  async function savePreferences() {
    await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...preferences
      });
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Design Preferences</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Aesthetic Style</CardTitle>
          <CardDescription>
            These preferences help DevWise generate more accurate estimates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Preferred Styles</Label>
              <MultiSelect
                options={['Modern', 'Traditional', 'Mountain', 'Minimalist', 'Craftsman']}
                value={preferences?.aesthetic_style || []}
                onChange={(styles) => setPreferences({...preferences, aesthetic_style: styles})}
              />
            </div>

            <div>
              <Label>Quality Tier</Label>
              <Select
                value={preferences?.quality_tier || 'standard'}
                onValueChange={(tier) => setPreferences({...preferences, quality_tier: tier})}
              >
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Material Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Countertops</Label>
              <Select
                value={preferences?.preferred_materials?.counters || 'granite'}
                onValueChange={(material) => 
                  setPreferences({
                    ...preferences,
                    preferred_materials: {
                      ...preferences?.preferred_materials,
                      counters: material
                    }
                  })
                }
              >
                <SelectItem value="granite">Granite</SelectItem>
                <SelectItem value="quartz">Quartz</SelectItem>
                <SelectItem value="marble">Marble</SelectItem>
                <SelectItem value="laminate">Laminate</SelectItem>
              </Select>
            </div>

            <div>
              <Label>Flooring</Label>
              <Select
                value={preferences?.preferred_materials?.flooring || 'hardwood'}
                onValueChange={(material) => 
                  setPreferences({
                    ...preferences,
                    preferred_materials: {
                      ...preferences?.preferred_materials,
                      flooring: material
                    }
                  })
                }
              >
                <SelectItem value="hardwood">Hardwood</SelectItem>
                <SelectItem value="engineered">Engineered Wood</SelectItem>
                <SelectItem value="tile">Tile</SelectItem>
                <SelectItem value="lvp">Luxury Vinyl Plank</SelectItem>
              </Select>
            </div>

            <div>
              <Label>Roofing</Label>
              <Select
                value={preferences?.preferred_materials?.roofing || 'asphalt_shingle'}
                onValueChange={(material) => 
                  setPreferences({
                    ...preferences,
                    preferred_materials: {
                      ...preferences?.preferred_materials,
                      roofing: material
                    }
                  })
                }
              >
                <SelectItem value="asphalt_shingle">Asphalt Shingle</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="tile">Tile</SelectItem>
                <SelectItem value="cedar_shake">Cedar Shake</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Decision Patterns</CardTitle>
          <CardDescription>
            Help us understand your priorities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Risk Tolerance</Label>
              <RadioGroup
                value={preferences?.risk_tolerance || 'moderate'}
                onValueChange={(value) => setPreferences({...preferences, risk_tolerance: value})}
              >
                <RadioGroupItem value="conservative">Conservative - Stick with proven approaches</RadioGroupItem>
                <RadioGroupItem value="moderate">Moderate - Open to some alternatives</RadioGroupItem>
                <RadioGroupItem value="aggressive">Aggressive - Maximize cost savings</RadioGroupItem>
              </RadioGroup>
            </div>

            <div>
              <Label>Budget Flexibility</Label>
              <RadioGroup
                value={preferences?.budget_flexibility || 'flexible'}
                onValueChange={(value) => setPreferences({...preferences, budget_flexibility: value})}
              >
                <RadioGroupItem value="strict">Strict - Must stay within budget</RadioGroupItem>
                <RadioGroupItem value="flexible">Flexible - 10% over acceptable</RadioGroupItem>
                <RadioGroupItem value="very_flexible">Very Flexible - Quality over cost</RadioGroupItem>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button onClick={savePreferences}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
```

---

## 📊 ALTERNATIVE DECISION MEMORY

**Purpose:** Track which alternatives users accept/reject to improve future suggestions

**How it works:**

1. **Decision Tracking:**
   - When user views an alternative, log it as "considering"
   - When user accepts/rejects, update decision
   - If user rejects same type 3+ times, stop suggesting it

2. **Pattern Recognition:**
   - Identify consistently accepted alternative types
   - Identify consistently rejected alternatives with reasons
   - Use patterns to prioritize future suggestions

3. **Application:**
   - Don't suggest repeatedly-rejected alternatives
   - Prioritize alternatives similar to past acceptances
   - Improve suggestion relevance over time

**Implementation:**

```typescript
// When user accepts/rejects an alternative
async function recordAlternativeDecision(
  userId: string,
  alternativeId: string,
  decision: 'accepted' | 'rejected',
  note?: string,
  rejectionReason?: string
) {
  // Get alternative details
  const { data: alternative } = await supabase
    .from('alternatives')
    .select('*')
    .eq('id', alternativeId)
    .single();

  // Check if this alternative type has been rejected before
  const { data: existingDecisions } = await supabase
    .from('alternative_decisions')
    .select('*')
    .eq('user_id', userId)
    .eq('alternative_type', alternative.alternative_type)
    .eq('decision', 'rejected');

  const rejectionCount = existingDecisions?.length || 0;

  // Record decision
  await supabase.from('alternative_decisions').insert({
    user_id: userId,
    alternative_id: alternativeId,
    decision,
    alternative_type: alternative.alternative_type,
    alternative_level: alternative.level,
    cost_delta: alternative.cost_delta,
    user_note: note,
    rejection_reason: rejectionReason,
    rejection_count: decision === 'rejected' ? rejectionCount + 1 : 0,
    project_id: alternative.project_id,
    line_item_id: alternative.line_item_id
  });

  // Update user preferences if needed
  if (rejectionCount >= 2 && decision === 'rejected') {
    // Add to avoided features
    const { data: prefs } = await supabase
      .from('user_preferences')
      .select('avoided_features')
      .eq('user_id', userId)
      .single();

    const avoidedFeatures = prefs?.avoided_features || [];
    if (!avoidedFeatures.includes(alternative.alternative_type)) {
      await supabase
        .from('user_preferences')
        .update({
          avoided_features: [...avoidedFeatures, alternative.alternative_type]
        })
        .eq('user_id', userId);
    }
  }
}

// When generating alternatives, check history
async function getFilteredAlternativeSuggestions(
  userId: string,
  lineItemId: string
) {
  // Get decision history
  const { data: decisions } = await supabase
    .from('alternative_decisions')
    .select('*')
    .eq('user_id', userId);

  // Build filters
  const repeatedlyRejected = decisions
    ?.filter(d => d.decision === 'rejected' && d.rejection_count > 2)
    ?.map(d => d.alternative_type) || [];

  const previouslyAccepted = decisions
    ?.filter(d => d.decision === 'accepted')
    ?.map(d => d.alternative_type) || [];

  // Generate alternatives with filters
  const alternatives = await generateAlternatives(lineItemId, {
    avoidTypes: repeatedlyRejected,
    prioritizeTypes: previouslyAccepted
  });

  return alternatives;
}
```

---

## 🎨 PHASE 4 UI COMPONENTS

### **Scope Generation Wizard**

```typescript
// /app/dashboard/projects/[id]/generate-scope/page.tsx
export default function GenerateScopePage() {
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState<'quick' | 'comprehensive'>('quick');
  const [prompt, setPrompt] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    setGenerating(true);

    if (tier === 'quick') {
      const response = await fetch(`/api/proposals/generate-quick`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          prompt,
          structuredInputs: {
            projectType: selectedProjectType,
            sqft: squareFootage,
            quality: qualityLevel,
            // ... other structured inputs
          }
        })
      });

      const result = await response.json();
      router.push(`/dashboard/proposals/${result.proposal_id}`);
    } else {
      // Comprehensive generation with FormData
      const formData = new FormData();
      formData.append('projectId', projectId);
      formData.append('prompt', prompt);
      photos.forEach(photo => formData.append('photos', photo));
      documents.forEach(doc => formData.append('documents', doc));
      formData.append('structuredInputs', JSON.stringify({...}));

      const response = await fetch(`/api/proposals/generate-comprehensive`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      router.push(`/dashboard/proposals/${result.proposal_id}`);
    }

    setGenerating(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Generate Baseline Estimate</h1>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Estimate Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer ${tier === 'quick' ? 'border-blue-500' : ''}`}
                onClick={() => setTier('quick')}
              >
                <CardHeader>
                  <CardTitle>Quick Estimate</CardTitle>
                  <CardDescription>~$0.40-2 per generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>✅ Text prompt only</li>
                    <li>✅ 50-80 line items</li>
                    <li>✅ Cached cost data</li>
                    <li>❌ No photos</li>
                    <li>❌ No documents</li>
                  </ul>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer ${tier === 'comprehensive' ? 'border-blue-500' : ''}`}
                onClick={() => setTier('comprehensive')}
              >
                <CardHeader>
                  <CardTitle>Comprehensive</CardTitle>
                  <CardDescription>~$25-35 per generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>✅ Text + photos + docs</li>
                    <li>✅ 150-250 line items</li>
                    <li>✅ Live web research</li>
                    <li>✅ Site analysis</li>
                    <li>✅ High accuracy</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Button className="mt-6" onClick={() => setStep(2)}>
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Project Description</Label>
                <Textarea
                  placeholder="Example: 3,000 sqft single-family home in Boston, standard quality, flat lot, utilities at street..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                />
              </div>

              {tier === 'comprehensive' && (
                <>
                  <div>
                    <Label>Site Photos (up to 5)</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setPhotos(Array.from(e.target.files || []))}
                    />
                  </div>

                  <div>
                    <Label>Documents (floor plans, surveys)</Label>
                    <Input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => setDocuments(Array.from(e.target.files || []))}
                    />
                  </div>
                </>
              )}

              <Button onClick={handleGenerate} disabled={generating}>
                {generating ? 'Generating...' : 'Generate Estimate'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

---

## âœ… PHASE 3 TESTING

**Test Quick Estimate:**
1. Generate quick estimate with text-only prompt
2. Verify 50-80 line items created
3. Check confidence score and assumptions
4. Confirm cost ~$0.40-2
5. Verify user preferences applied

**Test Comprehensive Estimate:**
1. Generate with text + 3 photos + 1 PDF
2. Verify 150-250 line items created
3. Check site analysis reflected in estimate
4. Confirm cost ~$25-35
5. Verify higher confidence score

**Test User Preferences:**
1. Set preferences in Settings
2. Generate new estimate
3. Verify preferred materials used as defaults
4. Modify preferences and regenerate
5. Confirm updates reflected

**Test Alternative Decisions:**
1. Accept some alternatives in Phase 4
2. Reject others (especially same type 3+ times)
3. Generate new estimate
4. Verify accepted types prioritized
5. Confirm rejected types not suggested

**Budget Testing:**
1. Verify comprehensive generation requires confirmation
2. Test daily budget limit enforcement
3. Check cost tracking in api_usage table
4. Verify budget dashboard shows generation costs

**Success Criteria:**
- ✅ Both tiers generate valid estimates
- ✅ User preferences applied automatically
- ✅ Alternative decisions influence suggestions
- ✅ Costs tracked accurately
- ✅ Budget controls enforced
- ✅ Total testing cost: ~$70

---

## 🔄 PHASE 3 TO PHASE 3 TRANSITION

**Pre-Phase 4 Checklist:**
- ✅ Quick estimate generation working
- ✅ Comprehensive estimate generation working
- ✅ User preferences system functional
- ✅ Alternative decision tracking implemented
- ✅ Baseline proposals marked correctly
- ✅ All costs tracked in api_usage table
- ✅ Budget controls working

**What Carries Forward to Phase 4:**
- User preferences will improve alternatives generation quality
- Alternative decision history will filter suggestions
- Baseline proposals can be compared against contractor proposals
- Generated line items research-able just like uploaded proposals

**Ready to Proceed?** If all checklist items complete, move to Phase 4!

---

# PHASE 4: ALTERNATIVES & OPTIMIZATION

## 📋 PHASE 4 OVERVIEW

**Goal:** Add power features for cost optimization

**What you'll build:**
1. Multi-level alternatives (macro/system/detail)
2. Side-by-side proposal comparison
3. AI scope difference detection
4. Budget optimization scenarios
5. Professional report exports

**Inherits from Phases 1 & 2:**
- ✅ All authentication & RLS
- ✅ All party attribution
- ✅ All edit history
- ✅ All cost controls & tracking
- ✅ All budget monitoring

---

## 🔄 WHAT CHANGED IN PHASE 4

**New Tables Added:**
- `alternatives` - Three-level alternatives system
- `proposal_comparisons` - Side-by-side comparisons
- `optimization_scenarios` - Budget optimization

**New Functionality:**
- Generate alternatives at macro/system/detail levels
- Compare multiple proposals side-by-side
- AI detects scope differences
- Create optimization scenarios to meet savings targets
- Export comprehensive PDF reports

**What Stays the Same:**
- All Phase 1 & 2 features continue working
- All cost controls automatically apply
- All authentication & security
- All party attribution & edit history
- All existing UI components

---

## 📊 DATABASE UPDATES - PHASE 4

```sql
-- Alternatives table
CREATE TABLE alternatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  line_item_id UUID REFERENCES line_items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Alternative level
  level TEXT NOT NULL, -- 'macro', 'system', 'detail'
  
  -- Details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  
  -- Cost impact
  cost_delta DECIMAL(12,2),
  cost_delta_percent DECIMAL(5,2),
  new_total_cost DECIMAL(12,2),
  
  -- Other impacts
  quality_impact TEXT, -- 'minimal', 'moderate', 'significant'
  timeline_impact_days INTEGER,
  complexity TEXT, -- 'easy', 'moderate', 'complex'
  
  -- Details
  pros TEXT[],
  cons TEXT[],
  best_for TEXT,
  not_recommended_for TEXT,
  
  -- Research
  research_confidence DECIMAL(3,2),
  sources TEXT[],
  
  -- Metadata
  is_user_added BOOLEAN DEFAULT FALSE,
  user_notes TEXT
);

-- Proposal comparisons
CREATE TABLE proposal_comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  proposal_ids UUID[],
  
  -- AI analysis
  scope_differences TEXT,
  recommendations TEXT,
  missing_scope_items JSONB,
  
  notes TEXT
);

-- Optimization scenarios
CREATE TABLE optimization_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  name TEXT NOT NULL,
  target_savings DECIMAL(12,2),
  actual_savings DECIMAL(12,2),
  
  alternative_ids UUID[],
  
  total_cost DECIMAL(12,2),
  timeline_impact_days INTEGER,
  quality_impact_summary TEXT,
  
  recommendations TEXT,
  risk_assessment TEXT
);

-- Indexes
CREATE INDEX idx_alternatives_item ON alternatives(line_item_id);
CREATE INDEX idx_alternatives_user ON alternatives(user_id);
CREATE INDEX idx_comparisons_project ON proposal_comparisons(project_id);
CREATE INDEX idx_scenarios_proposal ON optimization_scenarios(proposal_id);

-- RLS
ALTER TABLE alternatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their alternatives"
  ON alternatives FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their comparisons"
  ON proposal_comparisons FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their scenarios"
  ON optimization_scenarios FOR ALL
  USING (auth.uid() = user_id);
```

---

## 🔄 MULTI-LEVEL ALTERNATIVES

### **Three Levels:**

1. **MACRO** - Building methodology (affects entire project)
   - Examples: Stick-built → Modular, On-site → Prefab
2. **SYSTEM** - Major components (HVAC type, foundation method, etc.)
   - Examples: Traditional HVAC → Mini-splits, Septic → Aerobic system
3. **DETAIL** - Specific materials/products (tile brands, fixture models)
   - Examples: Trex → TimberTech, Ceramic tile → Porcelain

### **Alternatives Generation API:**

```typescript
// app/api/line-items/[id]/alternatives/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';
import { searchBrave } from '@/lib/brave-search';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const supabase = createServerClient();

    // Get line item with context
    const { data: lineItem } = await supabase
      .from('line_items')
      .select('*, proposal:proposals(*, project:projects(*))')
      .eq('id', lineItemId)
      .eq('user_id', user.id)
      .single();

    if (!lineItem) {
      return Response.json({ error: 'Line item not found' }, { status: 404 });
    }

    // Estimate cost
    const estimatedCost = 0.25;
    const budgetCheck = await checkBudget(supabase, user.id, estimatedCost);
    if (!budgetCheck.allowed) {
      return Response.json({ error: budgetCheck.reason }, { status: 402 });
    }

    // Determine applicable levels
    const levels = determineApplicableLevels(lineItem);

    // Search for alternatives
    const searchQuery = `${lineItem.description} alternatives cost comparison 2025`;
    const searchResults = await searchBrave(searchQuery, 10);

    // Analyze with Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 3072,
      messages: [{
        role: 'user',
        content: `Generate alternatives for this construction line item at multiple levels.

LINE ITEM:
${lineItem.description}
Quantity: ${lineItem.quantity} ${lineItem.unit}
Current Cost: $${lineItem.total_price.toLocaleString()}

PROJECT CONTEXT:
Type: ${lineItem.proposal.project.project_type}
Location: ${lineItem.proposal.project.city}, ${lineItem.proposal.project.state}
Quality: ${lineItem.proposal.project.quality_level}
${lineItem.proposal.project.topography ? `Topography: ${lineItem.proposal.project.topography}` : ''}
${lineItem.proposal.project.urban_rural ? `Setting: ${lineItem.proposal.project.urban_rural}` : ''}
${lineItem.proposal.project.site_access ? `Access: ${lineItem.proposal.project.site_access}` : ''}
${lineItem.proposal.project.timeline_flexibility ? `Timeline Flexibility: ${lineItem.proposal.project.timeline_flexibility}` : ''}

IMPORTANT: Alternatives must be appropriate for the site conditions. Don't suggest slab foundations 
for steep terrain, or alternatives requiring easy truck access for remote/difficult sites.

APPLICABLE LEVELS: ${levels.join(', ')}

SEARCH RESULTS:
${searchResults.map((r, i) => `[${i+1}] ${r.title}\n${r.description}`).join('\n\n')}

For EACH applicable level, provide 2-3 alternatives in JSON format:
{
  "alternatives": [
    {
      "level": "macro|system|detail",
      "title": "Brief title",
      "description": "2-3 sentence description",
      "cost_delta": -50000,
      "cost_delta_percent": -10.5,
      "new_total_cost": 425000,
      "quality_impact": "minimal|moderate|significant",
      "timeline_impact_days": -30,
      "complexity": "easy|moderate|complex",
      "pros": ["pro 1", "pro 2", "pro 3"],
      "cons": ["con 1", "con 2"],
      "best_for": "When this makes sense",
      "not_recommended_for": "When to avoid",
      "research_confidence": 0.85,
      "sources": ["url1", "url2"]
    }
  ]
}

CRITICAL VALIDATION RULES:
- EVERY alternative MUST have at least 2 cons
- Cost deltas must be realistic (±50% max)
- Pros must mention trade-offs
- Timeline impacts must make sense
- Return ONLY valid JSON`,
      }],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Failed to parse alternatives');

    const result = JSON.parse(jsonMatch[0]);

    // Validate alternatives
    result.alternatives.forEach((alt: any) => {
      if (!validateAlternative(alt, lineItem)) {
        throw new Error(`Alternative "${alt.title}" failed validation`);
      }
    });

    // Calculate cost
    const cost = calculateAnthropicCost(message.usage) + calculateBraveCost(1);

    // Track usage
    await trackAPIUsage(supabase, user.id, 'alternatives', cost, lineItemId);

    // Save alternatives
    const alternativesToInsert = result.alternatives.map((alt: any) => ({
      user_id: user.id,
      line_item_id: lineItemId,
      ...alt,
    }));

    const { data: savedAlternatives } = await supabase
      .from('alternatives')
      .insert(alternativesToInsert)
      .select();

    return Response.json({
      alternatives: savedAlternatives,
      cost,
    });

  } catch (error: any) {
    console.error('Alternatives error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function determineApplicableLevels(lineItem: any): string[] {
  const levels = [];
  const desc = lineItem.description.toLowerCase();
  
  // Macro if it's a major building system
  if (desc.includes('framing') || desc.includes('structure') || 
      desc.includes('foundation') || desc.includes('modular')) {
    levels.push('macro');
  }
  
  // System if it's a major component
  if (desc.includes('hvac') || desc.includes('electric') || 
      desc.includes('plumbing') || desc.includes('roof')) {
    levels.push('system');
  }
  
  // Detail always applicable
  levels.push('detail');
  
  return levels;
}

function validateAlternative(alt: any, lineItem: any): boolean {
  // Must have cons
  if (!alt.cons || alt.cons.length < 2) return false;
  
  // Cost delta must be reasonable
  const maxDelta = lineItem.total_price * 0.5;
  if (Math.abs(alt.cost_delta) > maxDelta) return false;
  
  // Must have sources
  if (!alt.sources || alt.sources.length === 0) return false;
  
  return true;
}

async function checkBudget(supabase: any, userId: string, cost: number) {
  // Same as Phase 2
  return { allowed: true };
}

function calculateAnthropicCost(usage: any): number {
  return ((usage.input_tokens / 1_000_000) * 3.00) +
         ((usage.output_tokens / 1_000_000) * 15.00);
}

function calculateBraveCost(numQueries: number): number {
  return (numQueries / 1000) * 5.00;
}

async function trackAPIUsage(
  supabase: any,
  userId: string,
  operation: string,
  cost: number,
  lineItemId: string
) {
  await supabase.from('api_usage').insert({
    user_id: userId,
    operation_type: operation,
    api_provider: 'anthropic',
    estimated_cost: cost,
    line_item_id: lineItemId,
  });

  await supabase.rpc('increment_spending', {
    p_user_id: userId,
    p_amount: cost,
  });
}
```

---

## 📊 PROPOSAL COMPARISON

### **Comparison API Route:**

```typescript
// app/api/projects/[id]/compare/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const projectId = params.id;
    const { proposal_ids } = await req.json();
    const supabase = createServerClient();

    if (!proposal_ids || proposal_ids.length < 2) {
      return Response.json(
        { error: 'Need at least 2 proposals to compare' },
        { status: 400 }
      );
    }

    // Get proposals with line items
    const { data: proposals } = await supabase
      .from('proposals')
      .select('*, line_items(*)')
      .in('id', proposal_ids)
      .eq('user_id', user.id);

    if (!proposals || proposals.length < 2) {
      return Response.json({ error: 'Proposals not found' }, { status: 404 });
    }

    // Build comparison data
    const comparisonData = proposals.map(p => ({
      contractor: p.contractor_name,
      total: p.total_amount,
      items_count: p.line_items.length,
      categories: groupByCategory(p.line_items),
    }));

    // Analyze with Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Compare these construction proposals and identify key differences.

PROPOSALS:
${JSON.stringify(comparisonData, null, 2)}

Provide analysis in JSON:
{
  "scope_differences": "Detailed explanation of what's included/excluded in each",
  "recommendations": "Which proposal to choose and why",
  "missing_scope_items": {
    "proposal_1": ["item missing from proposal 1"],
    "proposal_2": ["item missing from proposal 2"]
  },
  "key_findings": [
    "Finding 1",
    "Finding 2"
  ]
}

Focus on:
- Items in one but not the other
- Significant price differences (>30%)
- Quality level differences
- Scope gaps

Return ONLY valid JSON`,
      }],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Failed to parse comparison');

    const analysis = JSON.parse(jsonMatch[0]);

    // Calculate cost
    const cost = calculateAnthropicCost(message.usage);

    // Track usage
    await trackAPIUsage(supabase, user.id, 'comparison', cost, null);

    // Save comparison
    const { data: comparison } = await supabase
      .from('proposal_comparisons')
      .insert({
        user_id: user.id,
        project_id: projectId,
        proposal_ids,
        ...analysis,
      })
      .select()
      .single();

    return Response.json({
      comparison,
      cost,
    });

  } catch (error: any) {
    console.error('Comparison error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function groupByCategory(lineItems: any[]) {
  const groups: Record<string, number> = {};
  lineItems.forEach(item => {
    const cat = item.category || 'Other';
    groups[cat] = (groups[cat] || 0) + item.total_price;
  });
  return groups;
}

function calculateAnthropicCost(usage: any): number {
  return ((usage.input_tokens / 1_000_000) * 3.00) +
         ((usage.output_tokens / 1_000_000) * 15.00);
}

async function trackAPIUsage(
  supabase: any,
  userId: string,
  operation: string,
  cost: number,
  lineItemId: string | null
) {
  await supabase.from('api_usage').insert({
    user_id: userId,
    operation_type: operation,
    api_provider: 'anthropic',
    estimated_cost: cost,
    line_item_id: lineItemId,
  });

  await supabase.rpc('increment_spending', {
    p_user_id: userId,
    p_amount: cost,
  });
}
```

---

## 🎯 BUDGET OPTIMIZATION

### **Optimization Scenario API:**

```typescript
// app/api/proposals/[id]/optimize/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const { target_savings, name } = await req.json();
    const supabase = createServerClient();

    // Get proposal with alternatives
    const { data: proposal } = await supabase
      .from('proposals')
      .select('*, line_items(*, alternatives(*))')
      .eq('id', proposalId)
      .eq('user_id', user.id)
      .single();

    if (!proposal) {
      return Response.json({ error: 'Proposal not found' }, { status: 404 });
    }

    // Collect all alternatives with savings
    const savingsAlternatives = proposal.line_items
      .flatMap((item: any) => 
        item.alternatives
          .filter((alt: any) => alt.cost_delta < 0)
          .map((alt: any) => ({
            ...alt,
            line_item: item,
          }))
      )
      .sort((a: any, b: any) => a.cost_delta - b.cost_delta); // Biggest savings first

    // Select alternatives to meet target
    const selectedAlternatives = [];
    let totalSavings = 0;
    let timelineImpact = 0;

    for (const alt of savingsAlternatives) {
      if (totalSavings >= target_savings) break;
      
      selectedAlternatives.push(alt);
      totalSavings += Math.abs(alt.cost_delta);
      timelineImpact += alt.timeline_impact_days || 0;
    }

    const newTotalCost = proposal.total_amount - totalSavings;

    // Generate recommendations
    const recommendations = generateRecommendations(
      selectedAlternatives,
      totalSavings,
      target_savings
    );

    // Assess risk
    const riskAssessment = assessRisk(selectedAlternatives);

    // Save scenario
    const { data: scenario } = await supabase
      .from('optimization_scenarios')
      .insert({
        user_id: user.id,
        proposal_id: proposalId,
        name: name || `Save $${target_savings.toLocaleString()}`,
        target_savings,
        actual_savings: totalSavings,
        alternative_ids: selectedAlternatives.map((a: any) => a.id),
        total_cost: newTotalCost,
        timeline_impact_days: timelineImpact,
        quality_impact_summary: summarizeQualityImpact(selectedAlternatives),
        recommendations,
        risk_assessment: riskAssessment,
      })
      .select()
      .single();

    return Response.json({ scenario });

  } catch (error: any) {
    console.error('Optimization error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function generateRecommendations(
  alternatives: any[],
  totalSavings: number,
  targetSavings: number
): string {
  const achievedPercent = Math.round(totalSavings / targetSavings * 100);

  let recommendations = '';

  if (achievedPercent >= 90) {
    recommendations = `Successfully met your savings target. Review each alternative carefully with your contractor. `;
  } else {
    recommendations = `Achieved ${achievedPercent}% of target. To reach full target, consider additional alternatives or negotiate pricing. `;
  }

  const macroChanges = alternatives.filter(a => a.level === 'macro');
  if (macroChanges.length > 0) {
    recommendations += `Priority: Discuss ${macroChanges[0].title} first - this has the largest impact. `;
  }

  const quickWins = alternatives.filter(a => 
    a.complexity === 'easy' && Math.abs(a.cost_delta) > 10000
  );
  if (quickWins.length > 0) {
    recommendations += `Quick wins: ${quickWins.length} easy change(s) save significant money with minimal complexity. `;
  }

  return recommendations;
}

function assessRisk(alternatives: any[]): string {
  const highComplexity = alternatives.filter(a => a.complexity === 'complex').length;
  const significantQuality = alternatives.filter(a => a.quality_impact === 'significant').length;

  if (highComplexity === 0 && significantQuality === 0) {
    return 'Low risk - mostly straightforward changes with minimal quality impact.';
  } else if (highComplexity <= 2 && significantQuality <= 1) {
    return 'Medium risk - some complex changes require careful contractor selection and coordination.';
  } else {
    return 'High risk - multiple complex changes with quality trade-offs. Recommend phased approach.';
  }
}

function summarizeQualityImpact(alternatives: any[]): string {
  const impacts = alternatives.map(a => a.quality_impact);
  const significant = impacts.filter(i => i === 'significant').length;
  const moderate = impacts.filter(i => i === 'moderate').length;

  if (significant === 0) {
    return 'Minimal overall quality impact';
  } else if (significant <= 2) {
    return `${significant} significant quality change(s), ${moderate} moderate`;
  } else {
    return `Multiple significant quality changes - review carefully`;
  }
}
```

---

## 📄 EXPORT REPORTS

### **Professional PDF Report:**

```typescript
// app/api/proposals/[id]/export/route.ts
import { requireAuth } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';
import PDFDocument from 'pdfkit';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const supabase = createServerClient();

    // Get proposal data
    const { data: proposal } = await supabase
      .from('proposals')
      .select('*, line_items(*), project:projects(*)')
      .eq('id', proposalId)
      .eq('user_id', user.id)
      .single();

    if (!proposal) {
      return new Response('Proposal not found', { status: 404 });
    }

    // Get alternatives
    const { data: alternatives } = await supabase
      .from('alternatives')
      .select('*, line_item:line_items(*)')
      .eq('user_id', user.id)
      .in('line_item_id', proposal.line_items.map((i: any) => i.id));

    // Generate PDF
    const pdf = await generateComprehensivePDF({
      project: proposal.project,
      proposal,
      lineItems: proposal.line_items,
      alternatives,
    });

    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="DevWise_Analysis_${proposal.contractor_name.replace(/\s+/g, '_')}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error('Export error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

async function generateComprehensivePDF(data: any) {
  const doc = new PDFDocument({ size: 'LETTER', margin: 50 });
  const chunks: Buffer[] = [];

  doc.on('data', (chunk) => chunks.push(chunk));

  // Title page
  doc.fontSize(24).text('DevWise Cost Analysis Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(data.proposal.contractor_name, { align: 'center' });
  doc.fontSize(12).text(data.project.name, { align: 'center' });
  doc.moveDown(2);

  // Executive summary
  doc.fontSize(18).text('Executive Summary');
  doc.fontSize(12);
  doc.text(`Total Proposal: $${data.proposal.total_amount.toLocaleString()}`);
  doc.text(`Line Items: ${data.lineItems.length}`);
  
  const flagged = data.lineItems.filter((i: any) => i.flag_color === 'red' || i.flag_color === 'yellow');
  doc.text(`Flagged Items: ${flagged.length}`);
  
  if (data.alternatives.length > 0) {
    const potentialSavings = data.alternatives
      .filter((a: any) => a.cost_delta < 0)
      .reduce((sum: number, a: any) => sum + Math.abs(a.cost_delta), 0);
    doc.text(`Potential Savings: $${potentialSavings.toLocaleString()}`);
  }

  doc.end();

  return new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
}
```

---

## 🎨 PHASE 4 UI COMPONENTS

Add UI components for:
1. Alternatives list/cards
2. Comparison view
3. Optimization scenario builder
4. Export button

---

## 🧪 PHASE 4 TESTING

### **Test Alternatives:**

1. Find alternatives for "Main Electric Service" ($476,825)
   - Should generate macro alternatives (prefab electrical rooms)
   - Should generate system alternatives (400A vs 600A service)
   - Verify validation catches unrealistic alternatives

2. Find alternatives for "HVAC" ($89,405 total)
   - Should suggest system alternatives (mini-splits, VRF, geothermal)
   - Check that all alternatives have realistic cons

3. Find alternatives for "Trex Decking" ($23,080)
   - Should suggest detail alternatives (TimberTech, Fiberon, cedar)
   - Check cost deltas are realistic

### **Test Comparison:**

1. Upload a second test proposal
2. Compare with VIP proposal
3. Verify AI detects missing scope
4. Check price variances highlighted

### **Test Optimization:**

1. Set a target savings amount to test the optimization feature
2. Generate scenario
3. Should select alternatives to meet or approach the target based on available alternatives
4. Verify quality impact summary is accurate
5. Check risk assessment reflects complexity/quality trade-offs
6. Export report and verify it generates

### **Cost Control Tests:**

1. Try to generate alternatives when daily limit reached
2. Generate alternatives for expensive operation
3. Check budget monitor shows Phase 4 spending

**Expected costs:** ~$10-15 for Phase 4 testing

---

## ✅ SUCCESS CRITERIA - PHASE 4

**You're done when:**

**Alternatives:**
- ✅ Can generate macro/system/detail alternatives for any item
- ✅ Alternatives show cost deltas, pros/cons, quality impact
- ✅ Validation catches unrealistic alternatives
- ✅ All alternatives have user_id and respect RLS

**Comparison:**
- ✅ Can compare multiple proposals side-by-side
- ✅ AI detects scope differences with specific examples
- ✅ Missing scope highlighted
- ✅ All comparisons have user_id and respect RLS

**Optimization:**
- ✅ Can generate budget optimization scenarios
- ✅ Scenarios meet target savings
- ✅ All scenarios have user_id and respect RLS

**Cost Controls:**
- ✅ All Phase 4 operations respect spending limits
- ✅ API usage tracked
- ✅ Expensive operations require confirmation

**Export:**
- ✅ Can export comprehensive PDF report

**Cost for Phase 4 testing:** ~$10-15

---

# DEPLOYMENT & MAINTENANCE

## 🌐 ENVIRONMENT SETUP

### **Required Environment Variables:**

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys
ANTHROPIC_API_KEY=your_anthropic_api_key
BRAVE_API_KEY=your_brave_api_key

# App URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🚀 DEPLOYMENT CHECKLIST

### **Pre-Deployment:**

1. **Database:**
   - [ ] All tables created with correct schemas
   - [ ] All RLS policies enabled and tested
   - [ ] All indexes created
   - [ ] Storage bucket configured with policies
   - [ ] Test with 2+ user accounts to verify isolation

2. **API Keys:**
   - [ ] Anthropic API key set and tested
   - [ ] Brave Search API key set and tested
   - [ ] Keys stored securely (not in code)

3. **Testing:**
   - [ ] All Phase 1 tests passing
   - [ ] All Phase 2 tests passing
   - [ ] All Phase 4 tests passing
   - [ ] Budget controls working
   - [ ] Multi-user isolation verified

4. **Performance:**
   - [ ] Caching working (>70% hit rate)
   - [ ] API costs within budget
   - [ ] No N+1 query issues

### **Deployment Steps:**

1. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Set Environment Variables:**
   - In Vercel dashboard, add all environment variables
   - Ensure NEXT_PUBLIC_ variables are set

3. **Configure Custom Domain:**
   - Add domain in Vercel
   - Update DNS records
   - Wait for SSL certificate

4. **Post-Deployment Testing:**
   - [ ] Sign up new user works
   - [ ] File upload works
   - [ ] Extraction works
   - [ ] Research works
   - [ ] Chatbot works
   - [ ] All cost tracking works

---

## 💰 COST MONITORING

### **Expected Monthly Costs:**

**Per User (average usage):**
- Extraction: 4 proposals × $0.50 = $2.00
- Research: 50 items × $0.30 = $15.00
- Chatbot: 20 conversations × $0.15 = $3.00
- Alternatives: 10 items × $0.25 = $2.50
- Comparison: 2 comparisons × $1.00 = $2.00
- **Total per user: ~$24/month**

**Platform Capacity:**
- $100 monthly budget supports ~4 active users
- Monitor budget dashboard daily
- Set up alerts at 80% spending

### **Cost Optimization:**

1. **Caching:**
   - 80-90% cache hit rate reduces costs significantly
   - Monitor cache effectiveness

2. **Batch Operations:**
   - Research multiple items together when possible
   - Use smart defaults to reduce re-research

3. **User Education:**
   - Teach users to use cache effectively
   - Encourage ratings to improve learning database

---

## 🐛 TROUBLESHOOTING GUIDE

### **Common Issues:**

**1. Extraction fails:**
- Check file size (<10MB)
- Verify file type (PDF/Excel only)
- Check Anthropic API key
- Check user budget not exceeded

**2. Research returns no results:**
- Verify Brave API key
- Check search query formatting
- Ensure item description has enough detail

**3. Budget exceeded:**
- Check daily/monthly spending in dashboard
- Verify reset logic working
- Review API usage table

**4. RLS not working:**
- Verify policies enabled on ALL tables
- Check user_id in auth.uid() comparison
- Test with different user accounts

**5. Caching not working:**
- Check normalization logic
- Verify benchmark inserts succeeding
- Review cache lookup queries

---

## 🎉 MVP COMPLETE!

**You've built a production-ready construction intelligence platform with:**

✅ **Phase 1:**
- Multi-user authentication with RLS
- PDF/Excel extraction using Claude
- Party attribution system
- Edit history tracking
- Basic line item management

✅ **Phase 2:**
- Automated cost research (Brave + Claude)
- Cost benchmarking with flags
- AI hover chatbot
- Anonymous cost learning
- User ratings system
- Budget controls & cost tracking

✅ **Phase 4:**
- Multi-level alternatives (macro/system/detail)
- Side-by-side proposal comparison
- AI scope difference detection
- Budget optimization scenarios
- Professional report exports

**Total testing cost:** $105-110
**Monthly operating cost:** ~$154.50/user (full platform)
**Value delivered:** Generates baseline estimates + identifies cost optimization opportunities based on actual alternatives available in the proposal scope (methodology changes, component alternatives, material substitutions)

---

**YOU'RE READY TO LAUNCH! 🎯**
