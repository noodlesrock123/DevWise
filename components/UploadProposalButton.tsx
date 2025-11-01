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
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleUpload() {
    if (!file || !contractorName) {
      setError('Please select a file and enter contractor name');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Step 1: Upload file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);
      formData.append('contractorName', contractorName);

      const uploadRes = await fetch('/api/proposals/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json();
        throw new Error(data.error || 'Upload failed');
      }

      const { proposal } = await uploadRes.json();

      // Step 2: Extract line items
      setLoading(false);
      setExtracting(true);

      const extractRes = await fetch(`/api/proposals/${proposal.id}/extract`, {
        method: 'POST',
      });

      if (!extractRes.ok) {
        const data = await extractRes.json();
        throw new Error(data.error || 'Extraction failed');
      }

      await extractRes.json();

      // Success!
      setExtracting(false);
      setSuccess(true);

      // Show success message briefly, then close and refresh
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFile(null);
        setContractorName('');
        router.refresh();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
      setLoading(false);
      setExtracting(false);
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

            {success && (
              <div className="bg-green-50 text-green-700 p-3 rounded mb-4">
                ✓ Extraction completed successfully!
              </div>
            )}

            {extracting && (
              <div className="bg-blue-50 text-blue-700 p-4 rounded mb-4">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                  <div>
                    <p className="font-medium">Extracting line items...</p>
                    <p className="text-sm">This may take 30-60 seconds. Please wait.</p>
                  </div>
                </div>
              </div>
            )}

            {!extracting && !success && (
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading || extracting}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              {!extracting && !success && (
                <button
                  onClick={handleUpload}
                  disabled={loading || !file || !contractorName}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Upload & Extract'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
