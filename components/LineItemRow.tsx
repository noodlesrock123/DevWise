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
  };
  projectId: string;
};

export default function LineItemRow({ item, projectId }: LineItemRowProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
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
