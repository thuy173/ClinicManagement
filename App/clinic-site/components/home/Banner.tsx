import TextCarousel from '@components/common/TextCarousel'
import Image from '@node_modules/next/image'
import React from 'react'
import Background from '../../public/assets/images/bgr-banner.webp'

const Banner = () => {
  const texts = [
    'Breaking News! 🔥',
    'Important Announcement',
    "Don't miss out!",
    'Special Event Coming Soon'
  ]
  return (
    <section className='flex-center relative mt-40 min-h-screen w-full flex-col'>
      <TextCarousel
        texts={texts}
        speed={50}
        className='text-sm font-semibold text-white'
        background='bg-red-500'
      />
      <div className=''>
        <Image
          src={Background}
          alt='Background banner'
          layout='full'
          objectFit='cover'
          priority
        />
      </div>
    </section>
  )
}

export default Banner
