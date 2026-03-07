'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { captureLead } from '@/actions/leads';
import { Loader2 } from 'lucide-react';
import Image from 'next/image'; 

export default function LandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Pegamos a verdade absoluta direto do HTML (sem delay de estado do React)
    const formData = new FormData(event.currentTarget);
    const currentNome = (formData.get('nome') as string) || '';
    const currentEmail = (formData.get('email') as string) || '';
    const currentWhatsapp = (formData.get('whatsapp') as string) || '';

    // ==========================================
    // VALIDAÇÃO FRONTEND PRECISA E EXATA
    // ==========================================
    
    if (currentNome.trim().split(/\s+/).length < 2) {
      setErrorMsg('Digite pelo menos nome e sobrenome.');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentEmail.trim())) {
      setErrorMsg('Insira um e-mail válido (ex: nome@email.com).');
      setIsLoading(false);
      return;
    }

    const digitsOnly = currentWhatsapp.replace(/\D/g, '');
    if (digitsOnly.length !== 11) {
      setErrorMsg('Digite um WhatsApp válido com DDD (ex: (21) 99999-9999).');
      setIsLoading(false);
      return;
    }

    // ==========================================
    // ENVIO PARA O SERVIDOR E ANALYTICS
    // ==========================================

    const result = await captureLead(formData);

    if (result.success) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('umami_lead_id', result.lead_id as string);
        localStorage.setItem('umami_lead_perfil', result.perfil as string);
        if ((window as any).umami) {
          (window as any).umami.track('lead_captured');
        }
      }

      setTimeout(() => {
        router.push('/ebook');
      }, 300);
    } else {
      setErrorMsg(result.message || 'Ocorreu um erro.');
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        <div className="bg-[#0D2A4B] p-6 text-center text-white">
          <Image
            src="/miniatura_ebook_dr.png"
            alt="Foto do Dr. Mauro Reis"
            width={112}
            height={112}
            className="rounded-full object-cover shadow-lg mb-4 mx-auto"
          />
          <h1 className="text-2xl font-extrabold mb-1">Navegando a Neurodiversidade</h1>
          <p className="text-[#A9CCE3] text-sm">Guia prático para famílias e profissionais</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-gray-800">Baixe seu e-book gratuito</h2>
            <p className="text-sm text-gray-500 mt-1">Preencha os dados abaixo para liberar o seu acesso imediato.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CAMPO NOME: Impede números e espaços duplos na hora de digitar */}
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">Nome completo</label>
              <input 
                type="text" id="nome" name="nome" required 
                placeholder="Ex: Maria da Silva"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none transition-all text-gray-900"
                onInput={(e) => {
                  let val = e.currentTarget.value;
                  val = val.replace(/[0-9]/g, ''); // Arranca números
                  val = val.replace(/\s{2,}/g, ' '); // Não deixa dar espaço duplo
                  if (val.startsWith(' ')) val = val.trimStart(); // Corta espaço no começo
                  e.currentTarget.value = val;
                }}
              />
            </div>

            {/* CAMPO E-MAIL: Impede espaços físicos e força minúsculo */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
              <input 
                type="email" id="email" name="email" required 
                placeholder="Ex: maria@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none transition-all text-gray-900"
                onInput={(e) => {
                  // A tecla de espaço simplesmente não funciona aqui
                  e.currentTarget.value = e.currentTarget.value.replace(/\s/g, '').toLowerCase();
                }}
              />
            </div>

            {/* CAMPO WHATSAPP: Bloqueio físico de teclado + Máscara */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
              <input 
                type="tel" id="whatsapp" name="whatsapp" required 
                placeholder="(21) 99999-9999"
                maxLength={15}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none transition-all text-gray-900"
                onKeyDown={(e) => {
                  // O Leão de Chácara: Se não for número ou tecla de apagar/mover, ele bloqueia a tecla fisicamente
                  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
                  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                  }
                }}
                onInput={(e) => {
                  // A Máscara
                  let val = e.currentTarget.value.replace(/\D/g, '');
                  if (val.length > 11) val = val.slice(0, 11);
                  let masked = val;
                  if (val.length > 2) masked = `(${val.slice(0, 2)}) ${val.slice(2)}`;
                  if (val.length > 7) masked = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
                  e.currentTarget.value = masked;
                }}
              />
            </div>

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
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-lg text-center animate-in fade-in slide-in-from-top-1">
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
                'Acessar e-book agora'
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