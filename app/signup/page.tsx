'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { backendUrl } from '../lib/api';


export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [colorHex, setColorHex] = useState('#111827');
  const [colors, setColors] = useState<string[]>(['#111827']);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');
  //   const fd = new FormData();
  //   fd.append('email', email);
  //   fd.append('password', password);
  //   fd.append('organizationName', organizationName);
  //   fd.append('colorHex', colorHex);
  //   if (logoFile) fd.append('logo', logoFile);

  //   const res = await fetch('/api/auth/signup', { method: 'POST', body: fd });
  //   if (!res.ok) {
  //     const data = await res.json().catch(() => ({}));
  //     setError(data.error || 'Failed to sign up');
  //     return;
  //   }
  //   router.push('/protected/dashboard');
  // };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  const fd = new FormData();
  fd.append('username', username);
  fd.append('email', email);
  fd.append('password', password);
  fd.append('organizationName', organizationName);
  fd.append('colorHex', colorHex);
  if (colors && colors.length) {
    fd.append('colors', JSON.stringify(colors));
  }
  if (logoFile) fd.append('logo', logoFile);

  try {
    const res = await fetch(backendUrl('/auth/signup'), {
      method: 'POST',
      body: fd,
      credentials: 'include', // ✅ Needed for cookie to be set by FastAPI
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.detail || data.error || 'Failed to sign up');
      return;
    }

    router.push('/protected/dashboard');
  } catch (err) {
    setError('Network error');
    console.error(err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 shadow border border-gray-200">
        <h1 className="text-xl font-semibold mb-4">Create your organization</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input className="w-full border rounded px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Organization name</label>
            <input className="w-full border rounded px-3 py-2" value={organizationName} onChange={e=>setOrganizationName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Primary brand color</label>
            <input className="w-24 h-10 p-0 border rounded" type="color" value={colorHex} onChange={e=>{
              setColorHex(e.target.value);
              const next = [...colors];
              next[0] = e.target.value;
              setColors(next);
            }} />
          </div>
          <div>
            <label className="block text-sm mb-2">Additional brand colors</label>
            <div className="flex flex-wrap gap-3">
              {colors.slice(1).map((c, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    className="w-24 h-10 p-0 border rounded"
                    type="color"
                    value={c}
                    onChange={e=>{
                      const next = [...colors];
                      next[idx+1] = e.target.value;
                      setColors(next);
                    }}
                  />
                  <button type="button" className="px-2 py-1 border rounded text-xs" onClick={()=>{
                    const next = colors.filter((_, i)=> i !== idx+1);
                    setColors(next);
                  }}>Remove</button>
                </div>
              ))}
              <button type="button" className="px-3 py-2 border rounded text-sm" onClick={()=> setColors(prev=> [...prev, '#4f46e5'])}>Add color</button>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Logo (fixed size recommended)</label>
            <input type="file" accept="image/*" onChange={e=>setLogoFile(e.target.files?.[0] || null)} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full bg-slate-900 text-white py-2 rounded">Sign up</button>
          <a href="/login" className="block text-center text-sm text-slate-700 underline">Have an account? Sign in</a>
        </form>
      </div>
    </div>
  );
}


