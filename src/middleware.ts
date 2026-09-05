import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasAccess = request.cookies.has('ebook_access_granted');

  // REGRA 1: Proteção do e-book
  if (path.startsWith('/ebook') && !hasAccess) {
    const url = new URL('/acesso', request.url);
    url.searchParams.set('redirect', 'ebook');
    return NextResponse.redirect(url);
  }

  // REGRA 2: Fricção zero — quem já tem acesso não vê o formulário de novo
  if (path === '/acesso' && hasAccess) {
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
