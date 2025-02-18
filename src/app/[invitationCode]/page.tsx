import Image from "next/image"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Gift } from "lucide-react"
import SpotifyPlaylist from "@/components/spotify-playlist"
import GiftSection from "@/components/gift-section"
import { CalendarButton } from "@/components/calendar-button"
import { ConfirmAssistance } from "@/components/confirm-assistance"
import { TR } from "@/components/typewriter"
import { get } from "@vercel/edge-config"
import { Invitee } from "../shared/interfaces"
import { DressCodeButton } from "@/components/image-slideshow"

export default async function Page({params}: {params: Promise<{invitationCode: string}>}) {
  const {invitationCode} = await params;
  const invitees = await get('invitees') as Invitee[];
  const invitee =  await invitees.find((i) => i.code === invitationCode);
  if(!invitee?.name) return <></>;

  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      {/* Hero Section */}
      <section className="container px-4 py-12 md:py-24">
        <div className="text-center mt-12 mb-12 lg:mb-48 space-y-4 mx-auto w-fit">
        
          <h1 className="text-5xl md:text-8xl font-light text-[#2C3639] max-w-screen-md text-center min-h-36 sm:min-h-24 md:min-h-72 lg:min-h-48">
            <TR invitee={invitee}/>
          </h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            {/* <AnimatedImage src="/foto_nieve.jpg" alt="Edu" wrapperClass="relative w-full aspect-[4/5] rounded-2xl overflow-hidden" /> */}
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden lg:-translate-y-24 ">
              <Image src="/foto_nieve.jpg" alt="Edu" fill className="object-cover" priority />
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative w-full aspect-[1.4] md:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src="/foto_fiesta.jpeg" alt="Floppy" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container px-4 py-12 md:py-24">
        <h2 className="text-5xl lg:text-6xl text-center text-[#2C3639] max-w-screen-md mx-auto">Nos encantaría que nos acompañara{invitee.quantity>1?'n':'s'} este día</h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start mt-12 lg:mt-24">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/foto_coca2.jpg"
                  alt="Edu and Floppy together"
                  fill
                  className="object-cover object-bottom"
                />
              </div>
            <div className="space-y-4 relative h-full pl-8">
              <h2 className="text-2xl md:text-4xl text-left text-[#2C3639]">Dress code casual elegante</h2>
              <p className="text-xl md:text-2xl !leading-loose max-w-2xs  font-thin">
              Nuestra idea es que {invitee.quantity>1?'se sientan cómod@s':invitee.gender==='male'?'te sientas cómodo':invitee.gender==='female'?'te sientas cómoda':'te sientas cómod@'} para disfrutar de este festejo al máximo. No queremos que nadie tenga frío ni que le duelan los pies, así que {invitee.quantity>1?'vengan':'venite'} con ropa cómoda y a gusto que {invitee.quantity>1?'les':'te'} permita {invitee.quantity>1?'moverse':'moverte'} y bailar sin preocupaciones.

              Lo que más queremos es que pasemos juntos un momento increíble.
              </p>
              <DressCodeButton invitee={invitee} />
              <div className="relative lg:absolute lg:w-[360px] xl:w-[600px] aspect-video rounded-2xl overflow-hidden lg:-left-[360px] xl:-left-[120px] lg:-bottom-[50px] xl:-bottom-[200px]">
                <Image
                  src="/peques.jpeg"
                  alt="Edu and Floppy together"
                  fill
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>
      </section>

      {/* Event Details Section */}
      <section className="container px-4 py-12 md:py-16 md:mt-16 relative">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="space-y-4 text-center">
              <Calendar className="w-12 h-12 mx-auto text-[#2C3639]" />
              <h3 className="text-4xl font-bold text-[#2C3639]">Fecha</h3>
              <p className="text-2xl text-[#2C3639]/80">11 de abril de 2025</p>
              {/* <Link href="webcal://calendar.google.com/calendar/ical/c_e2483edc23fd1ffed1a590c344d2e15e3d2278a8e630fa5a95aee9d42222d9aa%40group.calendar.google.com/public/basic.ics" className="text-[#2C3639]/80">Agendalo</Link> */}
            </div>
              <CalendarButton />
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="space-y-4 text-center">
              <Clock className="w-12 h-12 mx-auto text-[#2C3639]" />
              <h3 className="text-4xl font-bold text-[#2C3639]">Hora</h3>
              <p className="text-2xl text-[#2C3639]/80">18:30</p>
            </div>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur md:col-span-2 lg:col-span-1">
            <div className="space-y-4 text-center">
              <MapPin className="w-12 h-12 mx-auto text-[#2C3639]" />
              <h3 className="text-4xl font-bold text-[#2C3639]">Ubicación</h3>
              <p className="text-2xl text-[#2C3639]/80">
                Hurlingham Club
                <br />
                Tte. Gral. Julio Argentino Roca 1411
                <br />
                Hurlingham, Buenos Aires
              </p>
            </div>
          </Card>
          
        </div>
        <div className="block text-center mt-10">
          
          <ConfirmAssistance code={invitationCode} invitee={invitee} />

          </div>
        <div className="mt-12">
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="aspect-[16/9] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.683941082813!2d-58.630871500000005!3d-34.58686300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb943f94dd0ef%3A0xc5c700d96a98e2d5!2sHurlingham%20Club!5e0!3m2!1sen!2sar!4v1739207281172!5m2!1sen!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Card>
        </div>
      </section>
      {/* Gift Section */}
      <section className="container px-4 py-12 md:py-12">
        <Card className="p-6 md:p-12 bg-white/80 backdrop-blur">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <Gift className="w-12 h-12 mx-auto text-[#2C3639]" />
              <p className="text-xl text-[#2C3639]/80 max-w-xl mx-auto">
                Nuestro mayor regalo es que {invitee.quantity>1?'compartan':'compartas'} este día con nosotros, pero si {invitee.quantity>1?'les':'te'} gustaría de contribuir con algo más, acá {invitee.quantity>1?'les':'te'} dejamos los datos:
              </p>
            </div>
            <GiftSection />
          </div>
        </Card>
      </section>

      {/* Music Section */}
      <section className="container px-4 py-12 md:py-12 relative">
        <SpotifyPlaylist invitee={invitee}/>
      </section>

    </main>
  )
}

