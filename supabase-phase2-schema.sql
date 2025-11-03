-- PHASE 2 DATABASE SCHEMA
-- Run this in Supabase SQL Editor after Phase 1 schema is complete

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
