'use server'

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function captureLead(formData: FormData) {
  const rawName = formData.get('nome') as string || '';
  const rawEmail = formData.get('email') as string || '';
  const rawWhatsapp = formData.get('whatsapp') as string || '';
  const perfil = formData.get('perfil') as string || '';

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

  // 3. Tenta inserir no banco de dados com os dados LIMPOS e VALIDADOS
  const { data, error } = await supabase
    .from('leads_congresso')
    .insert([{ 
      nome: cleanName, 
      email: cleanEmail, 
      whatsapp: cleanWhatsapp, 
      perfil: perfil 
    }])
    .select('id')
    .single();

  if (error) {
    console.error('Erro ao salvar lead:', error);
    return { success: false, message: 'Erro ao processar seu cadastro. Tente novamente ou use outro e-mail.' };
  }

  // 4. Sucesso! Gera o Cookie seguro
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'ebook_access_granted',
    value: data.id,
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, 
  });

  return { 
    success: true, 
    lead_id: data.id, 
    perfil: perfil 
  };
}