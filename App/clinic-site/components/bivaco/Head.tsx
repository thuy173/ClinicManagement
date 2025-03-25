'use client'

import IconApp from '@components/common/Icon'
import React from 'react'
import FeatureImg from '../../public/assets/icons/tinh-nang.webp'

const Head = () => {
  const menuItems = [
    'AGS Group',
    'Relocation',
    'Records Management',
    'Worldwide Movers'
  ]

  const icons = [
    {
      name: 'lni lni-hand-shake',
      style: { color: 'white', fontSize: '14px', paddingBottom: '2.5px' },
      styleTitle: { fontSize: '10px' },
      title: 'Careers'
    },
    {
      name: 'lni lni-credit-card-multiple',
      style: { color: 'white', fontSize: '12px', paddingBottom: '3.5px' },
      styleTitle: { fontSize: '10px' },
      title: 'Payment'
    },
    {
      name: 'lni lni-user-4',
      style: { color: 'white', fontSize: '12px', paddingBottom: '3.5px' },
      styleTitle: { fontSize: '10px' },
      title: 'Log in'
    },
    {
      src: FeatureImg,
      width: 14,
      height: 14,
      style: { paddingBottom: '3px' },
      styleTitle: { fontSize: '10px' },
      title: 'English'
    },
    {
      name: 'lni lni-chevron-down',
      style: { color: 'white', fontSize: '12px', paddingBottom: '3.5px' },
      styleTitle: { fontSize: '10px' },
    }
  ]
  
  return (
    <>
      <div className='hidden md:block text-xxs w-screen bg-[#34313a] text-white'>
        <div className='grid grid-cols-2 justify-between px-10 lg:px-40'>
          <div className='flex items-center'>
            {menuItems.map((item, index) => (
              <p
                key={index}
                className={`mx-4 ${index === 3 ? 'bg-white text-red-700' : ''}`}
                style={
                  index === 3
                    ? {
                        clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                        marginRight: '-2rem',
                        padding: '2.5px 15px',
                        fontWeight: 500
                      }
                    : {}
                }
              >
                {item}
              </p>
            ))}
          </div>
          <div className='flex justify-end space-x-4'>
            {icons.map((icon, index) => (
              <IconApp key={index} {...icon} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Head
