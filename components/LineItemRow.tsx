'use client';

import { useState } from 'react';
import EditLineItemModal from './EditLineItemModal';

type LineItemRowProps = {
  item: {
    id: string;
    category?: string | null;
    description: string;
    is_edited?: boolean;
    party?: { name: string } | null;
    party_id?: string | null;
    quantity?: number | null;
    unit?: string | null;
    unit_price?: number | null;
    total_price: number;
    // Phase 2 fields
    flag_color?: 'green' | 'yellow' | 'red' | null;
    variance_percent?: number | null;
    market_avg?: number | null;
    last_researched_at?: string | null;
  };
  projectId: string;
  onRefresh?: () => void;
};

export default function LineItemRow({ item, projectId, onRefresh }: LineItemRowProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);

  const handleResearch = async () => {
    setIsResearching(true);
    setResearchError(null);

    try {
      const response = await fetch(`/api/line-items/${item.id}/research`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Research failed');
      }

      // Refresh the parent to show updated data
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      setResearchError(error instanceof Error ? error.message : 'Research failed');
    } finally {
      setIsResearching(false);
    }
  };

  const getFlagColor = () => {
    switch (item.flag_color) {
      case 'green':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'red':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getFlagLabel = () => {
    if (!item.flag_color) return null;

    const variance = item.variance_percent || 0;
    if (variance > 0) {
      return `+${variance.toFixed(1)}% above market`;
    } else if (variance < 0) {
      return `${variance.toFixed(1)}% below market`;
    }
    return 'At market rate';
  };

  return (
    <>
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-3">
          <div className="text-sm">
            {item.category && (
              <div className="text-gray-500 text-xs">{item.category}</div>
            )}
            <div>
              {item.description}
              {item.is_edited && (
                <span className="ml-2 text-xs text-orange-600">(edited)</span>
              )}
            </div>
            {item.flag_color && (
              <div className="mt-1">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getFlagColor()}`}
                >
                  {getFlagLabel()}
                </span>
                {item.market_avg && (
                  <span className="ml-2 text-xs text-gray-500">
                    Market avg: ${item.market_avg.toLocaleString()}
                  </span>
                )}
              </div>
            )}
            {researchError && (
              <div className="mt-1 text-xs text-red-600">{researchError}</div>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{item.party?.name || '-'}</td>
        <td className="px-4 py-3 text-right text-sm">
          {item.quantity} {item.unit}
        </td>
        <td className="px-4 py-3 text-right text-sm">
          {item.unit_price ? `$${item.unit_price.toLocaleString()}` : '-'}
        </td>
        <td className="px-4 py-3 text-right text-sm font-medium">
          ${item.total_price.toLocaleString()}
        </td>
        <td className="px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleResearch}
              disabled={isResearching}
              className={`text-purple-600 hover:underline text-sm ${
                isResearching ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Research market cost"
            >
              {isResearching ? 'Researching...' : 'Research'}
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
          </div>
        </td>
      </tr>

      <EditLineItemModal
        item={{
          id: item.id,
          description: item.description,
          quantity: item.quantity ?? null,
          unit: item.unit ?? null,
          unit_price: item.unit_price ?? null,
          total_price: item.total_price,
          party_id: item.party_id ?? null,
          party: item.party,
        }}
        projectId={projectId}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
