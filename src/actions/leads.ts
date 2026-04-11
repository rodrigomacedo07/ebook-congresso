'use server'

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function captureLead(formData: FormData) {
  console.log('[DEBUG-ACTION] captureLead START');

  

  const rawName = formData.get('nome') as string || '';
  const rawEmail = formData.get('email') as string || '';
  const rawWhatsapp = formData.get('whatsapp') as string || '';
  const perfil = formData.get('perfil') as string || '';

    // 🔥 NOVO: UTMs
  const utm_source = formData.get('utm_source') as string || '';
  const utm_medium = formData.get('utm_medium') as string || '';
  const utm_campaign = formData.get('utm_campaign') as string || '';

  console.log('[DEBUG-ACTION] UTMs recebidas:', {
    utm_source,
    utm_medium,
    utm_campaign
  });

  // 1. LIMPEZA AVANÇADA (Sanitização)
  // Remove espaços duplos no meio do nome e aplica formatação (Ex: " jOãO   sIlVa " -> "João Silva")
  const cleanName = rawName
    .trim()
    .replace(/\s+/g, ' ') // Troca múltiplos espaços por apenas um
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()); // Deixa a primeira letra de cada palavra maiúscula

  // Força minúsculo e remove espaços nas pontas do e-mail
  const cleanEmail = rawEmail.toLowerCase().trim(); 

  // Arranca TUDO que não for número do WhatsApp
  const cleanWhatsapp = rawWhatsapp.replace(/\D/g, ''); 

  // 2. REGRAS DE NEGÓCIO (Validação no Servidor)
  if (cleanName.split(' ').length < 2) {
    return { success: false, message: 'Por favor, insira nome e sobrenome.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: 'Por favor, insira um e-mail válido.' };
  }

  if (cleanWhatsapp.length !== 11) {
    return { success: false, message: 'WhatsApp inválido. Certifique-se de incluir o DDD e o 9 (11 dígitos).' };
  }

  if (!perfil) {
    return { success: false, message: 'Por favor, selecione seu perfil.' };
  }

  console.log('[DEBUG-ACTION] captureLead sanitized:', {
    nome: cleanName,
    email: cleanEmail,
    whatsapp: cleanWhatsapp,
    perfil
  });


// 3. UPSERT REAL (ATÔMICO COM UNIQUE)
console.log('[DEBUG-ACTION] Enviando para Supabase...');
const { data, error } = await supabase
  .from('leads_congresso')
  .upsert([{
    nome: cleanName,
    email: cleanEmail,
    whatsapp: cleanWhatsapp,
    perfil: perfil,
    utm_source: utm_source && { utm_source },
    utm_medium: utm_medium && { utm_medium },
    utm_campaign: utm_campaign && { utm_campaign }
  }], {
    onConflict: 'email'
  })
  .select('id')
  .maybeSingle();

if (error || !data) {
   console.error('[DEBUG-ACTION] captureLead ERROR FULL:', JSON.stringify(error, null, 2));
  console.error('Erro no upsert do lead:', error);
  return { success: false, message: 'Erro ao processar seu cadastro.' };
}
console.log('[DEBUG-ACTION] Supabase response:', { data, error });
const leadId = data.id;

  // 4. Sucesso! Gera o Cookie seguro
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'ebook_access_granted',
    value: leadId,
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365, 
  });

  // ---> NOSSO ESPIÃO DA ACTION <---
  console.log(`[DEBUG-ACTION] Servidor ordenou a gravação do cookie para o Lead: ${cleanEmail}`);
 
  return { 
    success: true, 
    lead_id: leadId, 
    perfil: perfil 
  };
}

export async function verifyLeadByEmail(email: string) {
  const cleanEmail = email.toLowerCase().trim();

  const { data, error } = await supabase
    .from('leads_congresso')
    .select('id')
    .eq('email', cleanEmail)
    .maybeSingle();

  if (error) {
    console.error('Erro ao verificar e-mail:', error);
    return { success: false };
  }

  if (!data) {
    return { success: false };
  }

  // recria cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'ebook_access_granted',
    value: data.id,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });

  return { success: true };
}

export async function recoverAccessByEmail(formData: FormData) {
  const rawEmail = (formData.get('email') as string) || '';

  console.log('[DEBUG-ACTION] recoverAccessByEmail - rawEmail:', rawEmail);

  const cleanEmail = rawEmail.toLowerCase().trim();

  console.log('[DEBUG-ACTION] recoverAccessByEmail - cleanEmail:', cleanEmail);

  // Validação básica
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: 'E-mail inválido.' };
  }

  // 🔍 Busca no banco
  const { data, error } = await supabase
    .from('leads_congresso')
    .select('id, perfil, created_at')
    .eq('email', cleanEmail)
    .order('created_at', { ascending: false }) // 👈 pega o mais recente
    .limit(1)
    .maybeSingle();

    console.log('[DEBUG-ACTION] recoverAccessByEmail - supabase response:', {
      data,
      error
    });

  if (error) {

    console.error('[DEBUG-ACTION] recoverAccessByEmail - ERROR FULL:', JSON.stringify(error, null, 2));

    console.error('Erro ao buscar lead:', error);
    return { 
      success: false,
      debug: error.message // 👈 adiciona isso TEMPORARIAMENTE
    };
    
  }

  // ❌ NÃO ENCONTRADO
  if (!data) {

    console.log('[DEBUG-ACTION] recoverAccessByEmail - usuário NÃO encontrado');

    return { success: false, notFound: true };
  }

  // ✅ ENCONTRADO → recria sessão
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'ebook_access_granted',
    value: data.id,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });

  console.log('[DEBUG-ACTION] recoverAccessByEmail - usuário encontrado, recriando sessão:', cleanEmail);

  return {
    success: true,
    lead_id: data.id,
    perfil: data.perfil,
  };
}