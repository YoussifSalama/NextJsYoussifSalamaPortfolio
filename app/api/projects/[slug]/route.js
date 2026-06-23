import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProject, upsertProject, deleteProject, slugify } from '@/lib/db';
import { isAuthed } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const project = await getProject(params.slug);
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const original = await getProject(params.slug);
  if (!original) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const body = await request.json();
  const slug = body.slug ? slugify(body.slug) : params.slug;
  const saved = await upsertProject({ ...body, slug }, params.slug);
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/projects/${slug}`);
  return NextResponse.json(saved);
}

export async function DELETE(_request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const ok = await deleteProject(params.slug);
  if (!ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  revalidatePath('/');
  revalidatePath('/admin');
  return NextResponse.json({ ok: true });
}
