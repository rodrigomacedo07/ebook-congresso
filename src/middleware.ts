import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Procura o nosso "pedágio" (o cookie de acesso)
  const hasAccess = request.cookies.has('ebook_access_granted');

  // REGRA 1: Proteção do Produto (Sem cookie na rota do e-book)
  if (path.startsWith('/ebook')) {
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // REGRA 2: Fricção Zero (Com cookie na rota da Landing Page)
  if (path === '/') {
    if (hasAccess) {
      return NextResponse.redirect(new URL('/ebook', request.url));
    }
  }

  // Se tudo estiver nos conformes, deixa o fluxo seguir naturalmente
  return NextResponse.next();
}

// Otimização: O middleware agora roda nas duas rotas críticas
export const config = {
  matcher: ['/', '/ebook/:path*'],
}