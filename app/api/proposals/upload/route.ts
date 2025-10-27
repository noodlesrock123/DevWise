import { requireAuth, createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const formData = await req.formData();
    
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    const contractorName = formData.get('contractorName') as string;

    if (!file || !projectId || !contractorName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and Excel files allowed.' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('proposals')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    const { data: proposal, error: dbError } = await supabase
      .from('proposals')
      .insert({
        user_id: user.id,
        project_id: projectId,
        contractor_name: contractorName,
        file_name: file.name,
        file_path: filePath,
        file_type: file.type.includes('pdf') ? 'pdf' : 'excel',
        extraction_status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to create proposal record' },
        { status: 500 }
      );
    }

    return NextResponse.json({ proposal });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
