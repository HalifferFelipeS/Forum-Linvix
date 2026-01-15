'use client'; // Necessário para a busca funcionar

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="bg-[#003366] text-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Topo com Logo e Menu */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
             <Image 
               src="/linvix-dark.svg" 
               alt="Linvix Logo" 
               width={150} 
               height={40} 
               className="object-contain" 
             />
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-200 transition">INÍCIO</Link>
            <Link href="#" className="hover:text-blue-200 transition">TUTORIAIS</Link>
          </nav>
          
          {/* REMOVI O BOTÃO ÁREA DO CLIENTE AQUI */}
        </div>

        {/* Barra de Busca e Título */}
        <div className="text-center max-w-3xl mx-auto pb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Como podemos ajudar você hoje?</h2>
          
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              placeholder="Digite sua dúvida (ex: Como emitir nota fiscal?)" 
              className="w-full p-4 pl-12 rounded-lg text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
          </form>
        </div>

      </div>
    </header>
  );
}