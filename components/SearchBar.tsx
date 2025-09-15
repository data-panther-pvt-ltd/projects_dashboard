'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`Searching for: ${query}`);
     
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search tools, documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
        >
          
        </button>
      </div>
    </form>
  );
}
