import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasAccess = request.cookies.has('ebook_access_granted');
  const userAgent = request.headers.get('user-agent') || 'desconhecido';

  // ---> NOSSO ESPIÃO SILENCIOSO (Aparece só na Vercel) <---
  // Filtramos para logar apenas as páginas principais, ignorando imagens e scripts
  if (path === '/' || path.startsWith('/ebook')) {
    console.log(`[DEBUG-AUTH] URL: ${path} | Cookie Existe? ${hasAccess} | Navegador: ${userAgent}`);
  }

  // REGRA 1: Proteção do Produto (com fallback permitido)
  if (path.startsWith('/ebook')) {
    if (!hasAccess) {
      console.log(`[DEBUG-BLOCK] Sem cookie. Redirecionando para /?redirect=ebook`);
      const url = new URL('/', request.url);
      url.searchParams.set('redirect', 'ebook');
      return NextResponse.redirect(url);
    }
  }

  // REGRA 2: Fricção Zero
  if (path === '/') {
    if (hasAccess) {
      return NextResponse.redirect(new URL('/ebook', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/ebook/:path*'],
}