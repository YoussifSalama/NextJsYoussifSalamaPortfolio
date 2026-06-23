import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProjects, upsertProject, slugify } from '@/lib/db';
import { isAuthed } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  const slug = body.slug ? slugify(body.slug) : slugify(body.name);
  const existing = await getProjects();
  if (existing.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: 'A project with this slug already exists' }, { status: 409 });
  }
  const saved = await upsertProject({ ...body, slug });
  revalidatePath('/');
  revalidatePath('/admin');
  return NextResponse.json(saved, { status: 201 });
}
