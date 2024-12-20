'use client'

import { useEffect, useState, FC, useRef } from 'react'

interface TextCarouselProps {
  texts: string[]
  speed?: number
  className?: string
  background?: string
}

const TextCarousel: FC<TextCarouselProps> = ({
  texts,
  speed = 50,
  className = '',
  background
}) => {
  const [position, setPosition] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animation = setInterval(() => {
      setPosition((prev: number) => {
        const container = containerRef.current
        if (!container) return prev

        const firstSetWidth = container.scrollWidth / 2
        const parentWidth = container.parentElement?.offsetWidth || 0
        const resetPoint = -(firstSetWidth / parentWidth) * 100

        if (prev <= resetPoint) {
          return 0
        }
        return prev - 0.1
      })
    }, speed)

    return () => {
      clearInterval(animation)
    }
  }, [speed])

  const duplicatedTexts = [...texts, ...texts]

  return (
    <div className={`${background} relative overflow-hidden whitespace-nowrap`}>
      <div
        ref={containerRef}
        className={`animate-marquee inline-block ${className}`}
        style={{
          transform: `translateX(${position}%)`
        }}
      >
        {duplicatedTexts.map((text, index) => (
          <span key={index} className='mx-4 inline-block py-2'>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TextCarousel
