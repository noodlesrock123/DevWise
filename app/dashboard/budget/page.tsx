import { requireAuth } from '@/lib/supabase-server';
import BudgetDashboard from '@/components/BudgetDashboard';

export default async function BudgetPage() {
  await requireAuth(); // Ensure user is authenticated

  return (
    <div className="container mx-auto px-4 py-8">
      <BudgetDashboard />
    </div>
  );
}
