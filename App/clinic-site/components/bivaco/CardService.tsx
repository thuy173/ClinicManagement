import Image from '@node_modules/next/image'
import React from 'react'
import Logo from '../../public/assets/images/logoAGS.webp'
import { Button } from '@node_modules/@nextui-org/button/dist'
import Ribbon from '@components/common/BadgeRibbon'

const CardService = () => {
  return (
    <div className='flex flex-col justify-between'>
      <div className='relative'>
        <Ribbon text='FOR INDIVIDUALS' className='absolute top-5 -left-3'/>
        <Image src={Logo} alt='Logo' className='w-auto h-fit px-1 object-fill' />
      </div>

      <div className='my-3'>
        <h2 className='text-xs font-semibold'>
          Let us help you prepare for a smooth and successful move.{' '}
          <span className='font-[300]'>
            Whether you are moving from Africa to Asia or from England to the
            USA, we accompany you from departure to arrival. Our global network
            and local resources allow us to provide the highest quality services
            from start to finish.
          </span>
        </h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <Button
          className='border-red-700 text-red-700'
          radius='none'
          variant='bordered'
          size='sm'
        >
          Bordered
        </Button>
        <Button
          className='bg-red-700 text-white'
          radius='none'
          variant='solid'
          size='sm'
        >
          Bordered
        </Button>
      </div>
    </div>
  )
}

export default CardService
