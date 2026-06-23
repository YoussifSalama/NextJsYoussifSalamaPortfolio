import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSection, updateSection, PROFILE_SECTIONS } from '@/lib/db';
import { isAuthed } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  if (!PROFILE_SECTIONS.includes(params.section)) {
    return NextResponse.json({ error: 'Unknown section' }, { status: 404 });
  }
  const data = await getSection(params.section);
  return NextResponse.json(data);
}

export async function PUT(request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!PROFILE_SECTIONS.includes(params.section)) {
    return NextResponse.json({ error: 'Unknown section' }, { status: 404 });
  }
  const body = await request.json();
  const saved = await updateSection(params.section, body);
  revalidatePath('/');
  return NextResponse.json(saved);
}
