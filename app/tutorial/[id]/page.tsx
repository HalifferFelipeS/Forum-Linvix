import { prisma } from '../../../lib/prisma';
import Header from "../../components/Header";
import { ArrowLeft, FileText, Calendar } from "lucide-react";
import Link from "next/link";

export default async function TutorialPage({ params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({
    where: { id: params.id }
  });

  if (!article) return <div>Tutorial não encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="flex items-center text-blue-600 mb-6 hover:underline font-bold w-fit">
          <ArrowLeft className="mr-2" size={20} /> Voltar
        </Link>

        <h1 className="text-3xl font-bold text-[#003366] mb-4">{article.title}</h1>
        
        <div className="flex gap-2 mb-8 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Calendar size={14}/> {article.createdAt.toLocaleDateString()}</span>
          <span>|</span>
          <span>Categorias: {article.categories.join(', ')}</span>
        </div>

        {article.videoId && (
          <div className="aspect-video w-full bg-black rounded-xl shadow-lg mb-8 overflow-hidden">
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${article.videoId}`} 
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="bg-white p-8 rounded-xl shadow border border-gray-100 whitespace-pre-wrap leading-relaxed text-gray-800">
          {article.content}
        </div>

        {article.pdfUrl && (
          <div className="mt-8">
            <a href={article.pdfUrl} target="_blank" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition">
              <FileText /> Baixar Material em PDF
            </a>
          </div>
        )}
      </main>
    </div>
  );
}