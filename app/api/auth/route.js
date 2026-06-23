import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { COOKIE, verifyPassword, checkRateLimit } from '@/lib/auth';
import { makeSessionToken, SESSION_MAX_AGE_SECONDS } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const ip = headers().get('x-forwarded-for') || headers().get('x-real-ip') || 'local';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }
  const { password } = await request.json();
  const ok = await verifyPassword(password || '');
  if (!ok) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }
  cookies().set(COOKIE, await makeSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  cookies().delete(COOKIE);
  return NextResponse.json({ ok: true });
}
