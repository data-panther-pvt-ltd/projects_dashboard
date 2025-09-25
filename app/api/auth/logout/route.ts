import { NextRequest, NextResponse } from 'next/server';
import { backendUrl } from '../../../lib/api';

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') || undefined;
  const resp = await fetch(backendUrl('/auth/logout'), {
    method: 'POST',
    headers: cookie ? { cookie } : undefined,
    credentials: 'include',
  });
  const data = await resp.text();
  const res = new NextResponse(data, { status: resp.status });
  const setCookie = resp.headers.get('set-cookie');
  if (setCookie) res.headers.set('set-cookie', setCookie);
  res.headers.set('content-type', resp.headers.get('content-type') || 'application/json');
  return res;
}


