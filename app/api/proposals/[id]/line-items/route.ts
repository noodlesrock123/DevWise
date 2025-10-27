import { requireAuth, createServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const supabase = createServerClient();

    const { data: lineItems, error } = await supabase
      .from('line_items')
      .select('*, party:parties(name)')
      .eq('proposal_id', proposalId)
      .eq('user_id', user.id)
      .order('location')
      .order('category');

    if (error) throw error;

    return NextResponse.json({ lineItems });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const proposalId = params.id;
    const body = await req.json();
    const supabase = createServerClient();


    const { data: lineItem, error } = await supabase
      .from('line_items')
      .insert({
        user_id: user.id,
        proposal_id: proposalId,
        ...body,
      })
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
