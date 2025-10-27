import { requireAuth, createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const projectId = params.id;
    const supabase = createServerClient();

    const { data: parties, error } = await supabase
      .from('parties')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .order('name');

    if (error) throw error;

    return NextResponse.json({ parties });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
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
    const projectId = params.id;
    const body = await req.json();
    const supabase = createServerClient();

    const { data: party, error } = await supabase
      .from('parties')
      .insert({
        user_id: user.id,
        project_id: projectId,
        name: body.name,
        party_type: body.party_type,
        contact_info: body.contact_info,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ party });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
