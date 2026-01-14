import { prisma } from '../../lib/prisma'; // Certifique-se que tem o arquivo lib/prisma.ts (vamos criar abaixo se não tiver)
import Header from "../components/Header";
import { ArrowLeft, PlayCircle, FileText } from "lucide-react";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  
  // Busca no banco apenas os artigos dessa categoria (ex: fiscal)
  const articles = await prisma.article.findMany({
    where: {
      category: params.category 
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Formata o título (ex: de 'fiscal' para 'Fiscal')
  const title = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/" className="flex items-center text-blue-600 mb-6 hover:underline font-bold w-fit">
          <ArrowLeft className="mr-2" size={20} /> Voltar
        </Link>

        <h1 className="text-3xl font-bold text-[#003366] mb-8 border-b pb-4">
          Tutoriais de {title}
        </h1>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Nenhum tutorial encontrado nesta categoria ainda.</p>
            <p className="text-sm mt-2">Acesse /admin para cadastrar o primeiro.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((art) => (
              <div key={art.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col md:flex-row gap-6">
                
                {/* Se tiver vídeo, mostra a miniatura */}
                {art.videoId && (
                  <div className="w-full md:w-64 flex-shrink-0">
                    <iframe 
                      className="w-full h-40 rounded-lg shadow"
                      src={`https://www.youtube.com/embed/${art.videoId}`} 
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <PlayCircle size={20} className="text-red-600" />
                    {art.title}
                  </h2>
                  <div className="text-gray-600 mb-4 whitespace-pre-wrap text-sm line-clamp-3">
                    {art.content}
                  </div>
                  {/* Botão fingindo abrir detalhes (pode implementar depois) */}
                  <button className="text-blue-600 font-bold text-sm hover:underline">
                    Ver tutorial completo
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}