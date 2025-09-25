import { NextRequest, NextResponse } from 'next/server';
import { backendUrl } from '../../../lib/api';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resp = await fetch(backendUrl('/auth/signup'), {
      method: 'POST',
      body: formData as any,
      credentials: 'include',
    });

    const data = await resp.text();
    const res = new NextResponse(data, { status: resp.status });

    const setCookie = resp.headers.get('set-cookie');
    if (setCookie) res.headers.set('set-cookie', setCookie);
    res.headers.set('content-type', resp.headers.get('content-type') || 'application/json');
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}


