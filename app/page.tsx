import Link from "next/link";
import Header from "./components/Header";
import { FileText, ShoppingCart, Users, BarChart3, HelpCircle, PlayCircle } from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Fiscal", icon: <FileText size={32} className="text-blue-600" />, desc: "Notas, tributos e NCM", color: "text-blue-600" },
    { name: "Compras", icon: <ShoppingCart size={32} className="text-green-600" />, desc: "Pedidos e fornecedores", color: "text-green-600" },
    { name: "Cadastro", icon: <Users size={32} className="text-purple-600" />, desc: "Clientes e produtos", color: "text-purple-600" },
    { name: "Relatórios", icon: <BarChart3 size={32} className="text-orange-600" />, desc: "Análises e gráficos", color: "text-orange-600" },
    { name: "Video Aulas", icon: <PlayCircle size={32} className="text-red-600" />, desc: "Tutoriais em vídeo", color: "text-red-600" },
    { name: "Duvidas", icon: <HelpCircle size={32} className="text-teal-600" />, desc: "Perguntas frequentes", color: "text-teal-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      {/* Conteúdo Principal (Só os cards agora) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/${cat.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`}>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-transparent hover:border-[#003366] group h-full">
                <div className={`mb-4 ${cat.color} bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">{cat.name}</h3>
                <p className="text-gray-500 text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm border-t">
        © 2026 Linvix Sistemas. Todos os direitos reservados.
      </footer>
    </div>
  );
}