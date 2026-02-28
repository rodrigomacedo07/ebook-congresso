'use client'

import { useState, useEffect } from 'react';
import { Menu, ChevronLeft, ChevronRight, CheckCircle2, X, Instagram } from 'lucide-react';
import FeedbackForm from '@/components/ebook/FeedbackForm';
import Image from 'next/image';

export default function EbookPage() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalChapters = 8; // 0=Intro, 1-6=Capítulos, 7=Conclusão, 8=Apêndices

  const chapterTitles = [
    "Introdução", "1. Decodificando o Cérebro", "2. O Mapa do Cuidado", 
    "3. A Caixa de Ferramentas", "4. Navegando a Escola", "5. Cuidando de Quem Cuida", 
    "6. Horizontes em Expansão", "Conclusão", "Apêndices"
  ];

  // Rola a tela para o topo sempre que mudar de capítulo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentChapter]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0D2A4B] font-sans pb-24">
      {/* Header Fixo Mobile */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="flex justify-between items-center p-4">
          
          {/* Agrupamento da Logo + Título */}
          <div className="flex items-center gap-3 overflow-hidden">
            <Image 
              src="/logo.png"
              alt="Logo Dr. Mauro Reis" 
              width={36} 
              height={36} 
              className="shrink-0 object-contain"
            />
            <h1 className="text-lg font-bold text-[#0D2A4B] truncate">
              Navegando a Neurodiversidade
            </h1>
          </div>

          <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md shrink-0">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {/* Barra de Progresso */}
        <div className="w-full bg-gray-200 h-1.5">
          <div 
            className="bg-[#2E86C1] h-1.5 transition-all duration-300" 
            style={{ width: `${(currentChapter / totalChapters) * 100}%` }}
          ></div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="p-5 md:p-10 max-w-3xl mx-auto">
        
       {/* CAPÍTULO 0: PREÂMBULO E INTRODUÇÃO */}
        {currentChapter === 0 && (
          <section id="introducao" className="animate-in fade-in duration-500">
            
            {/* ========================================== */}
            {/* 1. PREÂMBULO (Boas-vindas e Alinhamento)   */}
            {/* ========================================== */}
            
            {/* Card de Boas-Vindas (Famílias) */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-[#EBF5FB] p-6 md:p-8 rounded-2xl border border-[#2E86C1]/20 shadow-sm mb-6">
              <Image 
                src="/miniatura_ebook_dr.png"
                alt="Dr. Mauro Reis" 
                width={100} 
                height={100} 
                className="rounded-full shadow-md shrink-0 border-4 border-white object-cover"
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#0D2A4B] mb-2">Bem-vindo(a)</h3>
                <p className="text-gray-700 leading-relaxed italic">
                  "Diariamente no meu consultório, recebo famílias repletas de amor, mas também de dúvidas, medos e exaustão. Escrevi este material para ser o seu porto seguro e um mapa claro nos momentos de incerteza."
                </p>
                <span className="block mt-4 font-bold text-[#2E86C1]">— Dr. Mauro Reis</span>
              </div>
            </div>
            
            {/* Aviso para Profissionais (B2B2C) */}
            {/* Nota: Aumentei a margem inferior (mb-12) para criar um bom respiro antes do título */}
            <div className="bg-[#F8F9F9] border-l-4 border-[#8E44AD] p-5 md:p-6 rounded-r-xl shadow-sm mb-12">
              <h3 className="font-bold text-[#4A235A] text-lg mb-2 flex items-center gap-2">
                🤝 Uma nota aos colegas de profissão
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Se você é profissional de saúde, terapeuta ou educador, este material também é seu. Ele foi escrito com linguagem acessível para servir como uma <strong>ferramenta de psicoeducação na sua prática diária</strong>. Sinta-se à vontade para utilizar estas estratégias no seu espaço de atuação e compartilhar este guia com as famílias que você apoia.
              </p>
            </div>


            {/* ========================================== */}
            {/* 2. INÍCIO OFICIAL DO CONTEÚDO              */}
            {/* ========================================== */}

            {/* Cabeçalho */}
            <div className="flex items-start mb-8">
              <div className="w-1.5 h-12 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Introdução</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">Uma nova jornada começa aqui</h2>
              </div>
            </div>
            
            {/* Frase de Destaque */}
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-8 bg-white p-4 rounded-r-lg shadow-sm">
              "Ao abraçar a neurodiversidade, passamos de um estado de luto por expectativas quebradas para um de curiosidade e esperança por um caminho diferente."
            </blockquote>
            
            {/* Corpo do Texto Revisado */}
            <div className="space-y-5 text-gray-700 leading-relaxed text-lg mb-10">
              <p>Receber o diagnóstico de Transtorno do Espectro Autista (TEA) ou Transtorno de Déficit de Atenção e Hiperatividade (TDAH) de um filho é um momento que redefine a jornada de uma família. É um ponto de inflexão, frequentemente acompanhado por uma avalanche de emoções: o alívio por finalmente ter um nome para os desafios, a confusão diante de um vocabulário médico complexo, o medo do desconhecido e um sentimento de luto por um futuro idealizado de outra forma. A sua jornada, com todas as suas incertezas e esperanças, é válida e compreendida.</p>
              
              <p>O propósito deste material é servir como um mapa confiável. A filosofia central que norteará cada página é a da <strong>neurodiversidade</strong>. Em vez de enxergar o TEA e o TDAH unicamente como um conjunto de déficits a serem corrigidos, somos encorajados a compreender as diferentes formas de processar informações, interagir e aprender, reconhecendo tanto os desafios quanto as potencialidades únicas da criança.</p>
              
              <p>Muitas famílias sentem-se paralisadas não apenas pela falta de informação, mas pelo peso emocional da situação. Por isso, o primeiro passo desta jornada não é sobrecarregar você com dados clínicos, mas reorientar a sua perspectiva para uma visão de potencial e desenvolvimento.</p>
              
              <p>Ao longo dos próximos capítulos, este guia combinará os conhecimentos mais atuais da neurologia com estratégias práticas e um profundo entendimento da realidade cotidiana das famílias. A estrutura foi pensada para acompanhá-lo passo a passo: desde a decodificação do funcionamento do cérebro do seu filho, passando pelo manejo dos desafios diários e pela parceria com a escola, até o cuidado com o seu próprio bem-estar.</p>
            </div>

            {/* Dica de UX (Estratégias de Leitura) */}
            <div className="bg-white p-6 md:p-8 rounded-xl border-l-4 border-[#2E86C1] shadow-sm">
              <h3 className="font-bold text-[#0D2A4B] text-lg mb-3 flex items-center gap-2">
                💡 Como usar este guia?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Este material foi desenhado para ser uma ferramenta prática no seu dia a dia. Sinta-se à vontade para consumi-lo da maneira que melhor se adaptar à sua rotina. Minhas sugestões são:
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#2E86C1] font-bold mt-0.5">•</span>
                  <span><strong>Leia no seu ritmo:</strong> Dividir a leitura, consumindo um pouco a cada dia, é um excelente caminho para absorver as estratégias e aplicá-las com calma.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2E86C1] font-bold mt-0.5">•</span>
                  <span><strong>Consulte sempre que precisar:</strong> Mantenha a aba aberta no celular ou salve o link para revisar as orientações antes de ir à escola, em momentos de crise ou quando precisar de um mapa claro para seguir.</span>
                </li>
              </ul>
            </div>
          </section>
        )}

        {/* CAPÍTULO 1 */}
        {currentChapter === 1 && (
          <section id="capitulo1" className="animate-in fade-in duration-500">
            <div className="flex items-start mb-8">
              <div className="w-1.5 h-16 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Capítulo 1</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">Decodificando o cérebro: um olhar por dentro do Autismo e do TDAH</h2>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-6 bg-white p-4 rounded-r-lg shadow-sm">
              "Um desenvolvimento 'atípico' ou 'divergente' não significa que a construção deu errado, mas que foi utilizado um mapa diferente."
            </blockquote>
            
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>Para oferecer o melhor apoio, o primeiro passo é compreender. Este capítulo busca desmistificar o que acontece no cérebro de uma criança com TEA e TDAH, traduzindo conceitos neurológicos complexos em uma linguagem acessível e utilizando analogias que facilitem o entendimento. O objetivo é substituir o medo do desconhecido pela clareza, removendo o fardo da culpa e empoderando os cuidadores com conhecimento.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">1.1 O que é Neurodesenvolvimento?</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>O cérebro humano é a estrutura mais complexa que conhecemos, e seu desenvolvimento desde a gestação até a vida adulta é um processo extraordinário. O neurodesenvolvimento refere-se à forma como o cérebro cresce, se organiza e cria suas redes de comunicação. Podemos imaginar esse processo como a construção de uma vasta cidade. Em um desenvolvimento considerado "típico", as estradas, pontes e sistemas de comunicação são construídos seguindo um mapa geral, resultando em uma cidade que funciona de maneira previsível para a maioria de seus habitantes.</p>
              <p>Um desenvolvimento "atípico" ou "divergente", como ocorre no TEA e no TDAH, não significa que a construção deu errado, mas que foi utilizado um mapa diferente. As conexões entre os bairros (áreas cerebrais) podem ser diferentes, algumas estradas podem ser super-rápidas (hiperconectividade) enquanto outras são mais sinuosas (hipoconectividade). O resultado é uma cidade com uma lógica de funcionamento única, que pode ser incrivelmente eficiente para certas tarefas, mas que enfrenta desafios em outras. Compreender essa "arquitetura" cerebral distinta é fundamental para entender os comportamentos e as necessidades da criança.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">1.2 O Cérebro com TDAH</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>Muitos pais de crianças com TDAH se perguntam por que tarefas aparentemente simples, como prestar atenção na aula ou controlar um impulso, são tão difíceis. A neurologia nos oferece respostas claras. O cérebro de uma pessoa com TDAH pode ser comparado a uma rede de internet com "fios congestionados ou bloqueados". Mensagens importantes, especialmente aquelas relacionadas à atenção, planejamento e controle de impulsos, não são transmitidas com a mesma eficiência que em um cérebro neurotípico.</p>
              <p>Esse "congestionamento" está frequentemente ligado ao funcionamento de neurotransmissores, que são os mensageiros químicos do cérebro. No TDAH, há um desequilíbrio, principalmente na dopamina e na noradrenalina, que são cruciais para a regulação da atenção, motivação e funções executivas. Isso explica por que uma criança com TDAH pode ter dificuldade em focar em uma tarefa que considera monótona, mas consegue se hiperfocar por horas em um videogame que lhe proporciona estímulos constantes e recompensas imediatas. Não se trata de falta de vontade ou de "má criação", mas de uma diferença neurobiológica real no sistema de regulação e recompensa do cérebro. Pesquisas com exames de ressonância magnética também mostram que algumas áreas do cérebro, particularmente aquelas no córtex pré-frontal responsáveis pelo controle executivo, podem ser um pouco menores ou demorar mais para amadurecer em indivíduos com TDAH.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">1.3 O Cérebro no espectro autista (TEA)</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>O cérebro de uma pessoa no espectro autista processa o mundo de uma maneira fundamentalmente diferente. Pesquisas sugerem que o TEA está associado a padrões atípicos de conectividade cerebral. Em alguns casos, pode haver uma superabundância de conexões locais, de curta distância, e uma deficiência nas conexões de longa distância, que integram informações de diferentes áreas do cérebro.</p>
              <p>Essa particularidade na "fiação" cerebral pode explicar muitas das características centrais do autismo. A dificuldade na interação social, por exemplo, não decorre de uma falta de desejo de se conectar, mas de uma diferença na "linguagem" neurológica. O cérebro autista pode ter dificuldade em processar simultaneamente a complexidade das pistas sociais – expressões faciais, tom de voz, linguagem corporal – que para um cérebro neurotípico é algo intuitivo. A preferência por rotinas e a resistência a mudanças podem ser entendidas como uma estratégia do cérebro para criar um ambiente previsível e reduzir a sobrecarga de processar um mundo que parece caótico e imprevisível. Da mesma forma, as sensibilidades sensoriais (a uma luz, som ou textura) ocorrem porque o cérebro pode não filtrar os estímulos da mesma forma, levando a uma experiência sensorial muito mais intensa e, por vezes, avassaladora.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">1.4 Juntos, mas diferentes: A comorbidade de TEA e TDAH</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-6">
              <p>É muito comum que uma criança receba o diagnóstico tanto de TEA quanto de TDAH. De fato, estima-se que até 70% das pessoas com autismo possam ter um transtorno mental associado, e o TDAH é uma das comorbidades mais frequentes. Essa sobreposição pode gerar confusão, pois alguns sintomas parecem semelhantes à primeira vista. Por exemplo, a inquietação de uma criança com TDAH pode ser confundida com a necessidade de movimento (stimming) de uma criança autista para se autorregular.</p>
              <p>No entanto, as razões por trás dos comportamentos são distintas. A criança com TDAH pode ter dificuldade em seguir uma conversa porque sua atenção é constantemente desviada, sendo descrita como alguém que "vive com a cabeça nas nuvens". Já a criança autista pode ter dificuldade na mesma conversa porque não compreende as nuances da comunicação não-verbal ou porque o tema não se alinha com seus interesses restritos. Quando as duas condições coexistem, os desafios podem se intensificar. A impulsividade do TDAH pode exacerbar as dificuldades sociais do TEA, enquanto a necessidade de rotina do autismo pode entrar em conflito com a desorganização característica do TDAH. Compreender essa interação é crucial para desenvolver estratégias de apoio que abordem as necessidades específicas da criança de forma integrada.</p>
              <p>Para auxiliar na diferenciação e compreensão, a tabela a seguir resume as características centrais de cada transtorno. Para os pais, essa clareza é fundamental, pois transforma a confusão em conhecimento, permitindo-lhes identificar com mais precisão as necessidades de seus filhos e buscar as intervenções corretas. Funciona como uma ferramenta de referência rápida que traduz a terminologia clínica em comportamentos observáveis no dia a dia, fortalecendo a confiança dos cuidadores em sua capacidade de entender e apoiar.</p>
            </div>

            {/* UX Otimizada: Tabelas viram Cards no Mobile */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#0D2A4B] mb-3 text-lg border-b pb-2">Núcleo do transtorno</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">Transtorno do Espectro Autista (TEA)</span>
                    <p className="text-sm mt-1 text-gray-700">Dificuldades na comunicação e interação social; Padrões restritos e repetitivos de comportamento.</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TDAH</span>
                    <p className="text-sm mt-1 text-gray-700">Padrões persistentes de desatenção, hiperatividade e impulsividade.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#0D2A4B] mb-3 text-lg border-b pb-2">Interação social</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TEA</span>
                    <p className="text-sm mt-1 text-gray-700">Dificuldade em <em>saber como</em> interagir; Falta de interesse inato em certas pistas sociais; Entendimento diferente do mundo.</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TDAH</span>
                    <p className="text-sm mt-1 text-gray-700">Dificuldade em <em>manter a atenção</em> durante a interação; Impulsividade pode levar à inadequação social.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#0D2A4B] mb-3 text-lg border-b pb-2">Comunicação</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TEA</span>
                    <p className="text-sm mt-1 text-gray-700">Atrasos na linguagem, ecolalia, dificuldade com pragmática e comunicação não-verbal.</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TDAH</span>
                    <p className="text-sm mt-1 text-gray-700">Pode interromper os outros, falar excessivamente, dificuldade em seguir o fluxo da conversa devido à desatenção.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#0D2A4B] mb-3 text-lg border-b pb-2">Foco e atenção</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TEA</span>
                    <p className="text-sm mt-1 text-gray-700">Hiperfoco intenso em áreas de interesse restrito. Dificuldade em mudar a atenção para fora desses interesses.</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TDAH</span>
                    <p className="text-sm mt-1 text-gray-700">Dificuldade geral em sustentar a atenção (a menos que seja uma atividade de alto interesse); Facilmente distraído por estímulos externos.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#0D2A4B] mb-3 text-lg border-b pb-2">Comportamento</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TEA</span>
                    <p className="text-sm mt-1 text-gray-700">Necessidade de rotina e previsibilidade; Movimentos estereotipados (stimming); Sensibilidade sensorial.</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-wider">TDAH</span>
                    <p className="text-sm mt-1 text-gray-700">Inquietação física, dificuldade em esperar a sua vez, agir sem pensar nas consequências.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CAPÍTULO 2 */}
        {currentChapter === 2 && (
          <section id="capitulo2" className="animate-in fade-in duration-500">
            <div className="flex items-start mb-8">
              <div className="w-1.5 h-16 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Capítulo 2</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">O Mapa do Cuidado: diagnóstico, comorbidades e a equipe multidisciplinar</h2>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-6 bg-white p-4 rounded-r-lg shadow-sm">
              "Muitas vezes, são as comorbidades que causam o maior impacto negativo na qualidade de vida da criança e no bem-estar da família."
            </blockquote>
            
            <p className="text-gray-700 leading-relaxed mb-8">Após a compreensão inicial da neurobiologia do TEA e do TDAH, o próximo passo é traçar um mapa claro para o cuidado. Este capítulo aborda a jornada do diagnóstico, a importância crucial de entender as comorbidades e como montar uma equipe de apoio eficaz. O foco aqui é prático: transformar a complexidade clínica em um plano de ação compreensível e gerenciável para a família.</p>
            
            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">2.1 A jornada do diagnóstico</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>A busca por um diagnóstico no Brasil pode ser uma jornada longa e, por vezes, frustrante. A carência de pesquisas e mapeamentos oficiais sobre a população neurodivergente no país contribui para a dificuldade no acesso a profissionais qualificados e para a disseminação de informações equivocadas. Muitas famílias relatam a demora no agendamento de consultas especializadas, o que atrasa o início de intervenções essenciais.</p>
              <p>É fundamental compreender que um diagnóstico preciso, especialmente em casos onde há suspeita de comorbidades, raramente é feito por um único profissional. A avaliação multidisciplinar é o padrão-ouro. Isso significa que a criança deve ser avaliada por uma equipe que pode incluir neurologista, psiquiatra, psicólogo, fonoaudiólogo e terapeuta ocupacional. Essa abordagem integrada é vital para diferenciar os sintomas de TEA e TDAH e identificar outras condições coexistentes, evitando diagnósticos equivocados ou tardios que podem comprometer a qualidade de vida da criança e da família. Validar a dificuldade desse processo é o primeiro passo para que a família se sinta amparada e não culpada pelas demoras ou incertezas.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">2.2 O que são comorbidades? Por que são tão importantes?</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>O termo "comorbidade" refere-se à existência de duas ou mais condições de saúde simultaneamente na mesma pessoa. No universo do TEA e do TDAH, as comorbidades não são uma eventualidade, mas uma ocorrência extremamente comum. Crianças com TEA, por exemplo, têm uma carga de comorbidades significativamente maior do que a população pediátrica geral.</p>
              <p>A identificação e o tratamento dessas condições associadas são absolutamente essenciais. Muitas vezes, são as comorbidades – e não os sintomas nucleares do TEA ou TDAH – que causam o maior impacto negativo na qualidade de vida da criança e no bem-estar da família. Uma criança que não dorme, que sofre com dores gastrointestinais crônicas ou que vive paralisada pela ansiedade enfrenta barreiras diárias que agravam todos os outros desafios. Ignorar as comorbidades é como tentar consertar um carro focando apenas no motor, sem verificar se os pneus estão furados ou se falta combustível. Uma abordagem completa e eficaz exige um olhar integral para a saúde da criança, promovendo maior bem-estar e desenvolvimento funcional. Para a família, o manejo eficaz das comorbidades representa um alívio tangível e imediato, transformando noites de insônia e dias de crise em uma rotina mais estável e previsível.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">2.3 Comorbidades comuns e seus sinais</h3>
            <div className="space-y-6 text-gray-700 leading-relaxed mb-8">
              <div>
                <h4 className="font-bold text-[#2E86C1] mb-2">Transtornos de ansiedade e depressão</h4>
                <p>Pessoas neurodivergentes enfrentam pressões sociais constantes para se adequar a padrões de comportamento, o que gera sobrecarga emocional e isolamento, aumentando o risco de desenvolver ansiedade e depressão. A prevalência de ansiedade em pessoas com TEA, por exemplo, é drasticamente maior do que na população geral. Os sintomas, no entanto, podem ser atípicos. Em vez de expressar preocupação verbalmente, uma criança pode manifestar ansiedade através do aumento de comportamentos repetitivos, irritabilidade ou crises. Da mesma forma, a depressão pode se apresentar como perda de interesse em hiperfocos, isolamento social mais intenso ou alterações no sono e apetite. É crucial não atribuir automaticamente esses sinais apenas ao TEA ou TDAH.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2E86C1] mb-2">Distúrbios do sono</h4>
                <p>Problemas de sono são extremamente prevalentes e impactam profundamente o funcionamento diurno. Isso pode incluir dificuldade para iniciar o sono, despertares frequentes durante a noite, ou um ritmo circadiano (o relógio biológico do corpo) desregulado. A falta de sono de qualidade pode agravar a desatenção, a hiperatividade, a irritabilidade e a dificuldade de regulação emocional, criando um ciclo vicioso de exaustão para a criança e para os cuidadores.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2E86C1] mb-2">Questões gastrointestinais e seletividade alimentar</h4>
                <p>Muitas famílias enfrentam uma batalha diária na hora das refeições. A seletividade alimentar em crianças com TEA e TDAH é frequentemente ligada a questões sensoriais (hipersensibilidade a texturas, cheiros ou sabores) e à necessidade de previsibilidade. Além disso, há uma alta incidência de problemas gastrointestinais, como constipação, diarreia e dores abdominais. Esses problemas podem não apenas causar desconforto físico e deficiências nutricionais, mas também influenciar diretamente o comportamento e o humor da criança.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2E86C1] mb-2">Epilepsia, Deficiência Intelectual e Transtorno Opositivo Desafiador (TOD)</h4>
                <p>Outras comorbidades significativas incluem a epilepsia, que tem uma prevalência maior em pessoas com TEA. A Deficiência Intelectual (DI) também pode coexistir, embora muitas pessoas com TEA e TDAH tenham inteligência na média ou acima da média. O Transtorno Opositivo Desafiador (TOD), caracterizado por um padrão de humor irritado e comportamento desafiador e desobediente, é outra comorbidade comum, especialmente associada ao TDAH, que pode complicar significativamente a dinâmica familiar e escolar.</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">2.4 Montando sua equipe de apoio</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Nenhuma família deveria passar por essa jornada sozinha. Construir uma equipe multidisciplinar de apoio é um passo fundamental. Cada profissional traz uma peça diferente do quebra-cabeça, e a colaboração entre eles é o que garante uma abordagem integrada e centrada na criança. Sua equipe pode incluir:</p>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pl-5 mb-4">
              <li><strong>Neurologista/Neuropediatra:</strong> Responsável pelo diagnóstico, manejo de comorbidades como epilepsia e, quando necessário, pela prescrição de medicamentos.</li>
              <li><strong>Psicólogo:</strong> Especializado em terapia comportamental (como a Análise do Comportamento Aplicada - ABA) para desenvolver habilidades sociais, de comunicação e de regulação emocional, além de oferecer suporte para a saúde mental da criança e da família.</li>
              <li><strong>Fonoaudiólogo:</strong> Trabalha as questões de linguagem e comunicação, desde a fala até a compreensão da comunicação não-verbal e pragmática.</li>
              <li><strong>Terapeuta Ocupacional:</strong> Foca no desenvolvimento da autonomia para atividades da vida diária (higiene, alimentação), na integração sensorial para lidar com hipo ou hipersensibilidades e no desenvolvimento da motricidade fina.</li>
              <li><strong>Nutricionista:</strong> Essencial para lidar com a seletividade alimentar, corrigir deficiências nutricionais e desenvolver um plano alimentar que suporte a saúde cerebral e geral da criança.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">O papel da família é ser o "CEO" dessa equipe, garantindo que a comunicação flua entre os profissionais e que as estratégias sejam consistentes entre a terapia, a casa e a escola.</p>
          </section>
        )}

        {/* CAPÍTULO 3 */}
        {currentChapter === 3 && (
          <section id="capitulo3" className="animate-in fade-in duration-500">
             <div className="flex items-start mb-8">
              <div className="w-1.5 h-16 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Capítulo 3</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">A Caixa de ferramentas do dia a dia: estratégias que transformam desafios em conquistas</h2>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-6 bg-white p-4 rounded-r-lg shadow-sm">
              "O manejo de crises é reativo. A construção do bem-estar é proativa."
            </blockquote>
            
            <p className="text-gray-700 leading-relaxed mb-8">Compreender o cérebro e montar uma equipe de apoio são os alicerces. Agora, é hora de construir o dia a dia. Este capítulo é uma "caixa de ferramentas" prática, com estratégias baseadas em evidências para lidar com os desafios mais comuns. O foco é empoderar os cuidadores com ações concretas que podem ser implementadas imediatamente para melhorar a qualidade de vida de toda a família.</p>
            
            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">3.1 Entendendo e prevenindo crises (meltdowns)</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>Um dos maiores desafios para as famílias é lidar com as crises, ou <em>meltdowns</em>. O primeiro passo para manejá-las é entender a diferença fundamental entre uma birra e um <em>meltdown</em>. Uma birra é um comportamento, muitas vezes manipulador e direcionado a um objetivo, que uma criança usa para conseguir o que quer. Ela tende a diminuir se não houver uma plateia.</p>
              <p>Um <em>meltdown</em>, por outro lado, é uma reação intensa e involuntária a uma sobrecarga sensorial ou emocional. O cérebro da criança simplesmente não consegue mais processar os estímulos e entra em colapso. Não há um objetivo final, a não ser a liberação de uma tensão insuportável.[28, 29] Reconhecer essa diferença é crucial, pois as estratégias para lidar com cada um são opostas. Tentar negociar ou punir um <em>meltdown</em> é ineficaz e pode piorar a situação.</p>
              <p>A prevenção é a ferramenta mais poderosa. Isso envolve aprender a identificar os gatilhos da criança (ambientes barulhentos, mudanças inesperadas, cansaço, fome) e os sinais de alerta que precedem a crise (a fase de "aceleração"). Esses sinais podem incluir aumento de movimentos repetitivos, mudança na expressão facial, rigidez corporal ou emissão de sons. Intervir nesse momento, removendo a criança do ambiente estressor ou oferecendo uma ferramenta de regulação, pode evitar que a crise atinja seu pico.[29, 30]</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">3.2 Guia prático para o manejo de crises</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Quando a prevenção não é possível e a crise acontece, ter um plano de ação claro pode fazer toda a diferença. Para um cuidador, sentir-se impotente durante uma crise, especialmente em público, pode ser devastador para a autoestima e o senso de competência. O julgamento social agrava a situação, transformando um momento de dificuldade em uma experiência de humilhação. Este guia prático não é apenas sobre acalmar a criança; é sobre restaurar a dignidade e a confiança do cuidador, transformando pânico em ação proposital.</p>
            <ul className="space-y-5 text-gray-700 leading-relaxed list-none p-0 mb-8">
              <li className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"><strong className="block text-[#0D2A4B] mb-2">Passo 1: Garantir a segurança (Safety First)</strong> A prioridade absoluta é a segurança física de todos. Se a criança está se colocando em risco ou pode machucar outros, intervenha calmamente para garantir a segurança. Isso pode significar remover objetos perigosos do alcance, afastar outras pessoas ou, se necessário, usar uma contenção física segura e não punitiva, apenas para prevenir lesões. A meta não é parar o comportamento, mas garantir que ninguém se machuque.</li>
              <li className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"><strong className="block text-[#0D2A4B] mb-2">Passo 2: Reduzir estímulos (Co-regulação Ambiental)</strong> O cérebro da criança está em curto-circuito. Adicionar mais estímulos – como falar alto, fazer muitas perguntas ou dar ordens – é como jogar gasolina no fogo. Se possível, leve a criança para um local calmo e com pouca luz. Fale o mínimo possível, usando uma voz baixa e monótona. Reduza o contato visual se isso for estressante para ela. O ambiente deve se tornar um santuário, não um campo de batalha.</li>
              <li className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"><strong className="block text-[#0D2A4B] mb-2">Passo 3: Manter a calma e oferecer presença (Co-regulação Emocional)</strong> A criança se espelha no estado emocional do cuidador. Sua calma é a âncora dela. Respire fundo. Lembre-se de que este não é um ato de desafio, mas de sofrimento. Não leve para o lado pessoal. Ofereça uma presença silenciosa e solidária. Algumas crianças podem se beneficiar de pressão profunda (um abraço firme), enquanto outras podem não tolerar o toque. Respeite os sinais da criança.</li>
              <li className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"><strong className="block text-[#0D2A4B] mb-2">Passo 4: Acolhimento pós-crise (Recuperação)</strong> Após o pico, a criança entrará em uma fase de "desaceleração". Ela estará física e emocionalmente exausta. Este é um momento de acolhimento, não de sermões ou lições. Ofereça água, um cobertor, um abraço suave. A conversa sobre o que aconteceu e como evitar no futuro deve ocorrer muito mais tarde, quando todos estiverem completamente calmos e regulados.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">3.3 A Tríade do Bem-Estar: Sono, nutrição e movimento</h3>
            <p className="text-gray-700 leading-relaxed mb-4">O manejo de crises é reativo. A construção do bem-estar é proativa. Focar em três pilares fundamentais pode aumentar drasticamente a resiliência da criança e reduzir a frequência e a intensidade das crises.</p>
            <ul className="space-y-4 text-gray-700 leading-relaxed list-disc pl-5 mb-8">
              <li><strong>Sono:</strong> A desregulação do ritmo circadiano é comum em crianças com TEA. Estabelecer uma rotina de sono consistente e previsível é fundamental. Isso inclui um "ritual de desaceleração" antes de dormir (banho morno, leitura, música calma), garantir que o quarto seja escuro e silencioso, e evitar telas pelo menos uma hora antes de deitar. A higiene do sono é uma intervenção poderosa para melhorar o humor e a capacidade de regulação no dia seguinte.</li>
              <li><strong>Nutrição:</strong> A alimentação tem um impacto direto no desenvolvimento global, mas é fundamental desmistificar a ideia de que toda criança neurodivergente precisa de suplementação. A ciência médica atual é clara: vitaminas e suplementos só são indicados quando há uma deficiência clínica comprovada por exames. Dada a alta prevalência de seletividade alimentar, a abordagem deve ser paciente e gradual, focando em introduzir novos alimentos sem pressão. O acompanhamento com um pediatra ou nutricionista especializado é essencial para avaliar a real necessidade de intervenções, garantindo que a criança receba o que precisa de forma individualizada e com segurança.</li>
              <li><strong>Movimento:</strong> A atividade física é uma ferramenta poderosa para a regulação. Para crianças com TDAH, ajuda a gastar o excesso de energia e a melhorar o foco. Para crianças com TEA, atividades rítmicas como pular, balançar ou correr podem ser extremamente organizadoras para o sistema nervoso. Integrar "pausas para movimento" ao longo do dia pode prevenir o acúmulo de tensão que leva a crises.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">3.4 O Poder da rotina e da previsibilidade</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>Para um cérebro neurodivergente que pode se sentir constantemente sobrecarregado por um mundo imprevisível, a rotina é uma âncora de segurança. Ela reduz a carga cognitiva de ter que processar o que vai acontecer a seguir, liberando recursos mentais para outras tarefas. A previsibilidade diminui a ansiedade e aumenta a cooperação.</p>
              <p>A melhor maneira de implementá-las é através de suportes visuais. Um quadro com a sequência de atividades da manhã (acordar, vestir, tomar café, escovar os dentes) ou um calendário semanal visual podem transformar transições caóticas em processos suaves e independentes. Antecipar mudanças também é crucial. Em vez de anunciar uma ida ao médico de surpresa, coloque um cartão no quadro de rotina no dia anterior. Isso dá à criança tempo para se preparar mentalmente, reduzindo a resistência e o estresse.</p>
            </div>
          </section>
        )}

        {/* CAPÍTULO 4 */}
        {currentChapter === 4 && (
          <section id="capitulo4" className="animate-in fade-in duration-500">
             <div className="flex items-start mb-8">
              <div className="w-1.5 h-16 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Capítulo 4</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">A parceria de sucesso: navegando o ambiente escolar</h2>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-6 bg-white p-4 rounded-r-lg shadow-sm">
              "Ao se armarem com conhecimento os pais deixam de ser apenas espectadores passivos e se tornam os defensores mais eficazes de seus filhos."
            </blockquote>
            
            <p className="text-gray-700 leading-relaxed mb-8">A escola representa um dos maiores desafios e, ao mesmo tempo, uma das maiores oportunidades para o desenvolvimento de uma criança neurodivergente. No entanto, para muitas famílias no Brasil, o ambiente escolar se torna um campo de batalha, onde a falta de preparo do sistema e o preconceito geram um ciclo de frustração e exaustão. Este capítulo foi desenhado não apenas como um guia de estratégias pedagógicas, mas como um manual de advocacia para pais, equipando-os com o conhecimento e as ferramentas para construir uma parceria eficaz com a escola e garantir os direitos de seus filhos.</p>
            
            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">4.1 Seus direitos na escola</h3>
            <p className="text-gray-700 leading-relaxed mb-4">O primeiro passo para uma advocacia eficaz é conhecer a lei. No Brasil, a Lei Brasileira de Inclusão da Pessoa com Deficiência (Lei nº 13.146/2015) é um marco legal que garante o direito à educação inclusiva. Isso significa que:</p>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pl-5 mb-4">
              <li>Nenhuma escola, pública ou privada, pode recusar a matrícula de um aluno em razão de sua deficiência.</li>
              <li>A escola tem o dever de fornecer um ambiente acessível e de promover a participação plena do aluno, eliminando barreiras.</li>
              <li>O aluno com deficiência tem direito a um "plano de atendimento educacional especializado" (PEI) e, se necessário, a um profissional de apoio escolar.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-8">Conhecer esses direitos transforma a conversa com a escola. Em vez de pedir um favor, a família está exigindo o cumprimento da lei. Isso muda a dinâmica de poder e estabelece uma base sólida para a negociação de adaptações.</p>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">4.2 A comunicação família-escola: a chave para o sucesso</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-4">
              <p>A inclusão efetiva depende de uma colaboração contínua e transparente entre a família e a equipe escolar. A família é a maior especialista em seu filho. A escola é a especialista em pedagogia. A união desses dois conhecimentos é o que cria um plano de sucesso.</p>
              <p>Para que essa comunicação seja produtiva, os pais devem se preparar para as reuniões escolares. Em vez de chegar com uma lista de queixas, é mais eficaz chegar com uma pauta construtiva. Um checklist de informações a serem compartilhadas pode incluir:</p>
            </div>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pl-5 mb-4">
              <li><strong>Perfil da criança:</strong> um resumo claro do diagnóstico, das comorbidades e dos relatórios médicos e terapêuticos.</li>
              <li><strong>Pontos fortes e interesses:</strong> destacar os talentos e hiperfocos da criança, que podem ser usados como pontes para a aprendizagem.</li>
              <li><strong>Gatilhos e desafios:</strong> listar os principais gatilhos sensoriais e emocionais da criança (ex: barulho do sinal, multidões no pátio) e as dificuldades específicas (ex: motricidade fina, interação no recreio).</li>
              <li><strong>Estratégias que funcionam:</strong> compartilhar as ferramentas de regulação que a criança já utiliza com sucesso em casa ou na terapia (ex: usar um abafador de som, ter um objeto de apego, precisar de pausas para movimento).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-8">Essa abordagem proativa posiciona os pais como parceiros colaborativos, não como adversários, facilitando a criação de um Plano Educacional Individualizado (PEI) que seja verdadeiramente eficaz.</p>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">4.3 Estratégias práticas para a sala de aula</h3>
            <div className="space-y-6 text-gray-700 leading-relaxed mb-8">
              <div>
                <h4 className="font-bold text-[#2E86C1] mb-2">Adaptações ambientais e sensoriais</h4>
                <p>O ambiente físico da sala de aula pode ser avassalador. Sugestões simples podem fazer uma grande diferença: permitir o uso de abafadores de som durante atividades barulhentas; oferecer um assento longe de janelas ou corredores movimentados para reduzir distrações; permitir o uso de "fidgets" ou objetos de apego para autorregulação; e reduzir a poluição visual na sala, mantendo as paredes mais limpas.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2E86C1] mb-2">Recursos visuais e estrutura</h4>
                <p>Como já mencionado, a previsibilidade é calmante. Sugerir que o professor utilize um quadro de rotina visual para toda a turma pode beneficiar não apenas a criança neurodivergente, mas todos os alunos. Para tarefas complexas, dividir as instruções em passos visuais (com imagens ou texto curto) torna o processo menos intimidante e mais gerenciável.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2E86C1] mb-2">Aproveitando o hiperfoco como ferramenta pedagógica</h4>
                <p>O hiperfoco, muitas vezes visto como um obstáculo, pode ser a maior ferramenta de engajamento da criança. Se o aluno é fascinado por dinossauros, a matemática pode ser ensinada calculando o tamanho dos fósseis; a escrita, através da criação de histórias sobre o período Jurássico. Os pais devem compartilhar esses interesses com os professores e sugerir formas criativas de integrá-los ao currículo.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2E86C1] mb-2">Manejo social e inclusão entre pares</h4>
                <p>A inclusão verdadeira acontece quando os colegas também são envolvidos. Os pais podem sugerir que a escola promova atividades que ensinem sobre diversidade e empatia. O professor pode atuar como mediador, ajudando a criança a iniciar interações, a entender as regras não escritas das brincadeiras e ensinando os outros alunos a como se comunicar e interagir de forma respeitosa com seu colega neurodivergente.</p>
                <p className="mt-4">A luta pela inclusão escolar é, sem dúvida, desgastante. Ao se armarem com conhecimento sobre direitos, estratégias de comunicação e sugestões práticas, os pais deixam de ser apenas espectadores passivos e se tornam os defensores mais eficazes de seus filhos, construindo pontes em vez de muros com a comunidade escolar.</p>
              </div>
            </div>
          </section>
        )}

        {/* CAPÍTULO 5 */}
        {currentChapter === 5 && (
          <section id="capitulo5" className="animate-in fade-in duration-500">
             <div className="flex items-start mb-8">
              <div className="w-1.5 h-16 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Capítulo 5</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">Cuidando de quem cuida: fortalecendo a saúde mental da família</h2>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-6 bg-white p-4 rounded-r-lg shadow-sm">
              "O autocuidado não é sobre fugir das suas responsabilidades, mas sobre garantir que você tenha recursos para cumpri-las de forma eficaz e sustentável."
            </blockquote>
            
            <p className="text-gray-700 leading-relaxed mb-8">Em toda a jornada da neurodiversidade, há um elemento central que, se negligenciado, pode comprometer todo o sistema de apoio: o bem-estar do cuidador. A dedicação em tempo integral, a carga emocional, as batalhas por direitos e a navegação em um sistema de saúde complexo cobram um preço. Este capítulo é dedicado a você, cuidador. Ele busca validar sua experiência, desconstruir mitos prejudiciais e oferecer estratégias concretas para que você possa cuidar de si mesmo com a mesma dedicação com que cuida do seu filho.</p>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">5.1 A realidade do cuidador: dados e validação</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>Os números pintam um quadro claro da sobrecarga. Um estudo divulgado pela Genial Care revelou que 86% dos cuidadores de crianças com autismo no Brasil são mães. Dentre elas, 68% relatam não ter tempo para si mesmas, e 47% carregam um sentimento de culpa pela condição de seus filhos. Outras pesquisas mostram que pais de crianças com TEA e TDAH apresentam taxas significativamente mais altas de estresse, ansiedade e depressão.</p>
              <p>É crucial entender que esses sentimentos – a exaustão, a frustração, o isolamento, a culpa – não são um sinal de fraqueza ou de falta de amor. São uma resposta humana e compreensível a uma situação de estresse crônico e de alta demanda. A sociedade muitas vezes impõe uma narrativa da "mãe guerreira", uma figura heroica que sacrifica tudo pelo filho. Embora bem-intencionada, essa imagem pode ser tóxica. Ela cria uma pressão para ser infalível e silencia a dor, tornando ainda mais difícil para as mães admitirem que estão sofrendo e que precisam de ajuda. Este capítulo oferece uma contra-narrativa: você não precisa ser uma guerreira invencível. Você precisa ser uma cuidadora saudável e sustentável.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">5.2 Identificando o burnout do cuidador</h3>
            <p className="text-gray-700 leading-relaxed mb-4">O <em>burnout</em> não é apenas cansaço. É um estado de esgotamento físico, mental e emocional profundo, causado pela exposição prolongada a situações de alto estresse. Reconhecer os sinais é o primeiro passo para buscar ajuda. Eles incluem:</p>
            <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pl-5 mb-4">
              <li><strong>Exaustão crônica:</strong> sentir-se cansado o tempo todo, mesmo após dormir.</li>
              <li><strong>Distanciamento emocional:</strong> sentir-se apático, cínico ou desconectado da criança e de outras pessoas.</li>
              <li><strong>Sentimento de ineficácia:</strong> a sensação de que nada do que você faz é bom o suficiente, acompanhada de uma baixa autoestima como cuidador.</li>
              <li><strong>Sintomas físicos:</strong> dores de cabeça frequentes, problemas gastrointestinais, maior suscetibilidade a doenças.</li>
              <li><strong>Irritabilidade e ansiedade:</strong> ter "pavio curto", sentir-se constantemente no limite ou preocupado.</li>
              <li><strong>Isolamento social:</strong> afastar-se de amigos, familiares e atividades que antes davam prazer.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-8">Se você se identifica com vários desses sinais, não ignore. É um alerta de que seus recursos estão se esgotando e que é hora de reabastecer.</p>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">5.3 O Autocuidado não é luxo, é estratégia de sobrevivência</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>Em meio a uma rotina de terapias, consultas médicas e desafios diários, a ideia de "autocuidado" pode parecer um luxo inatingível ou até mesmo um ato de egoísmo. É preciso reformular essa crença. O autocuidado não é sobre fugir das suas responsabilidades; é sobre garantir que você tenha recursos para cumpri-las de forma eficaz e sustentável.</p>
              <p>Pense na metáfora da máscara de oxigênio no avião: você precisa colocar a sua primeiro antes de ajudar os outros. Um cuidador regulado é a ferramenta de intervenção mais poderosa que uma criança pode ter. Sua calma ajuda a regular a criança. Sua resiliência modela a resiliência dela. Sua saúde mental é a base sobre a qual o bem-estar de toda a família é construído. Portanto, cuidar de si mesmo é uma das coisas mais importantes que você pode fazer <em>pelo seu filho</em>.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">5.4 Estratégias práticas de autocuidado e resiliência</h3>
            <ul className="space-y-4 text-gray-700 leading-relaxed list-disc pl-5 mb-4">
              <li><strong>Construa sua tribo:</strong> o isolamento é um dos maiores fatores de risco para o <em>burnout</em>. Conectar-se com outros pais que vivem uma realidade semelhante é vital. Busque grupos de apoio, presenciais ou online, como os promovidos por associações. Compartilhar experiências, trocar conselhos e simplesmente ser compreendido sem julgamentos tem um poder terapêutico imenso.</li>
              <li><strong>Incorpore micro-pausas de regulação:</strong> você não precisa de uma hora para meditar. Cinco minutos podem ser suficientes. Experimente a técnica da "respiração quadrada": inspire contando até 4, segure o ar contando até 4, expire contando até 4, e espere contando até 4. Repita por alguns minutos. Fazer isso no carro antes de buscar seu filho na escola ou no banheiro pode ajudar a zerar o sistema nervoso.</li>
              <li><strong>Aprenda a pedir e aceitar ajuda:</strong> ninguém consegue fazer isso sozinho. Normalizar o ato de pedir ajuda é fundamental. Isso pode significar pedir a um familiar para ficar com seu filho por duas horas para que você possa ir ao supermercado sozinho, ou buscar terapia para você mesmo. A terapia individual pode ser um espaço seguro para processar suas emoções, lidar com a culpa e desenvolver estratégias de enfrentamento.</li>
              <li><strong>Ressignifique a culpa:</strong> o sentimento de culpa é um companheiro quase constante para muitos cuidadores. Lembre-se: você está fazendo o melhor que pode com os recursos que tem no momento. Pratique a autocompaixão. Fale consigo mesmo como falaria com um amigo querido que estivesse passando pela mesma situação. A culpa é um peso morto; a autocompaixão é um combustível para a resiliência.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-8">Cuidar de quem cuida não é um capítulo final ou um apêndice. É o coração da jornada. Ao priorizar seu próprio bem-estar, você garante que terá a força, a paciência e a clareza mental para continuar sendo o porto seguro que seu filho precisa.</p>
          </section>
        )}

        {/* CAPÍTULO 6 */}
        {currentChapter === 6 && (
          <section id="capitulo6" className="animate-in fade-in duration-500">
             <div className="flex items-start mb-8">
              <div className="w-1.5 h-16 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Capítulo 6</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">Horizontes em expansão: preparando para uma vida adulta autônoma e plena</h2>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-6 bg-white p-4 rounded-r-lg shadow-sm">
              "A autonomia e uma vida adulta plena não acontecem por acaso. Elas são construídas, tijolo por tijolo, a partir da infância."
            </blockquote>
            
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>A jornada de cuidar de uma criança neurodivergente é muitas vezes consumida pelas demandas do presente: a próxima terapia, a reunião na escola, o manejo da crise de ontem. No entanto, pairando sobre todos esses desafios diários, existe uma preocupação profunda e, por vezes, aterrorizante que assombra muitos pais: "O que será do meu filho quando eu não estiver mais aqui?". Essa ansiedade existencial sobre o futuro é, talvez, o maior fardo emocional que os cuidadores carregam.</p>
              <p>Este capítulo final busca abordar diretamente esse medo. O objetivo não é oferecer falsas garantias, mas sim um plano de ação proativo. A autonomia e uma vida adulta plena não acontecem por acaso; elas são construídas, tijolo por tijolo, a partir da infância. Ao transformar a ansiedade em planejamento, este capítulo visa aliviar o peso do futuro e mostrar um caminho de esperança e possibilidade.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">6.1 A transição para a vida adulta: um desafio planejado</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>A transição da adolescência para a vida adulta é um período complexo para qualquer jovem, envolvendo novas responsabilidades em educação, trabalho, independência e relacionamentos sociais. Para indivíduos no espectro autista, essa fase apresenta obstáculos adicionais e, infelizmente, o Brasil ainda possui poucos recursos e pesquisas dedicados a apoiar essa transição. A falta de preparação adequada, a escassez de programas especializados e a compreensão limitada das necessidades dos adultos autistas resultam em altas taxas de desemprego e dificuldades de socialização.</p>
              <p>Reconhecer essa realidade não é para desanimar, mas para enfatizar a importância de um planejamento precoce e intencional. A família, junto com a equipe de apoio, precisa começar a pensar na vida adulta muito antes de ela chegar, focando no desenvolvimento gradual de habilidades para a independência.</p>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">6.2 Construindo a autonomia no dia a dia (desde cedo)</h3>
            <ul className="space-y-4 text-gray-700 leading-relaxed list-disc pl-5 mb-8">
              <li><strong>Habilidades da vida diária:</strong> desde cedo, envolva a criança em tarefas domésticas apropriadas para sua idade e capacidade. Isso pode começar com guardar os próprios brinquedos e evoluir para preparar um lanche simples, usar a máquina de lavar ou ajudar com as compras. O objetivo é desenvolver competências práticas essenciais para uma vida independente.</li>
              <li><strong>Gestão financeira:</strong> a educação financeira pode começar de forma concreta, com uma mesada para aprender a poupar para um item desejado. Na adolescência, pode-se introduzir o conceito de orçamento, o uso de um cartão de débito pré-pago e o pagamento de pequenas contas, sempre com supervisão e apoio.</li>
              <li><strong>Navegação na comunidade:</strong> pratique o uso de transporte público, ensine a pedir informações, a ir a uma padaria e a fazer uma compra. Essas experiências constroem confiança e familiaridade com o mundo fora de casa.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">6.3 Educação superior e mercado de trabalho</h3>
            <ul className="space-y-4 text-gray-700 leading-relaxed list-disc pl-5 mb-8">
              <li><strong>Educação:</strong> ambientes universitários podem ser desafiadores devido às demandas sociais e de organização. É importante pesquisar instituições que ofereçam serviços de apoio a alunos com deficiência e trabalhar em estratégias de organização, gerenciamento de tempo e autoadvocacia (a capacidade do jovem de comunicar suas próprias necessidades e solicitar adaptações).</li>
              <li><strong>Mercado de trabalho:</strong> a busca por emprego é um grande desafio. É crucial focar nas potencialidades e interesses do indivíduo. Programas de treinamento profissional adaptados e mentoria podem ser extremamente úteis. No ambiente de trabalho, "adaptações razoáveis" são um direito e podem incluir um espaço de trabalho mais silencioso, instruções por escrito em vez de verbais, ou horários flexíveis. Campanhas de conscientização são necessárias para desmistificar o autismo adulto e mostrar aos empregadores o valor que funcionários neurodivergentes podem agregar, com sua atenção aos detalhes, lealdade e pensamento inovador.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">6.4 Relacionamentos e vida social</h3>
            <p className="text-gray-700 leading-relaxed mb-8">A necessidade de conexão humana é universal. Apoiar o desenvolvimento de relacionamentos na vida adulta é fundamental. Isso pode envolver a participação em grupos de interesse (como clubes de jogos, grupos de caminhada ou aulas de arte), onde a conexão pode surgir a partir de uma paixão compartilhada, diminuindo a pressão da interação social "tradicional". É importante também oferecer educação sobre relacionamentos amorosos e sexualidade de forma clara, concreta e respeitosa.</p>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">6.5 A invisibilidade do Autismo adulto e a importância do diagnóstico tardio</h3>
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>É cada vez mais comum que adultos recebam seu diagnóstico de TEA ou TDAH tardiamente, muitas vezes após um filho ser diagnosticado. Essa "geração perdida" cresceu sem entender a razão de suas dificuldades e sem o apoio adequado. O diagnóstico na vida adulta pode ser um momento de imenso alívio e auto-compreensão, recontextualizando uma vida inteira de desafios.</p>
              <p>A crescente visibilidade de adultos autistas, incluindo figuras públicas e influenciadores, ajuda a combater o estigma e a mostrar a diversidade do espectro. Isso reforça a necessidade de políticas públicas que não apenas apoiem as crianças, mas que garantam a continuidade do cuidado ao longo da vida, com capacitação do sistema de saúde para o diagnóstico e tratamento de adultos.</p>
              <p>Ao focar em um planejamento proativo e na construção de habilidades desde cedo, os pais podem transformar a ansiedade sobre o futuro em um projeto de empoderamento. A mensagem final é de esperança: com o suporte adequado, é possível construir um futuro onde o indivíduo neurodivergente não apenas sobrevive, mas prospera, com autonomia, propósito e inclusão.</p>
            </div>
          </section>
        )}

        {/* CONCLUSÃO */}
        {currentChapter === 7 && (
          <section id="conclusao" className="animate-in fade-in duration-500">
             <div className="flex items-start mb-8">
              <div className="w-1.5 h-12 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Conclusão</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">Um futuro de potencial e inclusão</h2>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-6 bg-white p-4 rounded-r-lg shadow-sm">
              "A neurodiversidade nos ensina que não existe um único jeito 'certo' de ser, de pensar ou de experimentar o mundo."
            </blockquote>
            
            <div className="space-y-5 text-gray-700 leading-relaxed mb-8">
              <p>Chegamos ao final desta jornada guiada, mas, para sua família, este é apenas o começo de um novo capítulo. O caminho da neurodiversidade, embora repleto de desafios, é também um caminho de profundo aprendizado, de descobertas inesperadas e de uma conexão familiar fortalecida pela superação conjunta.</p>
              <p>A mensagem central deste guia é a de que o conhecimento é a mais poderosa ferramenta de empoderamento. Ao compreender a arquitetura única do cérebro do seu filho, ao reconhecer a importância de cuidar das comorbidades, ao se equipar com estratégias práticas para o dia a dia e para a escola, e, crucialmente, ao priorizar o seu próprio bem-estar, você deixa de ser um passageiro reativo e se torna o navegador confiante da jornada da sua família.</p>
              <p>A neurodiversidade nos ensina que não existe um único jeito "certo" de ser, de pensar ou de experimentar o mundo. Com o apoio certo, informação de qualidade e uma forte rede de suporte, as famílias podem não apenas enfrentar os desafios, mas também celebrar as perspectivas únicas e os talentos extraordinários que seus filhos trazem ao mundo.</p>
              <p>Que este guia sirva como um recurso contínuo, um lembrete de sua força e um parceiro em sua missão de construir um futuro de potencial, aceitação e inclusão plena para seu filho. A jornada é longa, mas você não está sozinho.</p>
            </div>
          </section>
        )}

        {/* APÊNDICES */}
        {currentChapter === 8 && (
          <section id="apendices" className="animate-in fade-in duration-500">
             <div className="flex items-start mb-8">
              <div className="w-1.5 h-12 bg-[#2E86C1] rounded-full mr-4 mt-1 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-[#2E86C1] uppercase tracking-wider mb-1">Apêndices</p>
                <h2 className="text-3xl font-extrabold m-0 leading-tight">Apêndices de acesso rápido</h2>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-[#A9CCE3] pl-4 italic text-gray-600 text-lg my-6 bg-white p-4 rounded-r-lg shadow-sm">
              "Estes apêndices foram criados como ferramentas práticas, transformando a teoria do livro em ação imediata."
            </blockquote>
            
            <p className="text-gray-700 leading-relaxed mb-8">Estes apêndices foram criados como ferramentas práticas e de referência rápida para serem usadas no dia a dia, transformando a teoria do livro em ação imediata.</p>
            
            <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3">Glossário de termos essenciais</h3>
            <ul className="space-y-4 text-gray-700 leading-relaxed list-disc pl-5 mb-8">
              <li><strong>Comorbidade:</strong> a presença de uma ou mais condições de saúde (física ou mental) além do diagnóstico principal. Ex: Ansiedade como comorbidade do TEA.</li>
              <li><strong>Funções Executivas:</strong> conjunto de habilidades mentais que nos ajudam a gerenciar tarefas e atingir metas. Incluem planejamento, organização, memória de trabalho, controle de impulsos e flexibilidade cognitiva. Frequentemente afetadas no TDAH e no TEA.</li>
              <li><strong>Hiperfoco:</strong> um estado de concentração intensa em um assunto ou atividade de grande interesse, comum no TEA e no TDAH. Pode ser uma grande força quando canalizado.</li>
              <li><strong>Stimming (Comportamento Autoestimulatório):</strong> movimentos repetitivos (ex: balançar o corpo, bater as mãos) que ajudam a pessoa a regular suas emoções e seu sistema sensorial. É uma ferramenta de enfrentamento, não um comportamento a ser suprimido.</li>
              <li><strong>Ecolalia:</strong> a repetição de palavras ou frases ouvidas. Pode ser imediata ou tardia. É uma forma de comunicação e processamento da linguagem, não apenas uma repetição sem sentido.</li>
              <li><strong>Co-regulação:</strong> o processo pelo qual um indivíduo ajuda a acalmar e regular o estado emocional de outro através de sua própria presença calma e responsiva. Fundamental no manejo de crises.</li>
            </ul>

            {/* NOVO BLOCO DE REFERÊNCIAS */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#0D2A4B] mt-8 mb-3 flex items-center gap-2">
                <Instagram className="w-6 h-6 text-[#E1306C]" />
                Recursos confiáveis no Brasil
              </h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                Filtrar informações na internet pode ser desafiador. Esta lista inclui organizações e influenciadores recomendados pelo Dr. Mauro Reis que produzem conteúdo responsável e baseado em evidências.
              </p>

              <div className="space-y-8">
                {/* Categoria 1: Médicos */}
                <div>
                  <h4 className="font-bold text-[#2E86C1] mb-3 uppercase tracking-wider text-sm border-b pb-2">Médicos e Neurocientistas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { nome: "Dr. Marcelo Masruha", arroba: "@dr.marcelomasruha", desc: "Neurologista Adulto e Infantil" },
                      { nome: "Dr. Paulo Liberalesso", arroba: "@pauloliberalesso", desc: "Neuropediatra e Neurocientista" },
                      { nome: "Dr. Thiago Castro", arroba: "@dr.thiagocastro", desc: "Autismo Baseado em Evidências" }
                    ].map((perfil, i) => (
                      <a key={i} href={`https://instagram.com/${perfil.arroba.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                        <span className="font-bold text-gray-800">{perfil.nome}</span>
                        <span className="text-sm text-[#E1306C] font-medium">{perfil.arroba}</span>
                        <span className="text-sm text-gray-500 mt-1">{perfil.desc}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Categoria 2: Psicologia e Educação */}
                <div>
                  <h4 className="font-bold text-[#2E86C1] mb-3 uppercase tracking-wider text-sm border-b pb-2">Psicologia, Pesquisa e Educação</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { nome: "Mayra Gaiato", arroba: "@mayragaiato", desc: "Psicóloga e Mestre em ABA" },
                      { nome: "Dr. Thiago Lopes", arroba: "@dr_thiago_lopes", desc: "Doutor em Psicologia" },
                      { nome: "Lucelmo Lacerda", arroba: "@lucelmo.lacerda", desc: "Pesquisador e Doutor em Educação" },
                      { nome: "Prof. João Lucas", arroba: "@prof.joaolucaslima", desc: "Autismo e Inclusão" }
                    ].map((perfil, i) => (
                      <a key={i} href={`https://instagram.com/${perfil.arroba.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                        <span className="font-bold text-gray-800">{perfil.nome}</span>
                        <span className="text-sm text-[#E1306C] font-medium">{perfil.arroba}</span>
                        <span className="text-sm text-gray-500 mt-1">{perfil.desc}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Categoria 3: Vivência e Instituições */}
                <div>
                  <h4 className="font-bold text-[#2E86C1] mb-3 uppercase tracking-wider text-sm border-b pb-2">Vivência e Instituições</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { nome: "Fernanda Fialho", arroba: "@paraquetabu", desc: "Autismo & Saúde Mental Sem Tabu" },
                      { nome: "Paulo Messina", arroba: "@messinaoficial", desc: "Pai de Gêmeos Autistas e Professor" },
                      { nome: "Instituto Neurodiversidade", arroba: "@institutoneurodiversidade", desc: "Clínica Multidisciplinar" }
                    ].map((perfil, i) => (
                      <a key={i} href={`https://instagram.com/${perfil.arroba.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                        <span className="font-bold text-gray-800">{perfil.nome}</span>
                        <span className="text-sm text-[#E1306C] font-medium">{perfil.arroba}</span>
                        <span className="text-sm text-gray-500 mt-1">{perfil.desc}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#0D2A4B] mt-10 mb-4">Checklists práticos para o dia a dia</h3>
            
            <h4 className="font-bold text-[#2E86C1] mb-2">Checklist 1: kit de sobrevivência sensorial para passeios</h4>
            <p className="text-gray-700 leading-relaxed mb-4">Monte uma pequena bolsa com itens que podem ajudar a prevenir ou manejar uma sobrecarga sensorial em ambientes públicos.</p>
            
            {/* UX: Checklists como labels interativos */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              {[
                "Abafadores de som ou fones de ouvido com cancelamento de ruído.",
                "Óculos de sol para sensibilidade à luz.",
                "Um 'fidget' ou objeto de apego favorito para autorregulação.",
                "Lanche e água (fome e sede são gatilhos comuns).",
                "Um tablet ou celular com jogos ou vídeos calmantes (para momentos de espera).",
                "Cartões de comunicação simples (se a criança for não-verbal ou perder a fala em momentos de estresse)."
              ].map((item, i) => (
                <label key={i} className="flex items-start p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100">
                  <input type="checkbox" className="w-6 h-6 shrink-0 mt-0.5 text-[#2E86C1] rounded border-gray-300 focus:ring-[#2E86C1]" />
                  <span className="ml-3 text-gray-700 leading-relaxed">{item}</span>
                </label>
              ))}
            </div>

            <h4 className="font-bold text-[#2E86C1] mb-2">Checklist 2: Modelo de quadro de rotina visual semanal</h4>
            <p className="text-gray-700 leading-relaxed mb-4">Use um quadro branco ou cartolina e crie cartões com figuras ou palavras para cada atividade principal.</p>
            
            {/* UX Otimizada: Tabelas viram Cards no Mobile */}
            <div className="space-y-4 mb-8">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#0D2A4B] mb-3 text-lg border-b pb-2">Manhã</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-700">
                  <div><span className="font-bold block text-gray-400">Seg</span> [Escola]</div>
                  <div><span className="font-bold block text-gray-400">Ter</span> [Escola]</div>
                  <div><span className="font-bold block text-gray-400">Qua</span> [Fono]</div>
                  <div><span className="font-bold block text-gray-400">Qui</span> [Escola]</div>
                  <div><span className="font-bold block text-gray-400">Sex</span> [Escola]</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#0D2A4B] mb-3 text-lg border-b pb-2">Tarde</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-700">
                  <div><span className="font-bold block text-gray-400">Seg</span> - </div>
                  <div><span className="font-bold block text-gray-400">Ter</span> [Parque]</div>
                  <div><span className="font-bold block text-gray-400">Qua</span> [Escola]</div>
                  <div><span className="font-bold block text-gray-400">Qui</span> [Psicólogo]</div>
                  <div><span className="font-bold block text-gray-400">Sex</span> [Casa da Vovó]</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#0D2A4B] mb-3 text-lg border-b pb-2">Noite</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-700">
                  <div><span className="font-bold block text-gray-400">Seg</span> [Jantar/Leitura]</div>
                  <div><span className="font-bold block text-gray-400">Ter</span> [Jantar/Leitura]</div>
                  <div><span className="font-bold block text-gray-400">Qua</span> [Jantar/Leitura]</div>
                  <div><span className="font-bold block text-gray-400">Qui</span> [Jantar/Leitura]</div>
                  <div><span className="font-bold block text-gray-400">Sex</span> [Pizza/Filme]</div>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-[#2E86C1] mb-2">Checklist 3: roteiro para a reunião com a escola</h4>
            <p className="text-gray-700 leading-relaxed mb-4">Organize suas ideias antes da reunião para garantir que todos os pontos importantes sejam abordados.</p>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              {[
                "Apresentação: breve resumo do perfil do meu filho (diagnósticos, pontos fortes, interesses).",
                "Objetivos da reunião: o que eu espero alcançar? (Ex: discutir adaptações para o recreio).",
                "O que está funcionando: comece com um feedback positivo para criar um tom colaborativo.",
                "Desafios observados: descreva de forma objetiva (Ex: 'tenho observado que ele volta muito agitado do recreio').",
                "Sugestões de estratégias: apresente as estratégias que funcionam em casa/terapia.",
                "Perguntas para a escola: como podemos trabalhar juntos? Quem é meu ponto de contato?",
                "Próximos passos: definir um plano de ação claro, com responsáveis e prazos."
              ].map((item, i) => (
                <label key={i} className="flex items-start p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100">
                  <input type="checkbox" className="w-6 h-6 shrink-0 mt-0.5 text-[#2E86C1] rounded border-gray-300 focus:ring-[#2E86C1]" />
                  <span className="ml-3 text-gray-700 leading-relaxed">{item}</span>
                </label>
              ))}
            </div>

            <h4 className="font-bold text-[#2E86C1] mb-4">Checklist 4: plano de ação para manejo de crises</h4>
            <div className="space-y-4 mb-16">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h5 className="font-bold text-[#0D2A4B] mb-2">Fase 1: Sinais de Alerta (prevenção)</h5>
                <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
                  <li>Meu filho está mostrando: [Liste os sinais. Ex: balançar as mãos, ficar quieto demais].</li>
                  <li><strong>Ação:</strong> Reduzir a demanda. Oferecer uma pausa. Mudar de ambiente. Usar kit sensorial.</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h5 className="font-bold text-[#0D2A4B] mb-2">Fase 2: Crise (Pico do Meltdown)</h5>
                <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
                  <li><strong>Ação 1: SEGURANÇA.</strong> Garantir que ele e outros estejam seguros.</li>
                  <li><strong>Ação 2: SILÊNCIO.</strong> Falar o mínimo possível. Voz calma.</li>
                  <li><strong>Ação 3: ESPAÇO.</strong> Reduzir estímulos. Oferecer espaço ou abraço contido (se ele aceitar).</li>
                  <li><strong>Ação 4: CALMA.</strong> Minha calma é a âncora dele. Respirar fundo.</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h5 className="font-bold text-[#0D2A4B] mb-2">Fase 3: Pós-Crise (Recuperação)</h5>
                <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
                  <li><strong>Ação:</strong> Acolher. Oferecer água. Validar o sentimento ("Isso foi muito difícil"). Não dar sermão. A conversa fica para depois.</li>
                </ul>
              </div>
            </div>

            
            {/* ========================================= */}
            {/* DIVISOR DE SEÇÃO (PAUSA COGNITIVA)          */}
            {/* ========================================= */}
            <div className="my-16 flex items-center justify-center">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="px-4 text-gray-400 text-sm uppercase tracking-widest font-semibold">
                Sua Opinião Importa
              </span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Formulário de Feedback */}
            <FeedbackForm />

            {/* ========================================= */}
            {/* CTA DO INSTAGRAM (SOFT PITCH)               */}
            {/* ========================================= */}
            <div className="mt-16 mb-8 bg-[#EBF5FB] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left shadow-sm border border-[#2E86C1]/20">
              <Image 
                src="/miniatura_ebook_dr.png"
                alt="Dr. Mauro Reis" 
                width={112} 
                height={112} 
                className="rounded-full object-cover border-4 border-white shadow-md shrink-0"
              />
              <div>
                <h3 className="text-xl font-bold text-[#0D2A4B] mb-2">
                  Vamos continuar essa conversa?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-5">
                  Espero que este guia tenha sido útil e traga clareza para a sua jornada. Diariamente, compartilho mais dicas, atualizações e reflexões sobre neurodiversidade no meu Instagram. Será um prazer ter você por lá!
                </p>
                <a 
                  href="https://www.instagram.com/dr.mauroreis/" // <-- Insira o @ real aqui
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#2E86C1] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1A5F8C] transition-colors shadow-sm active:scale-95"
                >
                  <Instagram className="w-5 h-5 shrink-0" />
                  Me siga no Instagram
                </a>
              </div>
            </div>

          </section>
        )}
      </main>

      {/* --- INÍCIO DO MENU LATERAL (DRAWER) --- */}
      {/* Fundo Escuro (Backdrop) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Gaveta Lateral */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabeçalho do Menu */}
        <div className="p-5 border-b flex justify-between items-center bg-[#0D2A4B] text-white">
          <h2 className="font-bold text-lg">Índice</h2>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de Capítulos */}
        <div className="flex-1 overflow-y-auto py-2">
          {chapterTitles.map((title, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentChapter(index);
                setIsMenuOpen(false); // Fecha o menu ao clicar
              }}
              className={`w-full text-left px-5 py-4 border-b border-gray-50 flex items-center justify-between transition-colors ${
                currentChapter === index 
                  ? 'bg-[#EBF5FB] text-[#2E86C1] font-bold border-l-4 border-l-[#2E86C1]' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="truncate pr-2">{title}</span>
              {currentChapter === index && <ChevronRight className="w-4 h-4 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Rodapé do Menu: Instagram */}
        <div className="p-5 border-t bg-gray-50">
          <a 
            href="https://www.instagram.com/dr.mauroreis/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white py-3.5 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity active:scale-95"
          >
            <Instagram className="w-5 h-5" />
            Siga o Dr. Mauro Reis
          </a>
        </div>
      </div>
      {/* --- FIM DO MENU LATERAL --- */}

      {/* Navegação Inferior (Rodapé Fixo Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setCurrentChapter(prev => Math.max(0, prev - 1))}
          disabled={currentChapter === 0}
          className="flex items-center px-4 py-3 font-semibold text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Anterior
        </button>

        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {currentChapter}/{totalChapters}
        </span>

        {currentChapter < totalChapters ? (
          <button 
            onClick={() => setCurrentChapter(prev => Math.min(totalChapters, prev + 1))}
            className="flex items-center px-4 py-3 bg-[#2E86C1] text-white font-bold rounded-lg shadow-sm hover:bg-[#1B4F72] transition-colors active:scale-95"
          >
            Próximo
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        ) : (
          <span className="px-4 py-3 text-[#2E86C1] font-bold flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-1" />
            Finalizado
          </span>
        )}
      </div>
    </div>
  );
}