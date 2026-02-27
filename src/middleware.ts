import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Verifica se o usuário está tentando acessar o e-book
  if (path.startsWith('/ebook')) {
    // Procura o nosso "pedágio" (o cookie que criamos na etapa de captura)
    const hasAccess = request.cookies.has('ebook_access_granted');

    if (!hasAccess) {
      // Sem cookie = Sem acesso. Redireciona para o formulário na Home (/)
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Se tiver o cookie (ou se estiver acessando a Home), deixa passar
  return NextResponse.next();
}

// Otimização: O middleware só vai rodar na rota do e-book
export const config = {
  matcher: ['/ebook/:path*'],
}