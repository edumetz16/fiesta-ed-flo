'use client';
import { MouseEvent, useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card";
import { Invitee } from "@/app/shared/interfaces";
import { sendGTMEvent } from "@next/third-parties/google";

export const ConfirmAssistance = ({code, invitee}: {code?: string, invitee: Invitee}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmResponse, setConfirmResponse] = useState('');
  const [showConfirmResponse, setShowConfirmResponse] = useState(false);
  const [confirmQuantity, setConfirmQuantity] = useState(invitee.quantity);
  const answer = async (event: MouseEvent, assists: boolean, quantity?: number) => {
    setConfirmQuantity(quantity || invitee.quantity);
    event.stopPropagation();
    try {
      const response = await fetch(`/api/assistants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({code, assists, quantity: quantity || invitee.quantity})
      });
      sendGTMEvent({event: 'assist', code, assists, quantity: quantity || invitee.quantity});
      const data = await response.json();
      setConfirmResponse(data.assists ? 'assists':'no-assists');
      setShowConfirmResponse(true);
    } catch (error) {
      console.log(error);
      setConfirmResponse('error');
    } finally {
      setShowConfirm(false);
    }
  }
  return(
    <>
    <Button onClick={()=>{setShowConfirm(true)}} className="md:min-w-96 max-w-scren w-full md:w-auto bg-[#2C3639] hover:bg-[#2C3639]/90 text-2xl">
            {confirmResponse === 'no-assists' ? <span role="img">😔</span> : <span role="img">🎉</span>}{confirmResponse === '' && 'Confirmar asistencia'}
            {confirmResponse === 'assists' && '¡Te esperamos!'}
            {confirmResponse === 'no-assists' && 'Qué lástima que no puedas venir'}
    </Button>
    {showConfirm && <div onClick={()=>{setShowConfirm(false)}} className="top-0 left-0 z-50 fixed bg-black/50 w-screen h-screen flex items-center justify-center">
      <Card className="px-10 py-4 flex flex-col gap-6">
        <h1>Confirmar asistencia</h1>
        <p>¿Vas a venir a la fiesta?</p>
        <div className="flex gap-4">

        <Button onClick={(e: MouseEvent<HTMLButtonElement>)=>{answer(e,true)}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">Sí, {invitee.quantity > 1 ? `Vamos` : `Voy`}</Button>
        {invitee.quantity === 2 && <Button onClick={(e: MouseEvent<HTMLButtonElement>)=>{answer(e,true, 1)}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">Sí, Voy sol{invitee.gender === 'male' ? 'o' : invitee.gender === 'female' ? 'a' : '@'}</Button>}
        <Button onClick={(e: MouseEvent<HTMLButtonElement>)=>{answer(e,false)}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">No, {invitee?.quantity>1?'Nos la perdemos':'Me la pierdo'}</Button>
        </div>
      </Card>
    </div>}
    {confirmResponse && showConfirmResponse && <div onClick={()=>{setShowConfirmResponse(false)}} className="top-0 left-0 z-50 fixed bg-black/50 w-screen h-screen flex items-center justify-center">
      <Card className="px-10 py-4 flex flex-col gap-6">
        {confirmResponse === 'error' && <h1>¡Ups! Algo salió mal</h1>}
        {confirmResponse === 'error' && <p>No pudimos confirmar tu asistencia, volve a confirmar</p>}
        {confirmResponse === 'assists' && <h1>¡Gracias por confirmar!</h1>}
        {confirmResponse === 'no-assists' && <h1>Gracias por responder</h1>}
        {confirmResponse === 'assists' && <p>¡{confirmQuantity > 1 ? 'L@s' : 'Te'} esperamos!</p>}
        {confirmResponse === 'no-assists' && <p>Qué lástima que no puedas venir</p>}
        {confirmResponse === 'error' && <div className="flex gap-4">

          <Button onClick={(e: MouseEvent<HTMLButtonElement>)=>{answer(e,true)}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">Sí, voy a ir</Button>
          <Button onClick={(e: MouseEvent<HTMLButtonElement>)=>{answer(e,false)}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">No, no voy a ir</Button>
        </div>}
      </Card>
    </div>}
    </>
  )
}