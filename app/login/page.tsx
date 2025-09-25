
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '../../components/LanguageProvider';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || t('login.error'));
        return;
      }
      router.push('/protected/dashboard');
    } catch {
      setError(t('login.error'));
    }
  };

  return (
<div className="h-screen w-screen bg-[url('/updatedbg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <div className="relative bg-white border border-slate/20 shadow-xl  w-full max-w-md p-10 z-10">
        <img src="/aiq.png" alt="logo" className='w-40 h-auto mx-auto mb-6' />
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-950">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full  px-4 py-2 bg-white/20 text-black placeholder-gray-300 border border-gray-500 rounded-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-950">
              {t('login.password')}
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 bg-white/20 text-black placeholder-gray-300 border border-gray-500 rounded-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
              placeholder={t('login.password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-slate-950 hover: text-white py-2 px-4 rounded-md font-semibold transition duration-200"
          >
            {t('login.signin')}
          </button>
          <a href="/signup" className="block text-center text-sm text-slate-700 underline">
            Create an account
          </a>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} AnalytIQ Inc. {t('login.footer')}
        </p>
      </div>
    </div>
  );
}
