'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

const externalLinks = [
  {
    name: 'AI Summarizer',
    description: 'From complexity to clarity.',
    url: 'http://34.28.203.178:3000',
    image: '/5.png',
  },
  {
    name: 'RAG Chatbot',
    description: 'Conversations made smarter.',
    url: 'http://34.28.203.178:3002',
    image: '/3.png',
  },
  {
    name: 'ChatWithData',
    description: 'Interact. Discover. Decide.',
    url: 'http://34.28.203.178:3001',
    image: '/1.png',
  },
  {
    name: 'Proposal Generator',
    description: 'Generate. Present. Win.',
    url: 'http://34.28.203.178:3003',
    image: '/6.png',
  },
];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth !== 'true') {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {externalLinks.map(({ name, description, url, image }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/70 backdrop-blur-xl border border-gray-100 shadow-sm hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between group rounded-lg cursor-pointer"
            >
              <div>
                <img
                  src={image}
                  alt={`${name} logo`}
                  className="w-full h-36 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-105"
                />
               
                <p className="text-gray-600 text-sm text-center my-4 ">{description}</p>
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-20 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DataPanther. All rights reserved.
        </footer>
      </main>
    </div>
  );
}


