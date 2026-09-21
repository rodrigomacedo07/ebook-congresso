'use client'

import { Download } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// Componente cliente so por causa do onClick. A pagina continua Server
// Component para poder exportar metadata sem layout.tsx proprio.
//
// Sem preventDefault e sem setTimeout, ao contrario dos CTAs da LP:
// download nao e navegacao, e interceptar o clique cancelaria o proprio
// download. O trackEvent roda sincrono no onClick, antes do navegador
// comecar a baixar.
export default function BotaoDownload() {
  return (
    <a
      href="/autismo-muda.pdf"
      download="Autismo-Muda-Dr-Mauro-Reis.pdf"
      onClick={() => {
        trackEvent('click_cta_download_palestra', {
          cta_location: 'palestra_hero',
          cta_type: 'download',
          material: 'autismo-muda',
        });
      }}
      className="w-full max-w-md inline-flex items-center justify-center gap-3 bg-[#2E86C1] hover:bg-[#1B4F72] text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all active:scale-95"
    >
      <Download className="w-6 h-6 shrink-0" />
      <span>Baixar a apresentação</span>
    </a>
  );
}
