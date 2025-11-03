'use client';

import React, { useState } from 'react';
import LineItemRow from './LineItemRow';
import { useRouter } from 'next/navigation';

type LineItem = {
  id: string;
  location: string | null;
  category?: string | null;
  description: string;
  unit?: string | null;
  quantity?: number | null;
  unit_price?: number | null;
  total_price: number;
  is_edited?: boolean;
  party?: { name: string } | null;
  party_id?: string | null;
  flag_color?: 'green' | 'yellow' | 'red' | null;
  variance_percent?: number | null;
  market_avg?: number | null;
  last_researched_at?: string | null;
  [key: string]: unknown;
};

type LineItemsTableProps = {
  lineItems: LineItem[];
  projectId: string;
};

export default function LineItemsTable({ lineItems, projectId }: LineItemsTableProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    // Reset refreshing state after a short delay
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const grouped: Record<string, LineItem[]> = {};
  lineItems.forEach((item) => {
    const loc = item.location || 'Uncategorized';
    if (!grouped[loc]) grouped[loc] = [];
    grouped[loc].push(item);
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700">Line Items</h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          {isRefreshing ? 'Refreshing...' : '↻ Refresh'}
        </button>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Party</th>
            <th className="px-4 py-3 text-right text-sm font-medium">Qty</th>
            <th className="px-4 py-3 text-right text-sm font-medium">Unit Price</th>
            <th className="px-4 py-3 text-right text-sm font-medium">Total</th>
            <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(grouped).map((location) => (
            <React.Fragment key={location}>
              <tr className="bg-gray-100">
                <td colSpan={6} className="px-4 py-2 font-bold text-sm">
                  {location}
                </td>
              </tr>
              {grouped[location].map((item) => (
                <LineItemRow
                  key={item.id}
                  item={item}
                  projectId={projectId}
                  onRefresh={handleRefresh}
                />
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
