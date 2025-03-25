'use client'

import { Button } from '@node_modules/@nextui-org/button/dist'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const slides = [
  {
    img: 'https://res.cloudinary.com/dcjo6evyk/image/upload/v1721893482/samples/coffee.jpg',
    text: 'The excellence of our staff',
    width: 1920,
    height: 1080
  },
  {
    img: 'https://res.cloudinary.com/dcjo6evyk/image/upload/v1721893483/cld-sample.jpg',
    text: 'Packing is our unparalleled expertise.',
    width: 1920,
    height: 1080
  },
  {
    img: 'https://res.cloudinary.com/dcjo6evyk/image/upload/v1721893482/samples/cup-on-a-table.jpg',
    text: 'We ensure your items arrive safely.',
    width: 1920,
    height: 1080
  }
]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextIndex = (currentIndex + 1) % slides.length

  return (
    <div className='relative mx-auto flex h-[50vh] w-[85%]'>
      <div className='relative left-6 w-2/3'>
        <Image
          src={slides[currentIndex].img}
          alt='Current slide'
          width={slides[currentIndex].width}
          height={slides[currentIndex].height}
          className='clip-path-diagonal h-full w-full object-cover'
        />
      </div>

      <div className='relative right-6 flex w-1/3 flex-col justify-center p-3 md:p-10 text-white'>
        <Image
          src={slides[nextIndex].img}
          alt='Next slide preview'
          width={slides[nextIndex].width}
          height={slides[nextIndex].height}
          className='clip-path-reverse absolute inset-0 h-full w-full object-cover'
        />
        <div className='clip-path-reverse absolute inset-0 bg-black bg-opacity-80'></div>
        <h2 className='relative text-lg font-[500]'>
          {slides[currentIndex].text}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
          <Button
            className='relative mt-4 border-white bg-red-700 text-white uppercase'
            radius='none'
            variant='bordered'
            size='sm'
          >
            Find a branch
          </Button>
          <Button
            className='relative mt-4 border-white text-white uppercase'
            radius='none'
            variant='bordered'
            size='sm'
          >
            Get a Quote
          </Button>
        </div>

        <div className='relative mt-6 flex space-x-2'>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex
                  ? 'border border-white bg-red-700'
                  : 'border border-white bg-transparent'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
