'use client';

import { useState } from 'react';
import { createPost } from '../actions'; // Puxa a função que criamos no passo 2
import { Lock, Save, CheckCircle } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // DEFINA SUA SENHA AQUI (Simples e funcional)
  const MY_SECRET_PASS = "linvix2026"; 

  const handleLogin = () => {
    if (password === MY_SECRET_PASS) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
    }
  };

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
            placeholder="Senha de administrador" 
            className="w-full border p-3 rounded mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-[#003366] text-white p-3 rounded font-bold hover:bg-blue-800"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-[#003366] mb-6 flex items-center gap-2">
          <Save size={24} /> Novo Tutorial
        </h1>

        <form action={createPost} className="space-y-6">
          
          {/* Título */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Título do Tutorial</label>
            <input name="title" required className="w-full border p-3 rounded-lg bg-gray-50" placeholder="Ex: Como emitir NFe" />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Categoria (Guia)</label>
            <select name="category" className="w-full border p-3 rounded-lg bg-gray-50">
              <option value="fiscal">Fiscal</option>
              <option value="compras">Compras</option>
              <option value="cadastro">Cadastro</option>
              <option value="relatorios">Relatórios</option>
              <option value="duvidas">Dúvidas Gerais</option>
            </select>
          </div>

          {/* Link do Youtube */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Link do Vídeo (Youtube)</label>
            <input name="videoUrl" className="w-full border p-3 rounded-lg bg-gray-50" placeholder="Cole o link aqui..." />
          </div>

          {/* Conteúdo Texto */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Explicação em Texto</label>
            <textarea name="content" required className="w-full border p-3 rounded-lg bg-gray-50 h-40" placeholder="Escreva o passo a passo..." />
          </div>

          <button type="submit" className="w-full bg-green-600 text-white p-4 rounded-lg font-bold hover:bg-green-700 flex justify-center gap-2">
            <CheckCircle /> Publicar no Site
          </button>

        </form>
      </div>
    </div>
  );
}