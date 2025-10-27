
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  name TEXT NOT NULL,
  
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  
  project_type TEXT NOT NULL, -- 'residential', 'commercial', 'mixed-use', 'industrial'
  quality_level TEXT, -- 'economy', 'standard', 'luxury'
  
  num_units INTEGER,
  square_footage INTEGER,
  budget_range DECIMAL(12,2),
  timeline_flexibility TEXT, -- 'fixed', 'flexible', 'very_flexible'
  
  
  lot_size_acres DECIMAL(10,2),
  topography TEXT, -- 'flat', 'gentle_slope', 'moderate_slope', 'steep', 'very_steep', 'mixed'
  
  site_access TEXT, -- 'paved_road', 'gravel_road', 'dirt_road', 'difficult', 'seasonal'
  distance_to_paved_road_miles DECIMAL(5,2),
  utilities_proximity TEXT, -- 'on_site', 'at_street', 'nearby', 'extended_run', 'none'
  utility_distance_feet INTEGER,
  
  soil_type TEXT, -- 'stable', 'clay', 'sand', 'rock', 'mixed', 'fill', 'unknown'
  bedrock_depth_feet INTEGER,
  water_table_depth_feet INTEGER,
  
  existing_structures BOOLEAN DEFAULT FALSE,
  existing_structure_demo_needed BOOLEAN DEFAULT FALSE,
  tree_clearing_needed BOOLEAN DEFAULT FALSE,
  clearing_acres DECIMAL(10,2),
  
  urban_rural TEXT, -- 'urban', 'suburban', 'rural', 'remote'
  permit_complexity TEXT, -- 'standard', 'moderate', 'complex', 'very_complex'
  environmental_constraints TEXT, -- 'none', 'wetlands', 'floodplain', 'endangered_species', 'multiple'
  hoa_restrictions BOOLEAN DEFAULT FALSE,
  
  site_notes TEXT,
  special_requirements TEXT,
  
  status TEXT DEFAULT 'active' -- 'active', 'archived', 'completed'
);

CREATE INDEX idx_projects_location ON projects(state, city);
CREATE INDEX idx_projects_type ON projects(project_type);
CREATE INDEX idx_projects_topography ON projects(topography) WHERE topography IS NOT NULL;

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

CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  contractor_name TEXT NOT NULL,
  contractor_party_id UUID REFERENCES parties(id), -- Party who submitted this proposal
  proposal_date DATE,
  total_amount DECIMAL(12,2),
  
  file_name TEXT,
  file_path TEXT,
  file_type TEXT, -- 'pdf', 'excel', 'manual'
  
  extraction_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  extraction_started_at TIMESTAMPTZ,
  extraction_completed_at TIMESTAMPTZ
);

CREATE TABLE line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  location TEXT, -- e.g., "01 General Requirements"
  category TEXT, -- e.g., "PROJECT MANAGEMENT"
  
  description TEXT NOT NULL,
  unit TEXT, -- 'EA', 'SF', 'LF', etc.
  quantity DECIMAL(12,4),
  unit_price DECIMAL(12,2),
  total_price DECIMAL(12,2) NOT NULL,
  
  party_id UUID REFERENCES parties(id), -- Which party is responsible
  
  is_edited BOOLEAN DEFAULT FALSE,
  original_description TEXT,
  original_quantity DECIMAL(12,4),
  original_unit_price DECIMAL(12,2),
  original_total_price DECIMAL(12,2),
  
  notes TEXT
);

CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_parties_project ON parties(project_id);
CREATE INDEX idx_parties_user ON parties(user_id);
CREATE INDEX idx_proposals_project ON proposals(project_id);
CREATE INDEX idx_proposals_user ON proposals(user_id);
CREATE INDEX idx_line_items_proposal ON line_items(proposal_id);
CREATE INDEX idx_line_items_user ON line_items(user_id);
CREATE INDEX idx_line_items_party ON line_items(party_id);


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
