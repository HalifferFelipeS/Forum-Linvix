import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#003366] text-white shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO (Aqui está a mudança) */}
        <div className="flex items-center gap-3">
          <Link href="/">
             <Image 
               src="/linvix-dark.svg" 
               alt="Linvix Logo" 
               width={150} 
               height={50} 
               className="object-contain" // Isso garante que a logo não distorça
             />
          </Link>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-blue-200 transition">INÍCIO</Link>
          <Link href="#" className="hover:text-blue-200 transition">TUTORIAIS</Link>
        </nav>

        <div className="text-sm bg-blue-800 py-1 px-3 rounded hover:bg-blue-700 cursor-pointer transition">
          Área do Cliente
        </div>

      </div>
    </header>
  );
}