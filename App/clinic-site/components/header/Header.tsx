'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import headerConfig from './header-config'

import Logo from '../../public/assets/icons/logo.svg'
import { Avatar } from '@nextui-org/avatar'
import { Input } from '@nextui-org/input'

import MobileNav from '@components/navbar/Nav'

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAuthenticated, ] = useState(false)
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

  const handleLogout = () => {
   
  }

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full bg-white/30 p-1 backdrop-blur-md transition-transform duration-500 ease-in-out ${
          hideOnScroll ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className='container mx-auto flex items-center justify-between px-6'>
          <div className='flex gap-2 justify-center items-center'>
            <Image
              src={Logo}
              alt='Medical'
              width={48}
              height={48}
              className='ml-1 md:ml-8 lg:ml-10'
            />
            <h2 className='blue_gradient text-xl font-bold'>Medical</h2>
          </div>

          <div className='hidden space-x-12 font-semibold lg:flex'>
            {headerConfig.map((item) => (
              <Link
                key={item.title}
                href={item.path || '#'}
                className='items-center text-gray-600 hover:text-gray-700'
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </div>

          <div className='flex items-center space-x-4'>
            <div>
              <Input
                endContent={
                  <i className='lni lni-search-1 text-default-400 pointer-events-none flex-shrink-0 text-2xl'></i>
                }
                labelPlacement='outside'
                placeholder='Search...'
                type='text'
              />
            </div>
            <div className='hidden items-center space-x-4 lg:flex'>
              {isAuthenticated ? (
                <div>
                  <Avatar
                    className='cursor-pointer border-transparent'
                    onClick={toggleDropdown}
                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  />
                  {isDropdownOpen && (
                    <div className='absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-2 shadow-lg'>
                      <button
                        className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className='grid grid-cols-1'>
                  <div className='mx-2 px-2'>
                    <Link
                      href='/login'
                      className='block font-medium text-gray-600 transition-transform duration-200 hover:scale-105 hover:text-gray-900'
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
