'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    project_type: 'residential',
    quality_level: 'standard',
    
    zip_code: '',
    num_units: '',
    square_footage: '',
    budget_range: '',
    timeline_flexibility: 'flexible',
    
    lot_size_acres: '',
    topography: '',
    site_access: '',
    distance_to_paved_road_miles: '',
    utilities_proximity: '',
    utility_distance_feet: '',
    soil_type: '',
    bedrock_depth_feet: '',
    water_table_depth_feet: '',
    existing_structures: false,
    existing_structure_demo_needed: false,
    tree_clearing_needed: false,
    clearing_acres: '',
    urban_rural: '',
    permit_complexity: '',
    environmental_constraints: '',
    hoa_restrictions: false,
    site_notes: '',
    special_requirements: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const processedData = {
        ...formData,
        user_id: session.user.id,
        num_units: formData.num_units ? parseInt(formData.num_units) : null,
        square_footage: formData.square_footage ? parseInt(formData.square_footage) : null,
        budget_range: formData.budget_range ? parseFloat(formData.budget_range) : null,
        lot_size_acres: formData.lot_size_acres ? parseFloat(formData.lot_size_acres) : null,
        distance_to_paved_road_miles: formData.distance_to_paved_road_miles ? parseFloat(formData.distance_to_paved_road_miles) : null,
        utility_distance_feet: formData.utility_distance_feet ? parseInt(formData.utility_distance_feet) : null,
        bedrock_depth_feet: formData.bedrock_depth_feet ? parseInt(formData.bedrock_depth_feet) : null,
        water_table_depth_feet: formData.water_table_depth_feet ? parseInt(formData.water_table_depth_feet) : null,
        clearing_acres: formData.clearing_acres ? parseFloat(formData.clearing_acres) : null,
        topography: formData.topography || null,
        site_access: formData.site_access || null,
        utilities_proximity: formData.utilities_proximity || null,
        soil_type: formData.soil_type || null,
        urban_rural: formData.urban_rural || null,
        permit_complexity: formData.permit_complexity || null,
        environmental_constraints: formData.environmental_constraints || null,
      };

      const { data: project, error } = await supabase
        .from('projects')
        .insert(processedData)
        .select()
        .single();

      if (error) throw error;

      router.push(`/dashboard/projects/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a href="/dashboard" className="text-blue-600 hover:underline">
            ← Back to Projects
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Project</h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-8">
          {/* Required Fields */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-red-600">Required Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Downtown Apartments"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Type *</label>
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="mixed-use">Mixed-Use</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quality Level *</label>
                <select
                  name="quality_level"
                  value={formData.quality_level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="economy">Economy</option>
                  <option value="standard">Standard</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>
          </div>

          {/* Basic Project Details */}
          <div>
            <h2 className="text-xl font-bold mb-4">Basic Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Number of Units</label>
                <input
                  type="number"
                  name="num_units"
                  value={formData.num_units}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Square Footage</label>
                <input
                  type="number"
                  name="square_footage"
                  value={formData.square_footage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Budget Range ($)</label>
                <input
                  type="number"
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="1000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timeline Flexibility</label>
                <select
                  name="timeline_flexibility"
                  value={formData.timeline_flexibility}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="fixed">Fixed</option>
                  <option value="flexible">Flexible</option>
                  <option value="very_flexible">Very Flexible</option>
                </select>
              </div>
            </div>
          </div>

          {/* Site Characteristics */}
          <div>
            <h2 className="text-xl font-bold mb-2">Site Characteristics</h2>
            <p className="text-sm text-gray-600 mb-4">
              These fields dramatically improve cost analysis accuracy. Even basic info (topography + access) helps significantly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Lot Size (acres)</label>
                <input
                  type="number"
                  step="0.1"
                  name="lot_size_acres"
                  value={formData.lot_size_acres}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Topography <span className="text-xs text-gray-500">(30-200% cost impact)</span>
                </label>
                <select
                  name="topography"
                  value={formData.topography}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="flat">Flat</option>
                  <option value="gentle_slope">Gentle Slope</option>
                  <option value="moderate_slope">Moderate Slope</option>
                  <option value="steep">Steep</option>
                  <option value="very_steep">Very Steep</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Site Access <span className="text-xs text-gray-500">(15-50% cost impact)</span>
                </label>
                <select
                  name="site_access"
                  value={formData.site_access}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="paved_road">Paved Road</option>
                  <option value="gravel_road">Gravel Road</option>
                  <option value="dirt_road">Dirt Road</option>
                  <option value="difficult">Difficult Access</option>
                  <option value="seasonal">Seasonal Access</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Distance to Paved Road (miles)</label>
                <input
                  type="number"
                  step="0.1"
                  name="distance_to_paved_road_miles"
                  value={formData.distance_to_paved_road_miles}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Utilities Proximity <span className="text-xs text-gray-500">($50k-150k+ impact)</span>
                </label>
                <select
                  name="utilities_proximity"
                  value={formData.utilities_proximity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="on_site">On Site</option>
                  <option value="at_street">At Street</option>
                  <option value="nearby">Nearby</option>
                  <option value="extended_run">Extended Run</option>
                  <option value="none">None Available</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Utility Distance (feet)</label>
                <input
                  type="number"
                  name="utility_distance_feet"
                  value={formData.utility_distance_feet}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Soil Type <span className="text-xs text-gray-500">(25-100% cost impact)</span>
                </label>
                <select
                  name="soil_type"
                  value={formData.soil_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="stable">Stable</option>
                  <option value="clay">Clay</option>
                  <option value="sand">Sand</option>
                  <option value="rock">Rock</option>
                  <option value="mixed">Mixed</option>
                  <option value="fill">Fill</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Urban/Rural Context</label>
                <select
                  name="urban_rural"
                  value={formData.urban_rural}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="urban">Urban</option>
                  <option value="suburban">Suburban</option>
                  <option value="rural">Rural</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Additional Site Details */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Bedrock Depth (feet)</label>
                <input
                  type="number"
                  name="bedrock_depth_feet"
                  value={formData.bedrock_depth_feet}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Water Table Depth (feet)</label>
                <input
                  type="number"
                  name="water_table_depth_feet"
                  value={formData.water_table_depth_feet}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Clearing Needed (acres)</label>
                <input
                  type="number"
                  step="0.1"
                  name="clearing_acres"
                  value={formData.clearing_acres}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Permit Complexity</label>
                <select
                  name="permit_complexity"
                  value={formData.permit_complexity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="standard">Standard</option>
                  <option value="moderate">Moderate</option>
                  <option value="complex">Complex</option>
                  <option value="very_complex">Very Complex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Environmental Constraints</label>
                <select
                  name="environmental_constraints"
                  value={formData.environmental_constraints}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="none">None</option>
                  <option value="wetlands">Wetlands</option>
                  <option value="floodplain">Floodplain</option>
                  <option value="endangered_species">Endangered Species</option>
                  <option value="multiple">Multiple Constraints</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="existing_structures"
                  checked={formData.existing_structures}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm">Existing structures on site</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="existing_structure_demo_needed"
                  checked={formData.existing_structure_demo_needed}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm">Demolition needed</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tree_clearing_needed"
                  checked={formData.tree_clearing_needed}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm">Tree clearing needed</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hoa_restrictions"
                  checked={formData.hoa_restrictions}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm">HOA restrictions apply</label>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Notes</label>
                <textarea
                  name="site_notes"
                  value={formData.site_notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Any additional site-specific information..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Special Requirements</label>
                <textarea
                  name="special_requirements"
                  value={formData.special_requirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Special construction requirements, restrictions, etc..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
