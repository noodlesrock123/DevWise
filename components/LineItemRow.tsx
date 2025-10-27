'use client';

type LineItemRowProps = {
  item: {
    id: string;
    category?: string | null;
    description: string;
    is_edited?: boolean;
    party?: { name: string } | null;
    quantity?: number | null;
    unit?: string | null;
    unit_price?: number | null;
    total_price: number;
  };
};

export default function LineItemRow({ item }: LineItemRowProps) {
  return (
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
        <button className="text-blue-600 hover:underline text-sm">
          Edit
        </button>
      </td>
    </tr>
  );
}
