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

      await fetch(`/api/proposals/${proposal.id}/extract`, {
        method: 'POST',
      });

      setIsOpen(false);
      router.refresh();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
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
