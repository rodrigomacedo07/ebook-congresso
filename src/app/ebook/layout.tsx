import type { Metadata } from "next";

// Apenas metadata. O title da rota /ebook e visivel ao usuario na aba e,
// sem este layout, herdaria o da LP do layout raiz.
export const metadata: Metadata = {
  title: "Dr. Mauro Reis | E-book Navegando a Neurodiversidade",
  description: "Um manual prático e acolhedor sobre TEA e TDAH, escrito especialmente para mães e cuidadoras",
};

export default function EbookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
