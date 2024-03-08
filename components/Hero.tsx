"use client"
import React from 'react'
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const heroImages =[
    {imgUrl:"/assets/images/hero-1 (1).svg", alt:"smart watch"},
    {imgUrl:"/assets/images/hero-2.svg", alt:"bag"},
    {imgUrl:"/assets/images/hero-3.svg", alt:"lamp"},
    {imgUrl:"/assets/images/hero-4.svg", alt:"Air fryer"},
    {imgUrl:"/assets/images/hero-5.svg", alt:"chair"},
]
const Hero = () => {
  return (
    <div className="hero-carousel">
   <Carousel 
   showThumbs={false}
   autoPlay
   infiniteLoop
   interval={2000}
   showArrows={false}
   showStatus={false}
   >
{heroImages.map((image)=>(
    <Image 
    src={image.imgUrl}
    alt={image.alt}
    key={image.alt}
    height={484}
    width={484}
    className="object-contain"
    />
))}

   </Carousel>
    <Image src="/assets/icons/hand-drawn-arrow.svg"
    alt="arrow"
    height={175}
    width={175}
    className="max-xl:hidden absolute -left-[15%] z-0"
    />

    </div>
  )
}

export default Hero