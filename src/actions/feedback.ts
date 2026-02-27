'use server'

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function submitFeedback(nota: number, tags: string[], observacao: string) {
  // 1. Recupera o ID do lead silenciosamente através do Cookie
  // AWAIT adicionado aqui
  const cookieStore = await cookies();
  const leadId = cookieStore.get('ebook_access_granted')?.value;

  // Se por algum motivo bizarro o cookie sumiu, barramos a ação
  if (!leadId) {
    return { success: false, message: 'Sessão inválida. Não foi possível identificar o usuário.' };
  }

  // 2. Salva a avaliação na tabela que desenhamos no banco
  const { error } = await supabase
    .from('feedbacks_ebook')
    .insert([{
      lead_id: leadId,
      nota: nota,
      tags: tags,
      observacao: observacao
    }]);

  if (error) {
    console.error('Erro ao salvar feedback:', error);
    return { success: false, message: 'Erro ao enviar avaliação.' };
  }

  return { success: true };
}