/**
 * Shared TypeScript types for DevWise application
 */

// ============================================================================
// Database Types
// ============================================================================

export interface Project {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  project_type: 'residential' | 'commercial' | 'mixed-use' | 'industrial';
  quality_level: 'economy' | 'standard' | 'luxury' | null;
  num_units: number | null;
  square_footage: number | null;
  budget_range: number | null;
  timeline_flexibility: 'fixed' | 'flexible' | 'very_flexible' | null;
  lot_size_acres: number | null;
  topography: 'flat' | 'gentle_slope' | 'moderate_slope' | 'steep' | 'very_steep' | 'mixed' | null;
  site_access: 'paved_road' | 'gravel_road' | 'dirt_road' | 'difficult' | 'seasonal' | null;
  distance_to_paved_road_miles: number | null;
  utilities_proximity: 'on_site' | 'at_street' | 'nearby' | 'extended_run' | 'none' | null;
  utility_distance_feet: number | null;
  soil_type: 'stable' | 'clay' | 'sand' | 'rock' | 'mixed' | 'fill' | 'unknown' | null;
  bedrock_depth_feet: number | null;
  water_table_depth_feet: number | null;
  existing_structures: boolean;
  existing_structure_demo_needed: boolean;
  tree_clearing_needed: boolean;
  clearing_acres: number | null;
  urban_rural: 'urban' | 'suburban' | 'rural' | 'remote' | null;
  permit_complexity: 'standard' | 'moderate' | 'complex' | 'very_complex' | null;
  environmental_constraints: 'none' | 'wetlands' | 'floodplain' | 'endangered_species' | 'multiple' | null;
  hoa_restrictions: boolean;
  site_notes: string | null;
  special_requirements: string | null;
  status: 'active' | 'archived' | 'completed';
}

export interface Party {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
  name: string;
  party_type: 'contractor' | 'subcontractor' | 'supplier' | 'developer';
  contact_info: string | null;
}

export interface Proposal {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  contractor_name: string;
  contractor_party_id: string | null;
  proposal_date: string | null;
  total_amount: number | null;
  file_name: string | null;
  file_path: string | null;
  file_type: 'pdf' | 'excel' | 'manual' | null;
  extraction_status: 'pending' | 'processing' | 'completed' | 'failed';
  extraction_started_at: string | null;
  extraction_completed_at: string | null;
}

export interface LineItem {
  id: string;
  proposal_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  location: string | null;
  category: string | null;
  description: string;
  unit: string | null;
  quantity: number | null;
  unit_price: number | null;
  total_price: number;
  party_id: string | null;
  is_edited: boolean;
  original_description: string | null;
  original_quantity: number | null;
  original_unit_price: number | null;
  original_total_price: number | null;
  notes: string | null;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiError {
  error: string;
}

export interface ProposalUploadResponse {
  proposal: Proposal;
}

export interface ProposalExtractionResponse {
  success: boolean;
  line_items_count: number;
  total_amount: number;
}

export interface LineItemsResponse {
  line_items: LineItem[];
}

export interface PartiesResponse {
  parties: Party[];
}

// ============================================================================
// Claude API Types
// ============================================================================

export interface ExtractedLineItem {
  location?: string;
  category?: string;
  description: string;
  unit?: string;
  quantity?: number;
  unit_price?: number;
  total_price: number;
}

export interface ClaudeExtractionResult {
  line_items: ExtractedLineItem[];
}

// ============================================================================
// Form Types
// ============================================================================

export interface ProposalUploadForm {
  file: File;
  projectId: string;
  contractorName: string;
}

export interface LineItemUpdateForm {
  description?: string;
  quantity?: number;
  unit_price?: number;
  total_price?: number;
  notes?: string;
}
