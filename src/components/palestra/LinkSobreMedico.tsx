'use client'

import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

// Saida da folha para a LP. Aqui ha navegacao, entao segue o mesmo padrao
// dos CTAs da LP: preventDefault, evento, e setTimeout de 120ms antes de
// navegar, para o evento sair antes.
export default function LinkSobreMedico() {
  const router = useRouter();

  return (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();

        trackEvent('click_cta_sobre_medico', {
          cta_location: 'palestra_sobre',
          cta_type: 'interno',
        });

        setTimeout(() => {
          router.push('/');
        }, 120);
      }}
      className="inline-flex items-center justify-center text-[#2E86C1] hover:text-[#1B4F72] font-bold underline underline-offset-4 transition-colors"
    >
      Conheça o trabalho do Dr. Mauro Reis
    </a>
  );
}
