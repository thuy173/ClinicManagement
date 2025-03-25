'use client'
import React from 'react'
import styles from '../../styles/swiper.module.css'
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import CardAvatar from '@components/common/CardAvatar'

const Swiper = () => {
  const slides = Array.from({ length: 10 }, (_, index) => index + 1)

  return (
    <div className='mt-16 bg-red-200 px-10 py-5 relative'>
      <SwiperContainer
        slidesPerView={5}
        spaceBetween={16}
        loop={slides.length > 1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        // pagination={{
        //   clickable: true,
        //   dynamicBullets: true
        // }}
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        className={`${styles.swiperContainer} relative z-0`}
        breakpoints={{
          1200: {
            slidesPerView: 5,
            spaceBetween: 16
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 14
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 12
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 8
          }
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className='bg-transparent'>
            <CardAvatar name={slide.toString()} />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </div>
  )
}

export default Swiper
