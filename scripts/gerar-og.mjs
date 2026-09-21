// Gera as duas imagens de compartilhamento (Open Graph) em public/og/.
//
// Rodar da raiz do repositorio:  node scripts/gerar-og.mjs
//
// ATENCAO AO SHARP: ele NAO esta no package.json. Vem como dependencia
// indireta do Next, que o usa para otimizar imagem. Se este script parar de
// rodar com "Cannot find package 'sharp'", foi isso: o Next mudou de
// estrategia. A saida e declarar o sharp como devDependency, o que exige
// aprovacao. O site nao quebra junto: este script e ferramenta de
// desenvolvimento e as imagens geradas vao commitadas, entao ele nunca roda
// na Vercel.
//
// POR QUE ESTAS IMAGENS EXISTEM
//
// O public/og-image.png era usado como imagem de compartilhamento e tinha
// quatro problemas ao mesmo tempo: 6010x5000 em vez dos 1200x630 declarados
// no codigo, 10,5 MiB de peso, proporcao quase quadrada e fundo
// transparente. O peso sozinho ja passava do que o WhatsApp aceita para
// montar previa, e fundo transparente cada plataforma pinta de um jeito.
//
// O og-image.png continua no repositorio: e a matriz em alta resolucao da
// foto, so deixou de ser referenciado.
//
// O script MEDE em vez de assumir, para continuar correto se a foto ou o
// slide forem trocados: a caixa do conteudo visivel sai do canal alfa, e a
// cor de fundo do slide sai das bordas do proprio arquivo.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const LARGURA = 1200;
const ALTURA = 630;
const QUALIDADE = 88;

// Azul do rodape da LP.
const AZUL_LP = '#0D2A4B';

// Altura da foto dentro do canvas. Menor que ALTURA para a foto nao encostar
// nas bordas, como a especificacao pede.
const ALTURA_DA_FOTO = 550;

const hex = (r, g, b) =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();

// Caixa do que nao e transparente. Usada para descartar as margens vazias da
// og-image.png antes de compor: sem isso a foto sairia pequena no meio do azul.
async function caixaDoConteudo(caminho) {
  const { data, info } = await sharp(caminho).raw().toBuffer({ resolveWithObject: true });
  if (info.channels < 4) throw new Error(`${caminho} nao tem canal alfa`);
  const alfa = (x, y) => data[(y * info.width + x) * info.channels + 3];

  let minX = info.width, maxX = -1, minY = info.height, maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (alfa(x, y) > 16) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error(`${caminho} esta inteiramente transparente`);
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// Cor de fundo do slide, medida nas bordas. A especificacao pede medir, nao
// assumir um cinza.
async function corDeFundo(caminho) {
  const { data, info } = await sharp(caminho).raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => {
    const i = (y * info.width + x) * info.channels;
    return hex(data[i], data[i + 1], data[i + 2]);
  };
  const meioX = Math.floor(info.width / 2);
  const meioY = Math.floor(info.height / 2);
  const pontos = [
    [5, 5], [info.width - 6, 5], [5, info.height - 6], [info.width - 6, info.height - 6],
    [meioX, 4], [4, meioY], [info.width - 5, meioY],
  ];
  const contagem = {};
  for (const [x, y] of pontos) {
    const c = px(x, y);
    contagem[c] = (contagem[c] || 0) + 1;
  }
  const [cor, vezes] = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0];
  return { cor, vezes, total: pontos.length };
}

async function gerarLP() {
  const origem = 'public/og-image.png';
  const caixa = await caixaDoConteudo(origem);

  const foto = await sharp(origem)
    .extract(caixa)
    .resize({ height: ALTURA_DA_FOTO, fit: 'inside', withoutEnlargement: false })
    .toBuffer();

  const destino = 'public/og/lp.jpg';
  await sharp({
    create: { width: LARGURA, height: ALTURA, channels: 3, background: AZUL_LP },
  })
    .composite([{ input: foto, gravity: 'center' }])
    .flatten({ background: AZUL_LP })
    .jpeg({ quality: QUALIDADE, chromaSubsampling: '4:4:4' })
    .toFile(destino);

  console.log(`  ${destino}`);
  console.log(`    caixa medida na origem: ${caixa.width}x${caixa.height} em (${caixa.left},${caixa.top})`);
  console.log(`    fundo: ${AZUL_LP}  |  altura da foto: ${ALTURA_DA_FOTO} de ${ALTURA}`);
}

async function gerarPalestra() {
  const origem = 'public/slides/autismo-muda/slide-15.png';
  const { cor, vezes, total } = await corDeFundo(origem);

  const destino = 'public/og/palestra-autismo-muda.jpg';
  await sharp(origem)
    .resize(LARGURA, ALTURA, { fit: 'contain', background: cor })
    .flatten({ background: cor })
    .jpeg({ quality: QUALIDADE, chromaSubsampling: '4:4:4' })
    .toFile(destino);

  console.log(`  ${destino}`);
  console.log(`    cor de fundo medida no slide: ${cor} (${vezes}/${total} amostras de borda)`);
  console.log(`    slide inteiro, sem corte, completado nas laterais`);
}

await mkdir('public/og', { recursive: true });
console.log('Gerando imagens de compartilhamento...');
await gerarLP();
await gerarPalestra();
console.log('Pronto.');
