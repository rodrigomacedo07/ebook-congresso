import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasAccess = request.cookies.has('ebook_access_granted');

  // Server Action faz POST para a URL da propria pagina. Redirecionar esse
  // POST faz o navegador refazer a requisicao na rota de destino, que
  // devolve HTML em vez da resposta do action: o cliente fica esperando
  // para sempre e o botao congela sem mensagem.
  //
  // Estas regras existem para controlar NAVEGACAO. Navegacao e prefetch do
  // Next sao GET, entao excluir POST preserva o comportamento inteiro.
  const ehNavegacao = request.method !== 'POST';

  // REGRA 1: Proteção do e-book
  // O portao protege a LEITURA do conteudo, nao a gravacao. logReadingTime e
  // o feedback ja exigem lead id valido, e logReadingTime roda em background
  // durante a leitura: se o cookie expirar no meio, redirecionar o POST
  // engole o registro em silencio e corrompe o dado sem ninguem perceber.
  if (path.startsWith('/ebook') && !hasAccess && ehNavegacao) {
    const url = new URL('/acesso', request.url);
    url.searchParams.set('redirect', 'ebook');
    return NextResponse.redirect(url);
  }

  // REGRA 2: Fricção zero — quem já tem acesso não vê o formulário de novo
  if (path === '/acesso' && hasAccess && ehNavegacao) {
    return NextResponse.redirect(new URL('/ebook', request.url));
  }

  // RAIZ: sempre segue. Nunca redireciona.
  // Manter a Regra 2 disparando em '/' cuspiria todo lead com cookie
  // direto no e-book, sem nunca ver o hub.
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/acesso', '/ebook/:path*'],
}
