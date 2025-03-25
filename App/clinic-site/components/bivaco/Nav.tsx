'use client'

import React, { useState } from 'react'
import Logo from '../../public/assets/images/logoAGS.webp'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'
import Link from 'next/link'
import Image from 'next/image'
import ButtonApp from '@components/common/Button'
import { Button } from '@nextui-org/button'

const menuItems = [
  { name: 'Home', href: '#', isActive: true },
  { name: 'Choosing AGS', href: '#', isActive: false },
  { name: 'Our Services', href: '#', isActive: false },
  { name: 'Our Network', href: '#', isActive: false },
  { name: 'News', href: '#', isActive: false },
  { name: 'Contact', href: '#', isActive: false }
]

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Image src={Logo} alt='Logo' className='w-auto px-1' />
        </NavbarBrand>
        <a
          onClick={() => {
            setMenuOpen(prev => !prev)
          }}
          className='sm:hidden'
        >
          {menuOpen ? (
            <i
              className='lni lni-menu-meatballs-1'
              style={{ fontSize: '24px' }}
            ></i>
          ) : (
            <i
              className='lni lni-menu-cheesburger'
              style={{ fontSize: '24px' }}
            ></i>
          )}
        </a>
        <NavbarContent
          className='hidden gap-4 space-x-4 sm:flex'
          justify='center'
        >
          {menuItems.map((item, index) => (
            <NavbarItem key={index} isActive={item.isActive}>
              <Link
                aria-current={item.isActive ? 'page' : undefined}
                href={item.href}
                className='text-sm'
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem>
            <ButtonApp
              title='Get a quote'
              icon='lni lni-pen-to-square'
              radius='sm'
              className='bg-red-700 py-0 text-white'
              size='sm'
              style={{ fontSize: '14px' }}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className='fixed left-0 top-0 z-50 h-1/2 w-full bg-white shadow-md sm:hidden'>
          <button
            onClick={() => setMenuOpen(false)}
            className='absolute right-4 top-4 text-xl'
          >
            ✖
          </button>
          <div className='mt-16 flex flex-col items-center'>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                aria-current={item.isActive ? 'page' : undefined}
                href={item.href}
                className='block border-b px-4 py-2 text-sm hover:bg-gray-100'
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Nav
