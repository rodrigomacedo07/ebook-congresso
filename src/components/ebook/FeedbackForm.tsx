'use client'

import { useState } from 'react';
import { Star, Loader2, CheckCircle } from 'lucide-react';
import { submitFeedback } from '@/actions/feedback';

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [observacao, setObservacao] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const tagsDisponiveis = ['Conteúdo', 'Profundidade', 'Prática'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    setErrorMsg('');

    // Chama a Server Action do nosso backend
    const result = await submitFeedback(rating, selectedTags, observacao);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrorMsg(result.message || 'Erro ao enviar avaliação.');
      setIsSubmitting(false);
    }
  };

  // Estado de Sucesso (DoD atingido)
  if (isSubmitted) {
    return (
      <div className="mt-12 bg-[#EBF5FB] p-6 rounded-2xl text-center border border-[#A9CCE3] animate-in zoom-in duration-300">
        <CheckCircle className="w-12 h-12 text-[#2E86C1] mx-auto mb-3" />
        <h3 className="text-xl font-bold text-[#0D2A4B] mb-2">Muito obrigado!</h3>
        <p className="text-gray-700 text-sm">Seu feedback é fundamental para continuarmos criando conteúdos de alto valor.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-[#0D2A4B]">Como você avalia este material?</h3>
        <p className="text-sm text-gray-500 mt-1">Sua opinião nos ajuda a melhorar.</p>
      </div>

      {/* Passo 1: Avaliação em Estrelas */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none transition-transform active:scale-90"
          >
            <Star 
              className={`w-10 h-10 transition-colors ${
                (hoveredRating || rating) >= star 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
              }`} 
            />
          </button>
        ))}
      </div>

      {/* Passo 2: Revelação Progressiva (só aparece se a nota for dada) */}
      {rating > 0 && (
        <div className="animate-in slide-in-from-top-4 fade-in duration-300 space-y-5 border-t border-gray-100 pt-5">
          
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
              O que mais chamou sua atenção? (opcional)
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {tagsDisponiveis.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-[#2E86C1] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Sugestões para os próximos temas (opcional)
            </p>
            <textarea
              rows={3}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Deixe seu comentário aqui..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E86C1] focus:border-transparent outline-none transition-all text-gray-900 resize-none text-sm"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#0D2A4B] hover:bg-[#153a66] text-white font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...</>
            ) : (
              'Enviar avaliação'
            )}
          </button>
        </div>
      )}
    </div>
  );
}