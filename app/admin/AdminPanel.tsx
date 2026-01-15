'use client';

import { useState } from 'react';
import { createPost, updatePost, deletePost } from '../actions';
import { Lock, Save, Trash2, Edit, Search, PlusCircle } from 'lucide-react';

// Atualizamos o tipo para aceitar várias categorias (string[]) e o PDF
type Article = {
  id: string;
  title: string;
  categories: string[]; // <--- AGORA É UMA LISTA
  content: string;
  videoId: string | null;
  pdfUrl: string | null;
};

export default function AdminPanel({ articles }: { articles: Article[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<Article | null>(null);

  // SUA NOVA SENHA AQUI
  const MY_SECRET_PASS = "@Binho1379"; 

  // Filtrar tutoriais pela busca
  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogin = () => {
    if (password === MY_SECRET_PASS) setIsAuthenticated(true);
    else alert("Senha incorreta!");
  };

  const handleEdit = (article: Article) => {
    setEditingItem(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // TELA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
          <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-blue-900">
            <Lock size={32} />
          </div>
          <h1 className="text-xl font-bold mb-4">Acesso Restrito</h1>
          <input 
            type="password" 
            placeholder="Senha..." 
            className="w-full border p-3 rounded mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-[#003366] text-white p-3 rounded font-bold hover:bg-blue-800">
            Entrar
          </button>
        </div>
      </div>
    );
  }

  // TELA DO ADMIN
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA DA ESQUERDA: FORMULÁRIO */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-8">
            <h1 className="text-xl font-bold text-[#003366] mb-6 flex items-center gap-2">
              {editingItem ? <Edit size={20}/> : <PlusCircle size={20}/>} 
              {editingItem ? 'Editar Tutorial' : 'Novo Tutorial'}
            </h1>

            {/* O "key" serve para resetar o formulário quando troca entre Novo e Editar */}
            <form 
              key={editingItem ? editingItem.id : 'new'}
              action={async (formData) => {
                // Validação simples para garantir que marcou categoria
                if (!formData.getAll('categories').length) {
                    alert("Selecione pelo menos uma categoria!");
                    return;
                }

                if (editingItem) {
                    await updatePost(formData);
                    setEditingItem(null); 
                } else {
                    await createPost(formData);
                }
                alert("Salvo com sucesso!");
            }} className="space-y-4">
              
              {/* ID Escondido (Só aparece na edição) */}
              {editingItem && <input type="hidden" name="id" value={editingItem.id} />}

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Título</label>
                <input name="title" defaultValue={editingItem?.title} required className="w-full border p-2 rounded bg-gray-50" />
              </div>

              {/* SELEÇÃO DE CATEGORIAS (Múltiplas) */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Categorias (Marque as opções)</label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded border h-32 overflow-y-auto">
                  {['fiscal', 'compras', 'cadastro', 'relatorios', 'duvidas', 'video-aulas'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
                      <input 
                        type="checkbox" 
                        name="categories" 
                        value={cat}
                        // Verifica se a categoria já estava marcada na edição
                        defaultChecked={editingItem?.categories.includes(cat)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="capitalize text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Link Vídeo (Youtube)</label>
                <input name="videoUrl" defaultValue={editingItem?.videoId ? `https://youtube.com/watch?v=${editingItem.videoId}` : ''} className="w-full border p-2 rounded bg-gray-50" placeholder="https://..." />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Link PDF (Opcional)</label>
                <input name="pdfUrl" defaultValue={editingItem?.pdfUrl || ''} className="w-full border p-2 rounded bg-gray-50" placeholder="https://..." />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Conteúdo</label>
                <textarea name="content" defaultValue={editingItem?.content} required className="w-full border p-2 rounded bg-gray-50 h-32" placeholder="Digite a explicação..." />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 flex justify-center gap-2">
                  <Save size={20} /> {editingItem ? 'Atualizar' : 'Salvar'}
                </button>
                
                {editingItem && (
                  <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white p-3 rounded hover:bg-gray-600">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* COLUNA DA DIREITA: LISTA E BUSCA */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tutoriais Cadastrados</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar por nome..." 
                  className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredArticles.length === 0 && <p className="text-gray-500 text-center py-10">Nenhum tutorial encontrado.</p>}
              
              {filteredArticles.map((art) => (
                <div key={art.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition">
                  <div>
                    <strong className="text-gray-800 block">{art.title}</strong>
                    <div className="flex gap-1 mt-1">
                        {/* Exibe as categorias como etiquetas pequenas */}
                        {art.categories.map(cat => (
                            <span key={cat} className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded uppercase font-bold">
                                {cat}
                            </span>
                        ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(art)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded" title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    
                    <button 
                      onClick={async () => {
                        if(confirm('Tem certeza que deseja excluir?')) {
                            await deletePost(art.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 rounded" title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}