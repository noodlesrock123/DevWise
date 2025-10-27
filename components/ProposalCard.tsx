import Link from 'next/link';

type ProposalCardProps = {
  proposal: {
    id: string;
    contractor_name: string;
    created_at: string;
    extraction_status: string;
    total_amount?: number | null;
    file_name: string;
    file_type?: string | null;
  };
};

export default function ProposalCard({ proposal }: ProposalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link
      href={`/dashboard/proposals/${proposal.id}`}
      className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{proposal.contractor_name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(proposal.created_at).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            proposal.extraction_status
          )}`}
        >
          {proposal.extraction_status}
        </span>
      </div>

      {proposal.total_amount && (
        <p className="text-2xl font-bold text-gray-900">
          ${proposal.total_amount.toLocaleString()}
        </p>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>File: {proposal.file_name}</p>
        <p>Type: {proposal.file_type?.toUpperCase()}</p>
      </div>
    </Link>
  );
}
