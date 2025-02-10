import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";


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
      <body
        className={`${cormorantGaramond.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
