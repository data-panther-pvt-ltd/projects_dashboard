// app/protected/layout.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => {
        if (r.ok) return r.json();
        throw new Error('unauth');
      })
      .then(() => setIsAuth(true))
      .catch(() => {
        setIsAuth(false);
        router.replace('/login');
      });
  }, [router]);

  if (isAuth === null) {
    return null; 
  }

  return <>{children}</>;
}
