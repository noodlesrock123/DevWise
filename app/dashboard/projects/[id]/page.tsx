import { createServerClient } from '@/lib/supabase-server';
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
          <p className="text-gray-600">{project.address}, {project.city}, {project.state}</p>
          {project.budget_range && (
            <p className="text-lg text-gray-700 mt-2">
              Budget: ${project.budget_range.toLocaleString()}
            </p>
          )}
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
