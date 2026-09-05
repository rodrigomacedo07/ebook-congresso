'use client';

import Image from "next/image";
import { MessageCircle, BookOpen, ChevronRight, ChevronDown, X, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const trackEvent = (name: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    window.gtag?.('event', name, params);
  }
};

export default function LPDrmauroReis() {

  const router = useRouter();

  const [isCapaOpen, setIsCapaOpen] = useState(false); // Estado para abrir/fechar o modal

  const toggleCapa = () => setIsCapaOpen(!isCapaOpen); // Função que inverte o estado

  const [showFloatingEbook, setShowFloatingEbook] = useState(true);

  useEffect(() => {
  const handleScroll = () => {
    const section = document.getElementById('ebook');

    if (!section) return;

    const rect = section.getBoundingClientRect();

    // Quando o topo do ebook entra na tela
    if (rect.top < window.innerHeight * 0.3) {
      setShowFloatingEbook(false);
    } else {
      setShowFloatingEbook(true);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0D2A4B] font-sans flex flex-col">
      
      {/* CONTEÚDO PRINCIPAL (HERO + CTAs) */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto w-full md:mt-16">
        
        {/* FOTO E IDENTIFICAÇÃO - POP-OUT DEFINITIVO COM SOMBRA COMBINADA E ALINHAMENTO PELA BASE */}
        <div className="relative w-40 h-40 mx-auto mt-8 mb-8">
          
          {/* 1. O SELO CIRCULAR (FUNDO DO AVATAR) */}
          <div className="absolute inset-0 rounded-full bg-white border-4 border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3),0_0_40px_10px_rgba(46,134,193,0.35)] z-0"></div>

          {/* 2. A IMAGEM DO MÉDICO (POP-OUT) */}
          <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
            <Image
              src="/foto_perfil_dr.png" // O arquivo PNG sem fundo recortado
              alt="Dr. Mauro Reis"
              width={160} // Largura idêntica ao selo
              height={210} // Altura MAIOR que o selo para a cabeça sobrar pra cima
              className="object-cover rounded-b-full" 
              style={{ objectPosition: 'bottom', width: 'auto', height: 'auto' }}// Força o alinhamento da imagem a partir de baixo
            />
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight">
          Cuidado especializado de quem <span className="text-[#2E86C1]">entende a sua jornada.</span>
        </h1>
        
        <p className="text-gray-600 text-base md:text-lg mb-10 leading-relaxed px-4 max-w-2xl">
          Sou o Dr. Mauro Reis, médico e pai atípico. Minha missão é garantir a melhor qualidade de vida para o seu filho, unindo medicina e acolhimento humano.
        </p>

        {/* BOTÕES DE AÇÃO (CTAs) */}
        <div className="w-full max-w-md flex flex-col gap-4 px-2 mb-16 items-center">    
          {/* Botão Primário: Consulta */}
          <a
            href="https://wa.me/5521991687719?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20presencial%20com%20o%20Dr.%20Mauro%20Reis." 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between bg-[#2E86C1] hover:bg-[#1B4F72] text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all active:scale-95"
            onClick={(e) => {
              e.preventDefault();

              trackEvent('click_cta_whatsapp_presencial', {
                cta_location: 'hero',
                cta_type: 'whatsapp',
                consultation_type: 'presencial'
              });

              setTimeout(() => {
                window.open(
                  "https://wa.me/5521991687719?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20presencial%20com%20o%20Dr.%20Mauro%20Reis.",
                  "_blank"
                );
              }, 120);
            }}
          >
            <span className="flex items-center gap-3 text-left">
              <MessageCircle className="w-6 h-6 shrink-0" />
              <span>Agendar consulta presencial</span>
            </span>
            <ChevronRight className="w-5 h-5 opacity-70 shrink-0" />
          </a>

          {/* Botão Secundário: Teleconsulta (Ghost Button) */}
          <a
            href="https://wa.me/5521991687719?text=Olá!%20Gostaria%20de%20agendar%20uma%20teleconsulta%20com%20o%20Dr.%20Mauro%20Reis." 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between bg-[#f8f9fa] hover:bg-gray-400 text-[#2E86C1] border border-[#2E86C1] font-bold py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95"
            onClick={(e) => {
              e.preventDefault();

              trackEvent('click_cta_whatsapp_teleconsulta', {
                cta_location: 'hero',
                cta_type: 'whatsapp',
                consultation_type: 'teleconsulta'
              });

              setTimeout(() => {
                window.open(
                  "https://wa.me/5521991687719?text=Olá!%20Gostaria%20de%20agendar%20uma%20teleconsulta%20com%20o%20Dr.%20Mauro%20Reis.",
                  "_blank"
                );
              }, 120);
            }}
          >
            <span className="flex items-center gap-3 text-left">
              <Video className="w-6 h-6 shrink-0" />
              <span>Agendar teleconsulta</span>
            </span>
            <ChevronRight className="w-5 h-5 opacity-70 shrink-0" />
          </a>

          <div className="mt-12 text-[#2E86C1]/30 animate-bounce">
            <ChevronDown className="w-10 h-10" />
          </div>
        </div>
      </main>


      {/* SEÇÃO DO E-BOOK (PRE-FOOTER BANNER) */}
      {/* CAIXA EXTERNA: Fundo azul 100% da tela */}
      <div id="ebook" className="w-full bg-[#2E86C1] text-white mt-16 relative overflow-hidden shadow-2xl">
        
        {/* Efeito de brilho de fundo para dar charme */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 pointer-events-none"></div>

        {/* CAIXA INTERNA: max-w-4xl mx-auto limita a largura em telas gigantes, igual ao Hero */}
        <div className="max-w-4xl mx-auto px-6 py-12 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left relative z-10">
          
          {/* Textos e CTA */}
          <div className="flex-1 flex flex-col items-center md:items-start w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Navegando a Neurodiversidade</h2>
            <p className="text-white/90 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              Um manual prático e acolhedor sobre TEA e TDAH, escrito especialmente para mães e cuidadoras.
            </p>
            
            {/* Botão: w-full no celular, md:w-auto na tela média em diante */}
            <a 
              href="/acesso" 
              className="text-left inline-flex items-center gap-3 bg-white text-[#0D2A4B] hover:bg-gray-100 font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all active:scale-95 shadow-lg w-full md:w-auto justify-center"
              onClick={(e) => {
                e.preventDefault();

                trackEvent('click_cta_ebook', {
                  cta_location: 'ebook_section',
                  cta_type: 'ebook'
                });

                setTimeout(() => {
                  router.push('/acesso');
                }, 120);
              }}
            >
              <BookOpen className="w-6 h-6 text-[#2E86C1] shrink-0" />
              <span>Quero acessar meu e-book gratuito</span>
            </a>
          </div>

          {/* Capa do E-book Oficial */}
          {/* mb-12 no mobile para afastar do texto, zerado no md: em diante */}
          <div className="shrink-0 flex items-center justify-center mb-6 md:mb-0 cursor-pointer transition-all hover:scale-105" onClick={toggleCapa}>
            <Image
              src="/capa_ebook.webp"
              alt="Capa do E-book Navegando a Neurodiversidade (Clique para ampliar)"
              width={160}
              height={220}
              className="object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
              style={{ objectPosition: 'bottom', width: 'auto', height: 'auto' }}
            />
          </div>
          
        </div>
      </div>


      {/* FOOTER INSTITUCIONAL */}
      <footer className="w-full bg-[#0D2A4B] text-white py-10 mt-16 text-center">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-2">
          <p className="font-bold text-xl">Dr. Mauro Reis</p>
          <p className="text-[#A9CCE3] text-sm mb-2">CRM RJ 1152653</p>
          
          {/* BLOCO DE ENDEREÇO */}
          <div className="bg-[#1B4F72]/50 p-4 rounded-xl flex flex-col items-center gap-1 my-4 w-full max-w-sm border border-white/5">
            <span className="font-semibold text-white tracking-wide">Le Monde Office Life</span>
            <span className="text-gray-300 text-sm">Av. Dr. Mario Guimarães, 428 - Sala 915</span>
            <span className="text-gray-300 text-sm">Centro, Nova Iguaçu - RJ</span>
          </div>

          <div className="h-px w-full max-w-md bg-white/10 my-4"></div>
          
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Dr. Mauro Reis. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-gray-500 mt-1">
            Desenvolvido por M7 Partners
          </p>
        </div>
      </footer>




      {/* ============================================================================== */}
      {/* COMPONENTE DO LIGHTBOX (MODAL DA CAPA MAXIMIZADA) */}
      {/* Este componente só aparece quando isCapaOpen é TRUE */}
      {/* z-100 para garantir que ele fique acima de tudo, inclusive do header sticky */}
      {isCapaOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all animate-fadeIn" onClick={toggleCapa}>
          
          {/* Botão de Fechar no topo */}
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={toggleCapa}>
            <X className="w-8 h-8" />
          </button>

          {/* Imagem Maximizada (Zoom-in) */}
          <div className="relative w-full max-w-lg flex flex-col items-center justify-center gap-4 transition-transform animate-zoomInFast" onClick={(e) => e.stopPropagation()}>
            <Image
              src="/capa_ebook.webp"
              alt="Capa do E-book Maximizada"
              width={400} // Aumentado para zoom
              height={550}
              className="object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.15)] rounded-lg"
            />
            {/* Texto de apoio menor */}
            <span className="text-white/70 text-sm font-light mt-2">Clique fora para fechar</span>
          </div>
        </div>
      )}
      {/* ============================================================================== */}

      {showFloatingEbook && (
        <div className="fixed bottom-6 right-4 z-50">
          
          {/* Botão principal */}
          <button
            onClick={() => {
              trackEvent('click_cta_floating_ebook', {
                event_category: 'engagement',
                event_label: 'floating_ebook'
              });
            const section = document.getElementById('ebook');

            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            setTimeout(() => {
              setShowFloatingEbook(false);
            }, 300);
            }}
            className="bg-[#BFA929] text-[#f1f5f9] px-4 py-3 rounded-full shadow-[0_05px_10px_rgba(0,0,0,0.4)] flex items-center gap-2 hover:bg-[#f1f5f9] transition"          >
            E-book gratuito
          </button>

          {/* Botão de fechar */}
          <button
            onClick={() => setShowFloatingEbook(false)}
            className="absolute -top-2 -left-2 bg-white text-[#2E86C1] rounded-full w-5 h-5 text-xs shadow"
          >
            ×
          </button>

        </div>
     )}


    </div>
  );
}