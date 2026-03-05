'use server'

import { supabase } from '@/lib/supabase';

// Tipagem rigorosa para garantir que o Front-end mande os dados corretos
interface LogReadingParams {
  leadId: string;
  chapterId: number;
  timeInSeconds: number;
}

export async function logReadingTime({ leadId, chapterId, timeInSeconds }: LogReadingParams) {
  try {
    // 1. Validação de segurança (evita salvar lixo no banco)
    if (!leadId || leadId === 'anonimo' || timeInSeconds <= 0) {
      return { success: false, message: 'Dados inválidos ou tempo insuficiente.' };
    }

    // 2. Insere o log na tabela que acabamos de criar
    const { error } = await supabase
      .from('logs_leitura')
      .insert([{
        lead_id: leadId,
        chapter_id: chapterId,
        tempo_segundos: Math.round(timeInSeconds) // Garante que seja um número inteiro
      }]);

    if (error) {
      console.error('Erro ao salvar log de leitura no Supabase:', error);
      return { success: false, message: 'Erro de conexão com o banco.' };
    }

    // 3. Retorno de sucesso silencioso
    return { success: true };

  } catch (error) {
    console.error('Erro inesperado no tracking:', error);
    return { success: false, message: 'Erro interno no servidor.' };
  }
}