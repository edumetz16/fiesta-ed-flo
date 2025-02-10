'use client';
import { useIntersectionObserver } from 'usehooks-ts'
import Image from "next/image";
import style from './animated-image.module.scss';

export const AnimatedImage = ({src, alt, wrapperClass}: {src: string, alt: string, wrapperClass: string}) => {
  const {isIntersecting, ref} = useIntersectionObserver({
    freezeOnceVisible: true,
  });
  return (
    <div ref={ref} className={`${style.wrapper} ${isIntersecting ? style.visible : ''} ${wrapperClass}`}>
      <Image src={src} alt={alt} fill className="object-cover" priority />
    </div>
  )
}