import { requireAuth, createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const lineItemId = params.id;
    const { party_id } = await req.json();
    const supabase = createServerClient();

    const { data: lineItem, error } = await supabase
      .from('line_items')
      .update({ party_id })
      .eq('id', lineItemId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ lineItem });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
