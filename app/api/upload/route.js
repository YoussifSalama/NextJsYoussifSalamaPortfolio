import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { isAuthed } from '@/lib/auth';
import { slugify } from '@/lib/db';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']);
const ALLOWED_EXT = new Set(['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif']);
const MAX_BYTES = 5 * 1024 * 1024;

// Saves an uploaded image into /public/uploads and returns its public path.
export async function POST(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const form = await request.formData();
  const file = form.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 413 });
  }
  const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: 'Unsupported file extension' }, { status: 415 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'upload';
  const filename = `${base}-${Date.now()}.${ext}`;
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), bytes);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
