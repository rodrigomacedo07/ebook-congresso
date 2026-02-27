'use server'

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function captureLead(formData: FormData) {
  // 1. Extrai os dados do formulário
  const nome = formData.get('nome') as string;
  const email = formData.get('email') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const perfil = formData.get('perfil') as string;

  // 2. Tenta inserir no banco de dados (Tabela que criamos no SQL)
  const { data, error } = await supabase
    .from('leads_congresso')
    .insert([{ nome, email, whatsapp, perfil }])
    .select('id')
    .single();

  if (error) {
    console.error('Erro ao salvar lead:', error);
    return { success: false, message: 'Erro ao processar seu cadastro. Tente novamente.' };
  }

// 3. Sucesso! Gera o Cookie seguro (O "Pedágio")
  // AWAIT adicionado aqui para compatibilidade com Next.js 15+
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'ebook_access_granted',
    value: data.id,
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, 
  });

  return { success: true };
}