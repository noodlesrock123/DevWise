'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Party = {
  id: string;
  name: string;
  party_type: string;
};

type LineItem = {
  id: string;
  description: string;
  quantity: number | null;
  unit: string | null;
  unit_price: number | null;
  total_price: number;
  party_id: string | null;
  party?: { name: string } | null;
};

type EditLineItemModalProps = {
  item: LineItem;
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditLineItemModal({
  item,
  projectId,
  isOpen,
  onClose,
}: EditLineItemModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parties, setParties] = useState<Party[]>([]);
  const [loadingParties, setLoadingParties] = useState(true);

  const [formData, setFormData] = useState({
    description: item.description,
    quantity: item.quantity?.toString() || '',
    unit: item.unit || '',
    unit_price: item.unit_price?.toString() || '',
    party_id: item.party_id || '',
  });

  // Calculate total price automatically
  const calculatedTotal =
    formData.quantity && formData.unit_price
      ? parseFloat(formData.quantity) * parseFloat(formData.unit_price)
      : 0;

  async function fetchParties() {
    try {
      setLoadingParties(true);
      const res = await fetch(`/api/projects/${projectId}/parties`);
      if (res.ok) {
        const data = await res.json();
        setParties(data.parties || []);
      }
    } catch (err) {
      console.error('Failed to fetch parties:', err);
    } finally {
      setLoadingParties(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchParties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, projectId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updateData = {
        description: formData.description,
        quantity: formData.quantity ? parseFloat(formData.quantity) : null,
        unit: formData.unit || null,
        unit_price: formData.unit_price ? parseFloat(formData.unit_price) : null,
        total_price: calculatedTotal,
        party_id: formData.party_id || null,
      };

      const res = await fetch(`/api/line-items/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Update failed');
      }

      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Edit Line Item</h3>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <input
                type="number"
                step="0.0001"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                placeholder="EA, SF, LF, etc."
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Unit Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              name="unit_price"
              value={formData.unit_price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Calculated Total:</span>
              <span className="text-2xl font-bold">
                ${calculatedTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Assign to Party
            </label>
            {loadingParties ? (
              <div className="text-sm text-gray-500">Loading parties...</div>
            ) : (
              <select
                name="party_id"
                value={formData.party_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Unassigned</option>
                {parties.map((party) => (
                  <option key={party.id} value={party.id}>
                    {party.name} ({party.party_type})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
