import React from 'react'
import CardService from './CardService'

const Service = () => {
  return (
    <section className='relative -mt-14'>
      <div className='mx-auto flex w-2/3 flex-col bg-white p-6 shadow-lg'>
        <div className='text-center'>
          <h1 className='text-xl font-bold uppercase text-red-700'>
            INTERNATIONAL REMOVALS & STORAGE
          </h1>
          <div className='text-sm font-[400]'>
            <p className='mb-0'>
              &quot;Pioneer in the mobility industry, AGS International Movers
              is now one of its global leaders as a result of the innovative
              vision of its board for the last forty years.&quot;
            </p>
            <p>
              &quot;We provide tailor-made{' '}
              <span className='text-red-700'>
                services in international removals
              </span>{' '}
              and <span className='text-red-700'>secure storage</span>.&quot;
            </p>
          </div>
          <p className='my-5 font-semibold text-red-700'>
            We offer advice and excellent services on 5 continents
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 px-6'>
          <CardService />
          <CardService />
        </div>
      </div>
    </section>
  )
}

export default Service
