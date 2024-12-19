import { Card } from '@node_modules/@nextui-org/card/dist'
import React from 'react'

const fakeData = [
  {
    title: 'Cardiology medical',
    description: 'Focused on heart health and cardiovascular diseases.',
    icon: 'lni lni-beat'
  },
  {
    title: 'Neurology',
    description: 'Exploring brain and nervous system conditions.',
    icon: 'lni lni-xrp'
  },
  {
    title: 'Pediatrics',
    description: "Dedicated to children's health and development.",
    icon: 'lni lni-search-2'
  },
  {
    title: 'Orthopedics',
    description: 'Caring for bones, joints, and muscles.',
    icon: 'lni lni-coral'
  }
]

export default function IntroCard() {
  return (
    <section>
      <div className='grid grid-cols-1 gap-5 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-10'>
        {fakeData.map((item, index) => (
          <Card key={index} className='sky_gradient'>
            <div className='grid grid-cols-8 gap-1 px-5 pt-6'>
              <div className='col-span-2 flex justify-center'>
                <i className={item.icon} style={{ fontSize: '32px' }}></i>
              </div>
              <div className='col-span-6'>
                <p className='line-clamp-2 text-lg font-semibold'>
                  {item.title}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-8 gap-1 px-5 pb-10'>
              <div className='invisible col-span-2'></div>
              <div className='col-span-6'>
                <p className='line-clamp-3 font-sans text-xs'>
                  {item.description}
                </p>
              </div>
            </div>
            <div className='absolute bottom-0 right-0'>
              <button className='rounded-tl-lg bg-sky-200 px-6 py-1 text-white'>
                <i
                  className='lni lni-arrow-right'
                  style={{ fontSize: '18px' }}
                ></i>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
