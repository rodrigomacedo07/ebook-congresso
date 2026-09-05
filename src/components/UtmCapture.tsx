'use client'

import { useEffect } from 'react';

/**
 * Captura as UTMs da URL de entrada e guarda em sessionStorage.
 *
 * Mora no layout, e nao numa pagina: a pessoa chega com UTM na raiz e so
 * depois navega ate /acesso, quando window.location.search ja nao tem mais
 * nada. Montado no layout, funciona em qualquer porta de entrada, inclusive
 * um QR que aponte direto para /acesso.
 *
 * O formulario le esses valores do sessionStorage no handleSubmit.
 */
export default function UtmCapture() {
  useEffect(() => {
    console.log('[DEBUG] URL COMPLETA:', window.location.href);
    console.log('[DEBUG] SEARCH:', window.location.search);

    const params = new URLSearchParams(window.location.search);

    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmContent = params.get('utm_content');

    if (utmSource || utmMedium || utmCampaign) {
      console.log('[DEBUG-UTM] Capturado da URL:', {
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent
      });
    }

    // 🔥 SALVA APENAS SE NÃO EXISTIR (FIRST TOUCH)
    if (!sessionStorage.getItem('utm_source') && utmSource) {
      sessionStorage.setItem('utm_source', utmSource);
      sessionStorage.setItem('utm_medium', utmMedium || '');
      sessionStorage.setItem('utm_campaign', utmCampaign || '');
      sessionStorage.setItem('utm_content', utmContent || '');

      console.log('[DEBUG-UTM] UTM salva (first touch)');
    }
  }, []);

  return null;
}
