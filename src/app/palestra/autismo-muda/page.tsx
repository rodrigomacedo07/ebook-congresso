import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BotaoDownload from "@/components/palestra/BotaoDownload";
import LinkSobreMedico from "@/components/palestra/LinkSobreMedico";

const TITULO = "Autismo muda? | Dr. Mauro Reis";
const DESCRICAO =
  "O que influencia a evolução de uma criança no espectro. Apresentação gratuita do Dr. Mauro Reis sobre fatores de prognóstico no autismo, para famílias e profissionais.";

// O metadataBase do layout raiz ja aponta para www.drmauroreis.com.br.
//
// O openGraph precisa ser declarado inteiro: no Next o objeto do filho
// substitui o do pai, nao se funde com ele. Sem declarar a imagem aqui, a
// rota ficaria sem nenhuma, em vez de herdar a da LP.
export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: "/palestra/autismo-muda",
    siteName: "Dr. Mauro Reis",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "Autismo muda? - apresentação do Dr. Mauro Reis",
      },
    ],
    locale: "pt_BR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
    images: ["/og-image.png?v=2"],
  },
};

// Pagina publica da palestra. Sem cookie, sem formulario, sem Supabase e
// fora do matcher do middleware, por decisao: a palestra nao exige
// identificacao. Server Component, para poder exportar metadata sem um
// layout.tsx proprio, que quebraria a heranca dos scripts do layout raiz.
export default function PalestraAutismoMuda() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0D2A4B] font-sans flex flex-col">

      {/* TOPO — logo discreto, unica saida no alto */}
      <header className="w-full shrink-0">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/" aria-label="Ir para a página inicial do Dr. Mauro Reis" className="inline-block">
            <Image
              src="/logo.png"
              alt="Dr. Mauro Reis"
              width={40}
              height={40}
              className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </header>

      {/* BLOCO 1 — precisa caber na primeira tela do celular, sem rolagem */}
      <section className="flex flex-col items-center justify-center text-center px-6 pb-10 min-h-[calc(100svh-4.5rem)]">
        <div className="max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Autismo muda?
          </h1>

          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
            É a pergunta que quase toda mãe faz depois do diagnóstico. Esta apresentação reúne o que se sabe hoje sobre o que influencia a evolução de uma criança no espectro.
          </p>

          <BotaoDownload />

          <p className="text-sm text-gray-500 mt-4">
            PDF, 48 páginas. Download gratuito, sem cadastro.
          </p>
        </div>
      </section>

      {/* BLOCO 2 — o texto que sustenta a busca organica */}
      <section className="w-full px-6 py-12 md:py-16">
        <div className="max-w-2xl mx-auto flex flex-col gap-5 text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            Quando o diagnóstico chega, vem junto uma pergunta que poucos conseguem responder com clareza: e agora, o que esperar?
          </p>
          <p>
            Esta apresentação foi feita para ajudar nessa conversa. Ela percorre os fatores que a literatura aponta como determinantes na evolução de uma criança autista, entre eles o repertório inicial, a qualidade da intervenção, o ambiente familiar e o acesso a cuidado contínuo. Também trata de algo que raramente entra nos manuais e pesa muito na prática brasileira: o tempo que uma família espera até conseguir começar.
          </p>
          <p>
            Não há fórmula, e nenhum material honesto vai prometer uma. O que existe é informação confiável, e ela muda a forma como uma família decide os próximos passos. É isso que você encontra aqui.
          </p>
          <p className="text-gray-600">
            O conteúdo é voltado para famílias, educadores e profissionais que acompanham crianças no espectro.
          </p>
        </div>
      </section>

      {/* BLOCO 3 — quem assina, e a saida para a LP */}
      <section className="w-full px-6 pb-16">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-5">
          {/* Mesmo tratamento da foto na LP: selo circular com sombra
              combinada, e a imagem em pop-out alinhada pela base. Classes
              replicadas da LP, nao recriadas. */}
          <div className="relative w-40 h-40 mx-auto mt-8 mb-8">

            {/* 1. O SELO CIRCULAR (FUNDO DO AVATAR) */}
            <div className="absolute inset-0 rounded-full bg-white border-4 border-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3),0_0_40px_10px_rgba(46,134,193,0.35)] z-0"></div>

            {/* 2. A IMAGEM DO MÉDICO (POP-OUT) */}
            <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
              <Image
                src="/foto_perfil_dr.png"
                alt="Dr. Mauro Reis"
                width={160}
                height={210}
                className="object-cover rounded-b-full"
                style={{ objectPosition: 'bottom', width: 'auto', height: 'auto' }}
              />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold">
            Sobre o Dr. Mauro Reis
          </h2>

          <div className="flex flex-col gap-4 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
              Sou médico e pai atípico, então conheço os dois lados dessa conversa: o de quem explica o diagnóstico e o de quem o recebe. Sou palestrante e atendo em Nova Iguaçu e por telemedicina em todo o Brasil.
            </p>
          </div>

          <p className="text-sm text-gray-500">CRM 52 0115265-3</p>

          <LinkSobreMedico />
        </div>
      </section>

      {/* RODAPE — o mesmo da LP */}
      <footer className="w-full bg-[#0D2A4B] text-white py-10 mt-auto text-center">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-2">
          <p className="font-bold text-xl">Dr. Mauro Reis</p>
          <p className="text-[#A9CCE3] text-sm mb-2">CRM 52 0115265-3</p>

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

    </div>
  );
}
