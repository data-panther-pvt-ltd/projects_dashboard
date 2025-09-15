
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const USERNAME = process.env.NEXT_PUBLIC_USERNAME ?? '';
const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD ?? '';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === USERNAME && password === PASSWORD) {
      localStorage.setItem('auth', 'true');
      router.push('/protected/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
<div className="h-screen w-screen bg-[url('/updatedbg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <div className="relative bg-white border border-slate/20 shadow-xl  w-full max-w-md p-10 z-10">
        <img src="/aiq.png" alt="logo" className='w-72 h- mx-auto mb-6'/>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-950">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full  px-4 py-2 bg-white/20 text-black placeholder-gray-300 border border-gray-500 rounded-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-950">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 bg-white/20 text-black placeholder-gray-300 border border-gray-500 rounded-md focus:ring-2 focus:ring-slate-400 focus:outline-none"
              placeholder="Enter your password"
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
            Sign In
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} AnalytIQ Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
