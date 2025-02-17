import { get } from "@vercel/edge-config";
import { Invitee } from "../shared/interfaces";
import { Metadata } from "next";


export async function generateStaticParams() {
  const invitees = await get('invitees') as Invitee[];
  return invitees.map((invitee) => {
    return {
      invitationCode: invitee.code
    }
  })
}

export async function generateMetadata({ params }: {params: Promise<{invitationCode: string}>}) {
  const metadata: Metadata = {};
  const {invitationCode} = await params;
  const invitees = await get('invitees') as Invitee[];
  const invitee =  await invitees.find((i) => i.code === invitationCode);
  if(!invitee) return {};
  metadata.title = `Invitación para ${invitee.name}`;
  metadata.description = `${invitee.name}... ¡${invitee.quantity > 1 ? 'L@s' : 'Te'} invitamos a nuestra fiesta!`;
  metadata.openGraph = {
    images: {
      url: invitee.quantity > 1 ? '/invite_plural.jpg' : '/invite_singular.jpg',
      width: 1400,
      height: 1400
    }
  }
  return metadata;
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}