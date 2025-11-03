'use client';

import { useEffect, useState } from 'react';

type BudgetData = {
  spending: {
    daily: {
      spent: number;
      limit: number;
      remaining: number;
      percentage: number;
    };
    monthly: {
      spent: number;
      limit: number;
      remaining: number;
      percentage: number;
    };
  };
  cache: {
    total_lookups: number;
    cache_hits: number;
    hit_rate: number;
    estimated_savings: number;
  };
  usage_by_type: Record<string, { count: number; cost: number }>;
  recent_usage: Array<{
    id: string;
    operation_type: string;
    api_provider: string;
    estimated_cost: number;
    created_at: string;
  }>;
};

export default function BudgetDashboard() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      const response = await fetch('/api/budget');
      if (!response.ok) {
        throw new Error('Failed to fetch budget data');
      }
      const data = await response.json();
      setBudgetData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load budget data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !budgetData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error || 'Failed to load budget data'}</p>
      </div>
    );
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-600';
    if (percentage >= 75) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Budget & Usage</h2>

      {/* Spending Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Budget */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Budget</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Spent:</span>
              <span className="font-medium">${budgetData.spending.daily.spent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Limit:</span>
              <span className="font-medium">${budgetData.spending.daily.limit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining:</span>
              <span className="font-medium text-green-600">
                ${budgetData.spending.daily.remaining.toFixed(2)}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Usage</span>
                <span>{budgetData.spending.daily.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getProgressBarColor(
                    budgetData.spending.daily.percentage
                  )}`}
                  style={{ width: `${Math.min(budgetData.spending.daily.percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Budget */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Budget</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Spent:</span>
              <span className="font-medium">${budgetData.spending.monthly.spent.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Limit:</span>
              <span className="font-medium">${budgetData.spending.monthly.limit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining:</span>
              <span className="font-medium text-green-600">
                ${budgetData.spending.monthly.remaining.toFixed(2)}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Usage</span>
                <span>{budgetData.spending.monthly.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getProgressBarColor(
                    budgetData.spending.monthly.percentage
                  )}`}
                  style={{ width: `${Math.min(budgetData.spending.monthly.percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cache Statistics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Cache Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {budgetData.cache.total_lookups}
            </div>
            <div className="text-sm text-gray-600">Total Lookups</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {budgetData.cache.cache_hits}
            </div>
            <div className="text-sm text-gray-600">Cache Hits</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {budgetData.cache.hit_rate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Hit Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              ${budgetData.cache.estimated_savings.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Estimated Savings</div>
          </div>
        </div>
      </div>

      {/* Usage by Type */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Usage by Type (This Month)</h3>
        <div className="space-y-3">
          {Object.entries(budgetData.usage_by_type).length === 0 ? (
            <p className="text-gray-500 text-sm">No usage data yet</p>
          ) : (
            Object.entries(budgetData.usage_by_type).map(([type, data]) => (
              <div key={type} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium capitalize">
                    {type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-500">({data.count} calls)</span>
                </div>
                <span className="text-sm font-medium">${data.cost.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Usage */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent API Usage</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Operation
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Provider
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                  Cost
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgetData.recent_usage.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-center text-sm text-gray-500">
                    No recent usage
                  </td>
                </tr>
              ) : (
                budgetData.recent_usage.map((usage) => (
                  <tr key={usage.id}>
                    <td className="px-3 py-2 text-sm capitalize">
                      {usage.operation_type.replace('_', ' ')}
                    </td>
                    <td className="px-3 py-2 text-sm capitalize">{usage.api_provider}</td>
                    <td className="px-3 py-2 text-sm text-right">
                      ${usage.estimated_cost.toFixed(4)}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-600">
                      {new Date(usage.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
