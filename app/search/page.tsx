import { prisma } from '../../lib/prisma';
import Header from "../components/Header";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || '';

  // A MÁGICA ESTÁ AQUI:
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        // Procura no Título...
        { title: { contains: query, mode: 'insensitive' } },
        // ...OU procura no Conteúdo
        { content: { contains: query, mode: 'insensitive' } },
      ]
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/" className="flex items-center text-blue-600 mb-6 hover:underline font-bold w-fit">
          <ArrowLeft className="mr-2" size={20} /> Voltar
        </Link>
        <h1 className="text-2xl font-bold mb-6">Resultados para: "{query}"</h1>
        
        <div className="grid gap-6">
          {articles.map((art) => (
            <div key={art.id} className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{art.title}</h2>
                {/* Mostra um pedacinho do conteúdo para confirmar que achou lá */}
                <div className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {art.content}
                </div>
                <Link href={`/tutorial/${art.id}`} className="text-blue-600 font-bold hover:underline">
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
          {articles.length === 0 && <p className="text-gray-500">Nenhum tutorial encontrado com esse termo.</p>}
        </div>
      </main>
    </div>
  );
}