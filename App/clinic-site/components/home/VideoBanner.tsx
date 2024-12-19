import React from 'react'

export default function VideoBanner() {
  return (
    <section className='flex-center relative mt-14 min-h-screen w-full flex-col'>
      <video
        className='absolute left-0 top-0 -z-10 h-1/2 lg:h-3/4 w-full object-cover'
        autoPlay
        loop
        muted
        playsInline
      >
        <source src='/assets/videos/banner.mp4' type='video/mp4' />
        Medical video
      </video>
      <div className='bg-white/30 pb-6 pt-3 backdrop-blur-md'>
        <h1 className='head_text text-center'>
          Heal & Advance
          <br className='max-md:hidden' />
          <span className='blue_gradient text-center'>
            AI Driven Healthcare
          </span>
        </h1>
      </div>
    </section>
  )
}
