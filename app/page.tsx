import Header from "./components/Header";
import { FileText, ShoppingCart, Users, BarChart3, Search, PlayCircle, HelpCircle } from "lucide-react";

export default function Home() {
  // Lista de botões que vão aparecer na tela
  const categories = [
    { name: 'Fiscal', icon: <FileText size={32} />, desc: 'Notas, tributos e NCM', color: 'text-blue-600' },
    { name: 'Compras', icon: <ShoppingCart size={32} />, desc: 'Pedidos e fornecedores', color: 'text-green-600' },
    { name: 'Cadastro', icon: <Users size={32} />, desc: 'Clientes e produtos', color: 'text-purple-600' },
    { name: 'Relatórios', icon: <BarChart3 size={32} />, desc: 'Análises e métricas', color: 'text-orange-600' },
    { name: 'Vídeo Aulas', icon: <PlayCircle size={32} />, desc: 'Assista nossos tutoriais', color: 'text-red-600' },
    { name: 'Dúvidas', icon: <HelpCircle size={32} />, desc: 'Perguntas frequentes', color: 'text-teal-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      {/* ÁREA DE BUSCA (Fundo azul escuro igual da imagem que você quer) */}
      <div className="bg-[#003366] pb-16 pt-10 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Como podemos ajudar você hoje?
        </h1>
        
        {/* Barra de Pesquisa */}
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Digite sua dúvida (ex: Como emitir nota fiscal?)" 
            className="w-full p-4 pl-12 rounded-lg shadow-lg text-gray-700 outline-none focus:ring-4 focus:ring-blue-300 transition"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* ÁREA DOS CARDS (Sobe um pouco para cima do azul) */}
      <main className="flex-1 container mx-auto px-4 -mt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border-b-4 border-transparent hover:border-[#003366] group">
              <div className={`mb-4 ${cat.color} bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">{cat.name}</h3>
              <p className="text-gray-500 text-sm">{cat.desc}</p>
            </div>
          ))}

        </div>
      </main>

      {/* RODAPÉ */}
      <footer className="bg-gray-100 py-8 text-center text-gray-500 text-sm border-t">
        <p>© 2026 Linvix Sistemas - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}