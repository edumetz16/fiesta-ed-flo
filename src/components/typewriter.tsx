'use client'
import { Invitee } from "@/app/shared/interfaces";
import Typewriter from 'typewriter-effect';

export const TR = ({invitee}: {invitee: Invitee}) => {
  return (
    <Typewriter
            onInit={(typewriter) => {
              typewriter.changeDelay(50)
                .typeString(`HOLA ${invitee.name.toUpperCase()}`)
                .pauseFor(1000)
                .deleteAll()
                .changeDelay(50)
                .typeString(`${invitee.quantity > 1 ? 'LOS' : 'TE'} INVITAMOS A NUESTRA FIESTA`)
                .start();
            }}
          />
  )
}