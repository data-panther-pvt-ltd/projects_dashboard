'use client';

import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className='flex items-center'>
          <img src="/aiq.png" alt="Logo" className="h-18 w-36 mr-2" />
        </div>

        <div className="flex-1 mx-6 max-w-md">
          <SearchBar />
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
