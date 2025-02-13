import { get, getAll } from "@vercel/edge-config";


export async function generateStaticParams() {
  const allValues = await getAll();
  const codes: {invitationCode: string}[] = [];
  Object.keys(allValues).forEach((key) => {
    if(key.startsWith('invitee')) {
      codes.push({
        invitationCode: key.replace('invitee', '')
      })
    }
  })
  return codes;
}

export async function generateMetadata({ params }: {params: Promise<{invitationCode: string}>}) {
  
  const {invitationCode} = await params;
  const invitee =  await get(`invitee${invitationCode}`) as {name: string, gender: 'male' | 'female'};
  return {
    title: `Invitación para ${invitee.name}`,
    description: `${invitee.name}... ¡Te invitamos a nuestra fiesta!`,
  }
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