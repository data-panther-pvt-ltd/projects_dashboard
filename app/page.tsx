// app/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(() => router.replace('/protected/dashboard'))
      .catch(() => router.replace('/login'));
  }, [router]);

  return null;
}
