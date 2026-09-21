import Image from "next/image";

// Leque com tres slides da apresentacao, abaixo do botao de download.
//
// Composicao, nao galeria: nao e clicavel, nao tem link nem evento. A acao
// da pagina continua sendo so o botao.
//
// GEOMETRIA — por que tudo esta em porcentagem
//
// O container tem proporcao fixa e todo o posicionamento dos slides e em
// porcentagem dele. Com isso a composicao inteira escala junto, e a
// sobreposicao entre os slides e a mesma em qualquer largura de tela. A
// cobertura exigida pelo slide 13 vira invariante de escala, em vez de
// depender de acertar cada breakpoint.
//
// REQUISITO DO SLIDE 13
//
// O slide 13 traz duas fotos da mesma pessoa: a esquerda neutra, a direita
// com expressao de sofrimento sob o rotulo "sob estresse ou sobrecarga". No
// leque o texto nao e legivel e sobraria o rosto, que isolado pode ser lido
// como "autismo e isso" por quem acabou de receber o diagnostico.
//
// A metade direita dele precisa ficar coberta pelo slide central em qualquer
// tela. A cobertura vem do empilhamento, nao de recorte: as imagens nao sao
// editadas nem cortadas.
//
// Com os numeros abaixo, o slide 13 ocupa [-3%, 51%] da largura do container
// e o central cobre a partir de 16%, entao pouco menos de 40% da largura
// dele fica visivel — o lado neutro. O fundo laranja da metade direita
// comeca em 50% da imagem e o rosto em torno de 67%, bem atras do central.
// O central tambem e mais alto que os laterais inclinados, o que garante a
// cobertura tambem na vertical.
const CENTRAL = { left: '16%', width: '68%', top: '4%', height: '92%' };
const LATERAL = { width: '54%', top: '13%', height: '74%' };

export default function LequeSlides() {
  return (
    <div
      role="img"
      aria-label="Três slides da apresentação Autismo muda?"
      className="relative w-full max-w-lg mx-auto aspect-[12/5] mt-8 select-none pointer-events-none"
    >
      {/* Esquerda, atras — slide 13 */}
      <div
        className="absolute z-0 overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
        style={{ left: '-3%', width: LATERAL.width, top: LATERAL.top, height: LATERAL.height, transform: 'rotate(-6deg)' }}
      >
        <Image
          src="/slides/autismo-muda/slide-13.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 60vw, 300px"
          className="object-cover"
        />
      </div>

      {/* Direita, atras — slide 06 */}
      <div
        className="absolute z-0 overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
        style={{ left: '49%', width: LATERAL.width, top: LATERAL.top, height: LATERAL.height, transform: 'rotate(6deg)' }}
      >
        <Image
          src="/slides/autismo-muda/slide-06.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 60vw, 300px"
          className="object-cover"
        />
      </div>

      {/* Centro, na frente — slide 15 */}
      <div
        className="absolute z-10 overflow-hidden rounded-lg shadow-xl ring-1 ring-black/5"
        style={{ left: CENTRAL.left, width: CENTRAL.width, top: CENTRAL.top, height: CENTRAL.height }}
      >
        <Image
          src="/slides/autismo-muda/slide-15.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 75vw, 380px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
