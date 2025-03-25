'use client'

import React from 'react'

const services = [
  {
    icon: <i className='lni lni-menu-meatballs-1'></i>,
    title: 'International Moves'
  },
  {
    icon: <i className='lni lni-menu-meatballs-1'></i>,
    title: 'Domestic Moves'
  },
  { icon: <i className='lni lni-menu-meatballs-1'></i>, title: 'Office Moves' },
  {
    icon: <i className='lni lni-menu-meatballs-1'></i>,
    title: 'Secure Storage'
  },
  {
    icon: <i className='lni lni-menu-meatballs-1'></i>,
    title: 'Vehicle Transfer'
  }
]
const Feature = () => {
  return (
    <div>
      <div className='w-full bg-[#34313a] py-10 text-white'>
        <div className='mb-8 text-center'>
          <h2 className='text-xl font-semibold'>
            Domestic & International Removals Solutions
          </h2>
          <p className='text-xs font-[300]'>
            AGS International Movers offers excellence to each of its clients.
          </p>
        </div>
        <div className='flex flex-wrap justify-center gap-8 px-4'>
          {services.map((service, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div className='flex items-center justify-center rounded-full bg-red-600 p-6 shadow-lg'>
                {service.icon}
              </div>
              <h3 className='mt-4 font-semibold'>{service.title}</h3>
              <button className='text-xs font-[300]'>Get a quote</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feature
