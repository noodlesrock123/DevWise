import { createServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import LineItemsTable from '@/components/LineItemsTable';

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

  // Get project_id from proposal for edit modal
  const projectId = proposal.project_id;

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
          <LineItemsTable lineItems={lineItems as any} projectId={projectId} />
        )}
      </main>
    </div>
  );
}
