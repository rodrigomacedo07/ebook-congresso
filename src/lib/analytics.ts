// Helper de eventos do GA4, compartilhado entre as paginas.
//
// Vivia dentro de src/app/page.tsx. Foi extraido quando a pagina da palestra
// passou a precisar dele. A funcao e identica a que estava la: qualquer
// mudanca de comportamento aqui altera os eventos da LP, que ja estao em
// producao e sao a conversao do produto principal.
//
// window.gtag e declarado em src/types/global.d.ts.
export const trackEvent = (name: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    window.gtag?.('event', name, params);
  }
};
