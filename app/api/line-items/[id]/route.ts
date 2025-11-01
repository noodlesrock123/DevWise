import { requireAuth, createServerClient } from '@/lib/supabase-server';
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

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
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

    // Validate description is present
    if (body.description !== undefined && !body.description?.trim()) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Validate total_price matches calculation
    if (body.quantity !== undefined && body.unit_price !== undefined && body.total_price !== undefined) {
      const expectedTotal = body.quantity * body.unit_price;
      const difference = Math.abs(expectedTotal - body.total_price);

      // Allow small rounding differences (less than 1 cent)
      if (difference > 0.01) {
        return NextResponse.json(
          { error: `Total price ($${body.total_price}) does not match quantity (${body.quantity}) × unit price ($${body.unit_price}) = $${expectedTotal.toFixed(2)}` },
          { status: 400 }
        );
      }
    }

    // Validate numeric fields are valid numbers
    if (body.quantity !== undefined && body.quantity !== null && isNaN(Number(body.quantity))) {
      return NextResponse.json(
        { error: 'Quantity must be a valid number' },
        { status: 400 }
      );
    }

    if (body.unit_price !== undefined && body.unit_price !== null && isNaN(Number(body.unit_price))) {
      return NextResponse.json(
        { error: 'Unit price must be a valid number' },
        { status: 400 }
      );
    }

    if (body.total_price !== undefined && body.total_price !== null && isNaN(Number(body.total_price))) {
      return NextResponse.json(
        { error: 'Total price must be a valid number' },
        { status: 400 }
      );
    }

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

    const updateData: Record<string, unknown> = { ...body };

    // Preserve original values on first edit
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

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
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

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
