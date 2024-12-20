import InputApp from '@components/common/Input'
import React from 'react'

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const contactInfo = [
    {
      iconClass: 'lni lni-bluetooth',
      text: '123 AnyWhere St, Any City 12345'
    },
    {
      iconClass: 'lni lni-phone',
      text: '0987654321'
    },
    {
      iconClass: 'lni lni-id-card',
      text: '123 AnyWhere St, Any City 12345'
    }
  ]

  const quickLinks = ['Doctors', 'Blog', 'About Us']

  const socialIcons = [
    'lni lni-whatsapp',
    'lni lni-instagram',
    'lni lni-unlink-2-angular-eft'
  ]

  return (
    <section className={`${className} relative z-50 mt-28 lg:mt-12`}>
      <div className='sky_light_gradient grid grid-cols-1 px-10 py-14 md:grid-cols-3'>
        <div className='grid grid-cols-1 md:col-span-2 md:grid-cols-2'>
          <div>
            <h5 className='text-lg font-medium'>
              ProHealth Medical & Healthcare Center
            </h5>
            <div className='mt-5 space-y-2'>
              {contactInfo.map((info, index) => (
                <div key={index} className='flex gap-3'>
                  <i
                    className={`${info.iconClass} lni lni-bluetooth rounded-full bg-sky-600 p-0.5`}
                    style={{ fontSize: '12px', color: 'white' }}
                  ></i>
                  <p className='font-sans text-xs'>{info.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='hidden flex-col justify-end space-y-2 md:flex'>
            {quickLinks.map((link, index) => (
              <p key={index} className='font-sans text-xs'>
                {link}
              </p>
            ))}
          </div>
        </div>
        <div className='md:col-span-1'>
          <h5 className='mt-5 text-2xl font-bold md:mt-0'>
            Be Our Subscribers
          </h5>
          <p className='font-sans text-xs'>
            to get the latest news about heath from out exports
          </p>
          <InputApp
            type='email'
            placeholder='myEmail@gmail.com'
            endContent={
              <div className='flex items-center gap-1 rounded-full bg-sky-600 p-2 text-white'>
                <p className='text-xs font-light'>Submit</p>
                <i className='lni lni-arrow-right'></i>
              </div>
            }
          />
        </div>
      </div>
      <div className='bg-sky-600'>
        <div className='grid grid-cols-2 justify-between px-20 py-4 text-white'>
          <div className='flex gap-4'>
            {socialIcons.map((icon, index) => (
              <i key={index} className={icon}></i>
            ))}
          </div>
          <div className='flex justify-end gap-4'>
            <p className='text-sm font-light'>
              Copyright 2024 for TA THI THANH THUY
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
