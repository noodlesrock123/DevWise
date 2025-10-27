import { requireAuth, createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const supabase = createServerClient();

    const { data: lineItem, error } = await supabase
      .from('line_items')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ lineItem });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const supabase = createServerClient();

    const { data: current } = await supabase
      .from('line_items')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (!current) {
      return NextResponse.json(
        { error: 'Line item not found' },
        { status: 404 }
      );
    }

    const updateData: any = { ...body };

    if (!current.is_edited) {
      updateData.is_edited = true;
      updateData.original_description = current.description;
      updateData.original_quantity = current.quantity;
      updateData.original_unit_price = current.unit_price;
      updateData.original_total_price = current.total_price;
    }

    const { data: lineItem, error } = await supabase
      .from('line_items')
      .update(updateData)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ lineItem });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const supabase = createServerClient();

    const { error } = await supabase
      .from('line_items')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
