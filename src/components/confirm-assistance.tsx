'use client';
import { MouseEvent, useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card";

export const ConfirmAssistance = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const answer = (event: MouseEvent,response: boolean) => {
    console.log(response);
    event.stopPropagation();
  }
  return(
    <>
    <Button onClick={()=>{setShowConfirm(true)}} className="min-w-96 max-w-scren w-full md:w-auto bg-[#2C3639] hover:bg-[#2C3639]/90 text-2xl">
            Confirmar asistencia
          </Button>
    {showConfirm && <div onClick={()=>{setShowConfirm(false)}} className="top-0 left-0 z-50 fixed bg-black/50 w-screen h-screen flex items-center justify-center">
      <Card className="px-10 py-4 flex flex-col gap-6">
        <h1>Confirmar asistencia</h1>
        <p>¿Vas a venir a la fiesta?</p>
        <div className="flex gap-4">

        <Button onClick={(e: MouseEvent<HTMLButtonElement>)=>{answer(e,true)}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">Sí, voy a ir</Button>
        <Button onClick={(e: MouseEvent<HTMLButtonElement>)=>{answer(e,true)}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">No, no voy a ir</Button>
        </div>
      </Card>
    </div>}
    </>
  )
}