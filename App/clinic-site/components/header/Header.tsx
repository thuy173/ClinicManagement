'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import headerConfig from './header-config'

import Logo from '../../public/assets/icons/logo.svg'
import { Avatar } from '@nextui-org/avatar'
import MobileNav from '@components/navbar/Nav'
import { Divider } from '@node_modules/@nextui-org/divider/dist'
import ButtonApp from '@components/common/Button'
import InputApp from '@components/common/Input'
import IconApp from '@components/common/Icon'
import { useAuth } from '@hooks/useAuth'

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [hideOnScroll, setHideOnScroll] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHideOnScroll(true)
      } else {
        setHideOnScroll(false)
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const linkInfo = [
    { class: 'lni lni-app-store', title: 'Store' },
    { class: 'lni lni-facebook-messenger', title: 'Messenger' },
    { class: 'lni lni-facebook', title: 'Facebook' },
    { class: 'lni lni-facetime', title: 'Face time' }
  ]

  const DividerVertical = () => (
    <span className='mx-2 select-none text-zinc-300'>|</span>
  )

  const headApp = () => {
    return (
      <div className='mt-2 hidden items-center justify-between gap-4 lg:flex'>
        <div className='hidden space-x-5 font-semibold lg:flex'>
          {linkInfo.map((item, index) => (
            <React.Fragment key={index}>
              <IconApp
                name={item.class}
                title={item.title}
                color='text-zinc-700'
                style={{
                  color: '#3f3f46'
                }}
              />
              {index < linkInfo.length - 1 && <DividerVertical />}
            </React.Fragment>
          ))}
        </div>

        <div className='flex items-center space-x-4'>
          <ButtonApp
            title='Tải ứng dụng'
            icon='lni lni-cloud-download'
            className='bg-red-500 text-white'
          />
          <ButtonApp
            title='Tài khoản'
            icon='lni lni-user-4'
            className='border border-blue-400 bg-transparent text-blue-500'
          />
        </div>
      </div>
    )
  }

  const navApp = () => {
    return (
      <div className='mb-2 flex justify-between gap-4'>
        <div className='hidden items-center space-x-12 font-semibold lg:flex'>
          {headerConfig.map(item => (
            <Link
              key={item.title}
              href={item.path || '#'}
              className='items-center text-zinc-700 hover:text-zinc-800'
            >
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        <div className='flex items-center'>
          <div className='lg:mx-5'>
            <InputApp
              type='text'
              placeholder='Search'
              endContent={
                <IconApp
                  name='lni lni-search-1'
                  style={{
                    color: '#3b82f6'
                  }}
                />
              }
            />
          </div>
          <div className='hidden items-center lg:flex'>
            {user ? (
              <div>
                <Avatar
                  className='cursor-pointer border-transparent'
                  onClick={toggleDropdown}
                  src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                />
                {isDropdownOpen && (
                  <div className='absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-2 shadow-lg'>
                    <button
                      className='block w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-gray-100'
                      onClick={logout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='grid grid-cols-1'>
                <div className=''>
                  <Link
                    href='/auth/login'
                    className='block font-medium text-zinc-700 transition-transform duration-200 hover:scale-105 hover:text-zinc-900'
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full bg-white/30 p-1 backdrop-blur-md`}
      >
        <div className='mx-auto grid grid-cols-1 px-6 lg:grid-cols-5'>
          <div
            className={`transform transition-all duration-500 ease-in-out lg:col-span-5 ${
              hideOnScroll
                ? 'h-0 -translate-y-full overflow-hidden'
                : 'translate-y-0'
            }`}
          >
            {headApp()}
            <Divider className='my-5 hidden lg:flex' />
          </div>

          <div className='flex items-center justify-between gap-4 lg:col-span-5'>
            <div className='flex items-center'>
              <Image
                src={Logo}
                alt='Medical'
                width={48}
                height={48}
                className='ml-1 lg:ml-0'
              />
              <h2 className='blue_gradient ml-2 text-xl font-bold'>Medical</h2>
            </div>

            {navApp()}
          </div>
        </div>
      </div>

      <div className='flex lg:hidden'>
        <MobileNav />
      </div>
    </>
  )
}

export default Header
