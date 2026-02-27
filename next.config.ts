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
};

export default nextConfig;
