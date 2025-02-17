import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'


const cormorantGaramond = Cormorant_Garamond({
  weight: ["300","400", "500","700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Te invitamos a nuestra celebración",
  description: "Celebramos nuestros 15 años juntos y queremos que nos acompañes en esta ocasión tan especial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />

      <body
        className={`${cormorantGaramond.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
