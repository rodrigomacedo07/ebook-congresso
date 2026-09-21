// Rodape institucional, compartilhado entre a LP e a pagina da palestra.
//
// Existia duplicado nas duas paginas. Foi assim que o formato do CRM
// divergiu entre elas ate a iteracao 2: copia gera divergencia silenciosa.
//
// A margem superior vem por propriedade porque as duas paginas legitimamente
// usam valores diferentes, e as duas estao certas no seu contexto: a
// palestra vive dentro de um container min-h-screen flex flex-col, onde
// mt-auto cola o rodape no fim em paginas curtas; a LP nao tem esse
// container e usa margem fixa. Fixar a classe aqui mudaria o render de uma
// das duas.
export default function Rodape({ margemSuperior }: { margemSuperior: string }) {
  return (
    <footer className={`w-full bg-[#0D2A4B] text-white py-10 ${margemSuperior} text-center`}>
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-2">
        <p className="font-bold text-xl">Dr. Mauro Reis</p>
        <p className="text-[#A9CCE3] text-sm mb-2">CRM 52 0115265-3</p>

        {/* BLOCO DE ENDEREÇO */}
        <div className="bg-[#1B4F72]/50 p-4 rounded-xl flex flex-col items-center gap-1 my-4 w-full max-w-sm border border-white/5">
          <span className="font-semibold text-white tracking-wide">Le Monde Office Life</span>
          <span className="text-gray-300 text-sm">Av. Dr. Mario Guimarães, 428 - Sala 915</span>
          <span className="text-gray-300 text-sm">Centro, Nova Iguaçu - RJ</span>
        </div>

        <div className="h-px w-full max-w-md bg-white/10 my-4"></div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Dr. Mauro Reis. Todos os direitos reservados.
        </p>
        <p className="text-[10px] text-gray-500 mt-1">
          Desenvolvido por M7 Partners
        </p>
      </div>
    </footer>
  );
}
