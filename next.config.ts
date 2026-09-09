import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autoriza o domínio do túnel do VS Code a executar ações de servidor
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', // Padrão local
        '*.devtunnels.ms', // Autoriza qualquer túnel gerado pelo VS Code
      ],
    },
  },

  // O hub mora em www.drmauroreis.com.br desde 06/09/2026, mas
  // ebook-congresso.vercel.app continuou servindo uma copia inteira dele.
  // O QR impresso aponta para esse endereco antigo e prometia o e-book:
  // antes da migracao aquela raiz entregava o formulario, e passou a
  // entregar a LP do consultorio.
  //
  // O has por host e obrigatorio: sem ele estas regras valem tambem para
  // www.drmauroreis.com.br e derrubam o site, redirecionando o dominio
  // para ele mesmo.
  async redirects() {
    return [
      // A raiz antiga prometia o e-book, entao vai para o formulario,
      // e nao para a raiz do hub.
      {
        source: "/",
        has: [{ type: "host", value: "ebook-congresso.vercel.app" }],
        destination: "https://www.drmauroreis.com.br/acesso",
        permanent: true,
      },
      // Demais caminhos preservam o path. Precisa vir depois da regra da
      // raiz, porque /:path* tambem casa "/" e o Next avalia em ordem.
      {
        source: "/:path*",
        has: [{ type: "host", value: "ebook-congresso.vercel.app" }],
        destination: "https://www.drmauroreis.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
