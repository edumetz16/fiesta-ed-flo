'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from "./ui/card"

interface SlideshowProps {
  images: number[]
  autoplayInterval?: number
  className?: string
}
const images = Array.from({ length: 16 }, (_, index) => (index));
export function DressCodeButton() {
  const [showSlideShow, setShowSlideShow] = useState(false)
  return (
    <>
      <Button
        size="sm"
        className="md:min-w-96 max-w-scren w-full md:w-auto bg-[#2C3639] hover:bg-[#2C3639]/90 text-2xl"
        onClick={() => setShowSlideShow((show) => !show)}
      >
        <span role="img">🤔</span> Algunas ideas
      </Button>
      {showSlideShow && (
        <div onClick={()=>{setShowSlideShow(false)}} className="-top-4 left-0 z-50 fixed bg-black/50 w-screen h-screen flex items-center justify-center">
          <Card onClick={(e)=>{e.stopPropagation()}} className="px-10 py-4 flex flex-col gap-6 w-[calc(100vw-60px)] h-[calc(100vh-100px)] max-w-2xl max-h-4xl">

          <ImageSlideshow images={images} />
          </Card>
        </div>
      )}
    </>
  )
}

function ImageSlideshow({
  images,
  autoplayInterval = 5000,
  className
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length)
    }, autoplayInterval)

    return () => clearInterval(timer)
  }, [images.length, autoplayInterval])

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className={cn("relative group w-full h-full", className)}>
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={`/dresscode/dc${index+1}.jpg`}
              alt={`Dress code ${index+1}.jpg`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white lg:bg-transparent opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white lg:bg-transparent lg:opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/75"
            )}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
