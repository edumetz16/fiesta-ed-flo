"use client"

import { BaseSyntheticEvent, ChangeEvent, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from "next/image"
import { Card } from "./ui/card"
import { Music } from "lucide-react"

export default function SpotifyPlaylist() {
  const input = useRef<HTMLInputElement>(null);
  const [addResponse, setAddResponse] = useState<'' | 'success' | 'failure'>('');
  const [songUrl, setSongUrl] = useState("");
  const [track, setTrack] = useState<{id: string, name: string, artist:string, image: string} | null>(null);
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{id: string, name: string, artist:string, image: string, uri: string}[]>([]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the song submission
    // For demo purposes, we'll just show a success message
    toast.success("Song suggestion received! Thank you!")
    setSongUrl("")
  }

  const searchSongs = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length >2) {
      const response = await fetch('/api/spotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({type: 'search', q: e.target.value})
      });
      const data = await response.json();
      setResults(data); 
    } else {
      setResults([]);
    }
  }

  const addToPlaylist = async () => {
    try {
      const response = await fetch('/api/spotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({type: 'add', track })
      });
      const data = await response.json();
      if(data.success) {
        setAddResponse('success');
        setTrack(null);
      } else {
        setAddResponse('failure');
      }
      
    } catch (error) {
      setAddResponse('failure');
    }
  }

  const dismiss = () => {
    if(input.current) {
      input.current.focus();
    }
    setTrack(null);
    setShowResults(true);
  }

  const inputFocusChange = (e: BaseSyntheticEvent<FocusEvent>) => {
    if(e.type === 'focus') {
      setShowResults(e.currentTarget === e.target);
    } else {
      const ct = e.currentTarget;
      const t = e.target;
      setTimeout(()=>{
        console.log(ct, t);
        setShowResults(t !== ct)
      }, 200);
      ;
    }
  }
  return (
    <>
    <Card className="p-6 md:p-12 bg-white/80 backdrop-blur">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <Music className="w-12 h-12 mx-auto text-[#2C3639]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3639]">Ayudanos a crear la playlist</h2>
              <p className="text-lg text-[#2C3639]/80">
                Agregá las canciones que te gustaría escuchar en la fiesta.
              </p>
            </div>
            <div className="max-w-md mx-auto space-y-4">
      <iframe
        src="https://open.spotify.com/embed/playlist/4zwBZLUYAPhufZ5Vpp4Jak"
        width="100%"
        height="352"
        allow="encrypted-media"
        className="rounded-lg"
      />
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <Input
          type="search"
          placeholder="Paste Spotify song link here"
          onChange={searchSongs}
          onFocus={inputFocusChange}
          onBlur={inputFocusChange}
          ref={input}
          className="bg-white"
        />
        {(results.length > 0 && (showResults || track)) && (
          <div className="absolute w-full h-48 bg-white overflow-y-scroll p-4 flex gap-2 flex-col">
            {results.map((result) => (
              <div key={result.id} className="flex items-center gap-4" onClick={(e)=>{console.log(e);setTrack(result)}}>
                <div className="w-16 h-16 min-w-16 min-h-16 rounded-lg overflow-hidden relative block">

                  <Image fill={true} src={result.image} alt={result.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full text-left">
                  <p className="font-medium">{result.name}</p>
                  <p className="text-muted-foreground">{result.artist}</p>
                </div>
              </div>
            )
            )}
          </div>
        )}
      </form>
    </div>
        
          </div>
        </Card>
        {track && <div onClick={()=>{dismiss()}} className="top-0 left-0 z-50 fixed bg-black/50 w-screen h-screen flex items-center justify-center">
          <Card className="px-10 py-4 flex flex-col gap-6">
            <h1>Agregar a la playlist</h1>
            <p>¿Querés agregar {track.name} a la playlist?</p>
            <div className="flex gap-4">

            <Button onClick={(e)=>{addToPlaylist()}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">Sí, ¡Con este tema la rompo!</Button>
            <Button onClick={(e)=>{dismiss()}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">No, al final no</Button>
            </div>
          </Card>
        </div>}
        {addResponse && <div onClick={()=>{setAddResponse('')}} className="top-0 left-0 z-50 fixed bg-black/50 w-screen h-screen flex items-center justify-center">
          <Card className="px-10 py-4 flex flex-col gap-6">
            {addResponse === 'success' && <h1>Se agregó la canción a la playlist</h1>}
            {addResponse === 'failure' && <h1>Algo salió mal</h1>}
            {addResponse === 'success' && <p>¿Esperamos que la menees hasta el piso?</p>}
            {addResponse === 'failure' && <p>Edu se mandó alguna cagada, avisale!</p>}
            <div className="flex gap-4">

            <Button onClick={(e)=>{addToPlaylist()}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">Sí, ¡Con este tema la rompo!</Button>
            <Button onClick={(e)=>{dismiss()}} className="bg-[#2C3639] hover:bg-[#2C3639]/90">No, al final no</Button>
            </div>
          </Card>
        </div>}
    </>
  )
}

