// 'use client';

// import { useRouter } from 'next/navigation';
// import SearchBar from './SearchBar';
// import { useLanguage } from './LanguageProvider';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const router = useRouter();
//   const { language, setLanguage, t } = useLanguage();
//   const [org, setOrg] = useState<{ name: string; colorHex: string; logoUrl?: string | null } | null>(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     fetch('/api/org').then(async (r) => {
//       if (r.ok) {
//         const data = await r.json();
//         setOrg(data.organization);
//       }
//     });
//   }, []);

//   const handleLogout = async () => {
//     await fetch('/api/auth/logout', { method: 'POST' });
//     router.replace('/login');
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//         <div className='flex items-center'>
//           <img
//             src={org?.logoUrl || '/aiq.png'}
//             alt="Logo"
//             className="h-10 w-auto mr-2 object-contain"
//             onError={(e) => {
//               const img = e.currentTarget as HTMLImageElement;
//               if (img.src.endsWith('/aiq.png')) return;
//               img.src = '/aiq.png';
//             }}
//           />
//           <span className="font-medium" style={{ color: org?.colorHex || '#111827' }}>{org?.name || 'AnalytIQ'}</span>
//         </div>

//         <div className="flex-1 mx-6 max-w-md">
//           <SearchBar />
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="flex rounded-md border border-gray-300 overflow-hidden">
//             <button
//               aria-label="Switch to English"
//               onClick={() => setLanguage('en')}
//               className={`${language === 'en' ? 'bg-slate-900 text-white' : 'bg-white text-gray-700'} px-3 py-1 text-sm`}
//             >
//               {t('navbar.lang_en')}
//             </button>
//             <button
//               aria-label="التبديل إلى العربية"
//               onClick={() => setLanguage('ar')}
//               className={`${language === 'ar' ? 'bg-slate-900 text-white' : 'bg-white text-gray-700'} px-3 py-1 text-sm`}
//             >
//               {t('navbar.lang_ar')}
//             </button>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
//           >
//             {t('navbar.logout')}
//           </button>
//           <button onClick={() => setOpen(true)} className="bg-slate-950 text-white border px-3 py-2 rounded text-sm">Settings</button>
//         </div>
//       </div>
//       {open && (
//         <BrandingModal org={org} onClose={() => setOpen(false)} onSaved={(o) => setOrg(o)} />
//       )}
//     </header>
//   );
// }

// function BrandingModal({ org, onClose, onSaved }: { org: { name: string; colorHex: string; logoUrl?: string | null } | null; onClose: () => void; onSaved: (o: any) => void; }) {
//   const [name, setName] = useState(org?.name || '');
//   const [colorHex, setColorHex] = useState(org?.colorHex || '#111827');
//   const [logo, setLogo] = useState<File | null>(null);
//   const [saving, setSaving] = useState(false);

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     const fd = new FormData();
//     fd.append('name', name);
//     fd.append('colorHex', colorHex);
//     if (logo) fd.append('logo', logo);
//     const res = await fetch('/api/org', { method: 'PUT', body: fd });
//     setSaving(false);
//     if (res.ok) {
//       const data = await res.json();
//       onSaved(data.organization);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//       <div className="bg-white p-6 w-full max-w-md rounded shadow">
//         <h2 className="text-lg font-semibold mb-4">Settings</h2>
//         <form onSubmit={submit} className="space-y-4">
//           <div>
//             <label className="block text-sm mb-1">Name</label>
//             <input className="w-full border rounded px-3 py-2" value={name} onChange={e=>setName(e.target.value)} />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Color</label>
//             <input type="color" className="w-24 h-10 p-0" value={colorHex} onChange={e=>setColorHex(e.target.value)} />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Logo</label>
//             <input type="file" accept="image/*" onChange={e=>setLogo(e.target.files?.[0] || null)} />
//           </div>
//           <div className="flex gap-2 justify-end">
//             <button type="button" className="px-3 py-2 border rounded" onClick={onClose}>Cancel</button>
//             <button disabled={saving} className="px-3 py-2 bg-slate-900 text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useRouter } from 'next/navigation';
// import SearchBar from './SearchBar';
// import { useLanguage } from './LanguageProvider';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const router = useRouter();
//   const { language, setLanguage, t } = useLanguage();
//   const [org, setOrg] = useState<{ name: string; colorHex: string; colors?: string[]; logoUrl?: string | null } | null>(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     fetch('/api/org').then(async (r) => {
//       if (r.ok) {
//         const data = await r.json();
//         setOrg(data.organization);
//       }
//     });
//   }, []);

//   const handleLogout = async () => {
//     await fetch('/api/auth/logout', { method: 'POST' });
//     router.replace('/login');
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//         {/* Logo & Org Name */}
//         <div className='flex items-center'>
//           <img
//             src={org?.logoUrl || '/aiq.png'}
//             alt="Logo"
//             className="h-10 w-auto mr-2 object-contain"
//             onError={(e) => {
//               const img = e.currentTarget as HTMLImageElement;
//               if (img.src.endsWith('/aiq.png')) return;
//               img.src = '/aiq.png';
//             }}
//           />
//           <span className="font-medium" style={{ color: (org?.colors && org.colors[0]) || org?.colorHex || '#111827' }}>
//             {org?.name || 'AnalytIQ'}
//           </span>
//         </div>

//         {/* Search */}
//         <div className="flex-1 mx-6 max-w-md">
//           <SearchBar />
//         </div>

//         {/* Language & Actions */}
//         <div className="flex items-center gap-3">
//           <div className="flex rounded-md border border-gray-300 overflow-hidden">
//             <button
//               aria-label="Switch to English"
//               onClick={() => setLanguage('en')}
//               className={`${language === 'en' ? 'bg-slate-900 text-white' : 'bg-white text-gray-700'} px-3 py-1 text-sm`}
//             >
//               {t('navbar.lang_en')}
//             </button>
//             <button
//               aria-label="التبديل إلى العربية"
//               onClick={() => setLanguage('ar')}
//               className={`${language === 'ar' ? 'bg-slate-900 text-white' : 'bg-white text-gray-700'} px-3 py-1 text-sm`}
//             >
//               {t('navbar.lang_ar')}
//             </button>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
//           >
//             {t('navbar.logout')}
//           </button>
//           <button onClick={() => setOpen(true)} className="bg-slate-950 text-white border px-3 py-2 rounded text-sm">
//             Settings
//           </button>
//         </div>
//       </div>

//       {open && (
//         <BrandingModal org={org} onClose={() => setOpen(false)} onSaved={(o) => setOrg(o)} />
//       )}
//     </header>
//   );
// }

// function BrandingModal({
//   org,
//   onClose,
//   onSaved,
// }: {
//   org: { name: string; colorHex: string; colors?: string[]; logoUrl?: string | null } | null;
//   onClose: () => void;
//   onSaved: (o: any) => void;
// }) {
//   const [name, setName] = useState(org?.name || '');
//   const [colorHex, setColorHex] = useState(org?.colorHex || org?.colors?.[0] || '#111827');
//   const [colors, setColors] = useState<string[]>(org?.colors && org.colors.length ? org.colors : [org?.colorHex || '#111827']);
//   const [logo, setLogo] = useState<File | null>(null);
//   const [saving, setSaving] = useState(false);

//   // Prevent scroll while modal is open
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, []);

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     const fd = new FormData();
//     fd.append('name', name);
//     fd.append('colorHex', colorHex);
//     if (colors && colors.length) {
//       fd.append('colors', JSON.stringify(colors));
//     }
//     if (logo) fd.append('logo', logo);
//     const res = await fetch('/api/org', { method: 'PUT', body: fd });
//     setSaving(false);
//     if (res.ok) {
//       const data = await res.json();
//       onSaved(data.organization);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//           aria-label="Close modal"
//         >
//           &times;
//         </button>

//         <h2 className="text-xl font-semibold mb-6 text-gray-800">Organization Settings</h2>
//         <form onSubmit={submit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <input
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Primary Brand Color</label>
//             <input
//               type="color"
//               className="w-12 h-10 p-0 border border-gray-300 rounded"
//               value={colorHex}
//               onChange={(e) => {
//                 setColorHex(e.target.value);
//                 const next = [...colors];
//                 next[0] = e.target.value;
//                 setColors(next);
//               }}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Additional Brand Colors</label>
//             <div className="flex flex-wrap gap-3">
//               {colors.slice(1).map((c, idx) => (
//                 <div key={idx} className="flex items-center gap-2">
//                   <input
//                     type="color"
//                     className="w-12 h-10 p-0 border border-gray-300 rounded"
//                     value={c}
//                     onChange={(e) => {
//                       const next = [...colors];
//                       next[idx + 1] = e.target.value;
//                       setColors(next);
//                     }}
//                   />
//                   <button
//                     type="button"
//                     className="px-2 py-1 border rounded text-xs"
//                     onClick={() => {
//                       const next = colors.filter((_, i) => i !== idx + 1);
//                       setColors(next);
//                     }}
//                   >Remove</button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 className="px-3 py-2 border rounded text-sm"
//                 onClick={() => setColors((prev) => [...prev, '#4f46e5'])}
//               >Add color</button>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setLogo(e.target.files?.[0] || null)}
//               className="block w-full text-sm text-gray-500"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={saving}
//               className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 disabled:opacity-50"
//             >
//               {saving ? 'Saving...' : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useRouter } from 'next/navigation';
// import SearchBar from './SearchBar';
// import { useLanguage } from './LanguageProvider';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const router = useRouter();
//   const { language, setLanguage, t } = useLanguage();
//   const [org, setOrg] = useState<{ name: string; colorHex: string; colors?: string[]; logoUrl?: string | null } | null>(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     fetch('/api/org').then(async (r) => {
//       if (r.ok) {
//         const data = await r.json();
//         setOrg(data.organization);
//       }
//     });
//   }, []);

//   const handleLogout = async () => {
//     await fetch('/api/auth/logout', { method: 'POST' });
//     router.replace('/login');
//   };

//   const navbarBgColor = (org?.colors?.[0] || org?.colorHex || '#ffffff') + 'cc'; // 'cc' for ~80% opacity

//   return (
//     <header
//       className="sticky top-0 z-50 backdrop-blur-lg shadow-sm border-b"
//       style={{
//         backgroundColor: navbarBgColor,
//         borderColor: '#e5e7eb',
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//         {/* Logo & Org Name */}
//         <div className="flex items-center">
//           <img
//             src={org?.logoUrl || '/aiq.png'}
//             alt="Logo"
//             className="h-10 w-auto mr-2 object-contain"
//             onError={(e) => {
//               const img = e.currentTarget as HTMLImageElement;
//               if (img.src.endsWith('/aiq.png')) return;
//               img.src = '/aiq.png';
//             }}
//           />
//           <span className="font-medium" style={{ color: (org?.colors?.[0] || org?.colorHex || '#111827') }}>
//             {org?.name || 'AnalytIQ'}
//           </span>
//         </div>

//         {/* Search */}
//         <div className="flex-1 mx-6 max-w-md">
//           <SearchBar />
//         </div>

//         {/* Language & Actions */}
//         <div className="flex items-center gap-3">
//           <div className="flex rounded-md border border-gray-300 overflow-hidden">
//             <button
//               aria-label="Switch to English"
//               onClick={() => setLanguage('en')}
//               className={`${language === 'en' ? 'bg-slate-900 text-white' : 'bg-white text-gray-700'} px-3 py-1 text-sm`}
//             >
//               {t('navbar.lang_en')}
//             </button>
//             <button
//               aria-label="التبديل إلى العربية"
//               onClick={() => setLanguage('ar')}
//               className={`${language === 'ar' ? 'bg-slate-900 text-white' : 'bg-white text-gray-700'} px-3 py-1 text-sm`}
//             >
//               {t('navbar.lang_ar')}
//             </button>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
//           >
//             {t('navbar.logout')}
//           </button>
//           <button onClick={() => setOpen(true)} className="bg-slate-950 text-white border px-3 py-2 rounded text-sm">
//             Settings
//           </button>
//         </div>
//       </div>

//       {open && (
//         <BrandingModal org={org} onClose={() => setOpen(false)} onSaved={(o) => setOrg(o)} />
//       )}
//     </header>
//   );
// }

// function BrandingModal({
//   org,
//   onClose,
//   onSaved,
// }: {
//   org: { name: string; colorHex: string; colors?: string[]; logoUrl?: string | null } | null;
//   onClose: () => void;
//   onSaved: (o: any) => void;
// }) {
//   const [name, setName] = useState(org?.name || '');
//   const [colorHex, setColorHex] = useState(org?.colorHex || org?.colors?.[0] || '#111827');
//   const [colors, setColors] = useState<string[]>(org?.colors && org.colors.length ? org.colors : [org?.colorHex || '#111827']);
//   const [logo, setLogo] = useState<File | null>(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, []);

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     const fd = new FormData();
//     fd.append('name', name);
//     fd.append('colorHex', colorHex);
//     if (colors && colors.length) {
//       fd.append('colors', JSON.stringify(colors));
//     }
//     if (logo) fd.append('logo', logo);
//     const res = await fetch('/api/org', { method: 'PUT', body: fd });
//     setSaving(false);
//     if (res.ok) {
//       const data = await res.json();
//       onSaved(data.organization);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//           aria-label="Close modal"
//         >
//           &times;
//         </button>

//         <h2 className="text-xl font-semibold mb-6 text-gray-800">Organization Settings</h2>
//         <form onSubmit={submit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <input
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Primary Brand Color</label>
//             <input
//               type="color"
//               className="w-12 h-10 p-0 border border-gray-300 rounded"
//               value={colorHex}
//               onChange={(e) => {
//                 setColorHex(e.target.value);
//                 const next = [...colors];
//                 next[0] = e.target.value;
//                 setColors(next);
//               }}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Additional Brand Colors</label>
//             <div className="flex flex-wrap gap-3">
//               {colors.slice(1).map((c, idx) => (
//                 <div key={idx} className="flex items-center gap-2">
//                   <input
//                     type="color"
//                     className="w-12 h-10 p-0 border border-gray-300 rounded"
//                     value={c}
//                     onChange={(e) => {
//                       const next = [...colors];
//                       next[idx + 1] = e.target.value;
//                       setColors(next);
//                     }}
//                   />
//                   <button
//                     type="button"
//                     className="px-2 py-1 border rounded text-xs"
//                     onClick={() => {
//                       const next = colors.filter((_, i) => i !== idx + 1);
//                       setColors(next);
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 className="px-3 py-2 border rounded text-sm"
//                 onClick={() => setColors((prev) => [...prev, '#4f46e5'])}
//               >
//                 Add color
//               </button>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setLogo(e.target.files?.[0] || null)}
//               className="block w-full text-sm text-gray-500"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={saving}
//               className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 disabled:opacity-50"
//             >
//               {saving ? 'Saving...' : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


'use client';

import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { useLanguage } from './LanguageProvider';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [org, setOrg] = useState<{
    name: string;
    colorHex: string;
    colors?: string[];
    logoUrl?: string | null;
  } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/api/org').then(async (r) => {
      if (r.ok) {
        const data = await r.json();
        setOrg(data.organization);
      }
    });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
  };

  const navbarBgColor = (org?.colors?.[0] || org?.colorHex || '#ffffff') + 'cc';

  return (
    <>
      {/* Navbar */}
      <header
        className="sticky top-0 z-50 backdrop-blur-lg shadow-sm border-b"
        style={{
          backgroundColor: navbarBgColor,
          borderColor: '#e5e7eb',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo & Org Name */}
          <div className="flex items-center">
            <img
              src={org?.logoUrl || '/aiq.png'}
              alt="Logo"
              className="h-10 w-auto mr-2 object-contain"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (img.src.endsWith('/aiq.png')) return;
                img.src = '/aiq.png';
              }}
            />
            {/* <span
              className="font-medium"
              style={{ color: org?.colors?.[0] || org?.colorHex || '#111827' }}
            >
              {org?.name || 'AnalytIQ'}
            </span> */}
          </div>

          {/* Search */}
          <div className="flex-1 mx-6 max-w-md">
            <SearchBar />
          </div>

          {/* Language & Actions */}
          <div className="flex items-center gap-3">
            <div className="flex rounded-md border border-gray-300 overflow-hidden">
              <button
                aria-label="Switch to English"
                onClick={() => setLanguage('en')}
                className={`${
                  language === 'en'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-gray-700'
                } px-3 py-1 text-sm`}
              >
                {t('navbar.lang_en')}
              </button>
              <button
                aria-label="التبديل إلى العربية"
                onClick={() => setLanguage('ar')}
                className={`${
                  language === 'ar'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-gray-700'
                } px-3 py-1 text-sm`}
              >
                {t('navbar.lang_ar')}
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              {t('navbar.logout')}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="bg-slate-950 text-white border px-3 py-2 rounded text-sm"
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Branding Modal rendered OUTSIDE of header */}
      {open && (
        <BrandingModal
          org={org}
          onClose={() => setOpen(false)}
          onSaved={(o) => setOrg(o)}
        />
      )}
    </>
  );
}

function BrandingModal({
  org,
  onClose,
  onSaved,
}: {
  org: {
    name: string;
    colorHex: string;
    colors?: string[];
    logoUrl?: string | null;
  } | null;
  onClose: () => void;
  onSaved: (o: any) => void;
}) {
  const [name, setName] = useState(org?.name || '');
  const [colorHex, setColorHex] = useState(
    org?.colorHex || org?.colors?.[0] || '#111827'
  );
  const [colors, setColors] = useState<string[]>(
    org?.colors && org.colors.length ? org.colors : [org?.colorHex || '#111827']
  );
  const [logo, setLogo] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Prevent scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('name', name);
    fd.append('colorHex', colorHex);
    if (colors && colors.length) {
      fd.append('colors', JSON.stringify(colors));
    }
    if (logo) fd.append('logo', logo);

    const res = await fetch('/api/org', {
      method: 'PUT',
      body: fd,
    });

    setSaving(false);
    if (res.ok) {
      const data = await res.json();
      onSaved(data.organization);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Organization Settings
        </h2>
        <form onSubmit={submit} className="space-y-5">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Brand Color
            </label>
            <input
              type="color"
              className="w-12 h-10 p-0 border border-gray-300 rounded"
              value={colorHex}
              onChange={(e) => {
                setColorHex(e.target.value);
                const next = [...colors];
                next[0] = e.target.value;
                setColors(next);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Brand Colors
            </label>
            <div className="flex flex-wrap gap-3">
              {colors.slice(1).map((c, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-12 h-10 p-0 border border-gray-300 rounded"
                    value={c}
                    onChange={(e) => {
                      const next = [...colors];
                      next[idx + 1] = e.target.value;
                      setColors(next);
                    }}
                  />
                  <button
                    type="button"
                    className="px-2 py-1 border rounded text-xs"
                    onClick={() => {
                      const next = colors.filter((_, i) => i !== idx + 1);
                      setColors(next);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-3 py-2 border rounded text-sm"
                onClick={() => setColors((prev) => [...prev, '#4f46e5'])}
              >
                Add color
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
