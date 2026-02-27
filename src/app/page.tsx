'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { captureLead } from '@/actions/leads';
import { BookOpen, Loader2 } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const formData = new FormData(event.currentTarget);
    
    // Chama a nossa Server Action (Backend)
    const result = await captureLead(formData);

    if (result.success) {
      // Se o cookie foi gerado com sucesso, manda para o e-book!
      router.push('/ebook');
    } else {
      setErrorMsg(result.message || 'Ocorreu um erro.');
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Cabeçalho Visual (Alinhado à marca do Dr. Mauro) */}
        <div className="bg-[#0D2A4B] p-6 text-center text-white">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-[#2E86C1]" />
          <h1 className="text-2xl font-extrabold mb-1">Navegando a Neurodiversidade</h1>
          <p className="text-[#A9CCE3] text-sm">Guia prático para famílias e profissionais</p>
        </div>

        {/* Formulário de Captura */}
        <div className="p-6 md:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-gray-800">Baixe seu E-book Gratuito</h2>
            <p className="text-sm text-gray-500 mt-1">Preencha os dados abaixo para liberar o seu acesso imediato.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
              <input 
                type="text" id="nome" name="nome" required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Ex: João da Silva"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
              <input 
                type="email" id="email" name="email" required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Ex: joao@email.com"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
              <input 
                type="tel" id="whatsapp" name="whatsapp" required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* Feature 1: Segmentação de Leads */}
            <div>
              <label htmlFor="perfil" className="block text-sm font-semibold text-gray-700 mb-1">Qual a sua relação com o Autismo?</label>
              <select 
                id="perfil" name="perfil" required defaultValue=""
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none transition-all text-gray-900 bg-white"
              >
                <option value="" disabled>Selecione seu perfil...</option>
                <option value="Familiar / Cuidador">Familiar / Cuidador</option>
                <option value="Psicólogo(a)">Psicólogo(a)</option>
                <option value="Fonoaudiólogo(a)">Fonoaudiólogo(a)</option>
                <option value="Terapeuta Ocupacional">Terapeuta Ocupacional</option>
                <option value="Médico(a)">Médico(a)</option>
                <option value="Educador(a) / Professor(a)">Educador(a) / Professor(a)</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                {errorMsg}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-2 bg-[#2E86C1] hover:bg-[#1B4F72] text-white font-bold py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Liberando acesso...
                </>
              ) : (
                'Acessar E-book Agora'
              )}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 mt-6">
            Seus dados estão seguros. Não enviamos spam.
          </p>
        </div>
      </div>
    </main>
  );
}