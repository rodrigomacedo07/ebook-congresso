import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Mauro Reis | E-book Navegando a Neurodiversidade",
  description: "Um manual prático e acolhedor sobre TEA e TDAH, escrito especialmente para mães e cuidadoras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Usando tag nativa do HTML para forçar o carregamento */}
        <script 
          defer 
          src="https://cloud.umami.is/script.js" 
          data-website-id="6ab1b84e-6645-4a41-9739-d440514c27f7"
        ></script>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S2FQP7MV4L"
          strategy="afterInteractive"
        />
        <Script id="ga4-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', 'G-S2FQP7MV4L', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w57rz73cu0");
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
