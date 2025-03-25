import { Button } from '@node_modules/@nextui-org/button/dist'
import { Card, CardBody, CardHeader } from '@node_modules/@nextui-org/card/dist'
import Image from '@node_modules/next/image'
import React from 'react'

interface CardAvatarProps {
  className?: string
  avatar?: string
  name?: string
}
const CardAvatar: React.FC<CardAvatarProps> = ({ avatar, name }) => {
  return (
    <Card className='shadow-none w-full'>
      <CardHeader className='p-0'>
        <div className='relative h-[135px] w-full'>
          {avatar && (
            <Image
              alt='Doctor profile'
              className='rounded-t-lg object-cover'
              src={avatar}
              fill
              sizes='220px'
            />
          )}
        </div>
      </CardHeader>
      <CardBody className="gap-1 px-0 py-0">
        <div className='flex items-center justify-between bg-slate-200 p-2'>
          <p className='font-sans text-xs'>
            Đánh giá: <span className='text-yellow-400'>5</span>
          </p>
          <p className='font-sans text-xs'>
            Lượt khám: <span className='text-yellow-400'>8386</span>
          </p>
        </div>
        <div className='px-2'>
          <h5 className='text-lg'>Bác sĩ</h5>
          <h6 className='text-lg font-semibold'>{name}</h6>
        </div>
        <div className='px-2 pb-2'>
          <Button
            className='bg-black/20 text-tiny text-white w-full'
            size='sm'
            variant='flat'
          >
            Tư vấn ngay
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardAvatar
