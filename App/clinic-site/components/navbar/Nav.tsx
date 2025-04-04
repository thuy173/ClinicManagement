'use client'

import React, { useState } from 'react'
import { Card } from '@nextui-org/react'
import Link from 'next/link'
import headerConfig from '@components/header/header-config'
import { useAuth } from '@hooks/useAuth'
import { Avatar } from '@nextui-org/avatar'

const MobileNav: React.FC = () => {
    const { user, logout } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen)
    }
  return (
    <Card
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        borderRadius: '20px 20px 0 0',
        backgroundColor: '#f5f5ff',
        zIndex: 1000
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '10px 0'
        }}
      >
        {headerConfig.map((item, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <Link key={item.title} href={item.path || '#'}>
              <i
                className={item.icon}
                style={{
                  fontSize: '24px'
                  // color: item.active ? '#7b61ff' : '#ccc'
                }}
              />
              <div
                style={{
                  fontSize: '12px',
                  // color: item.active ? '#7b61ff' : '#666',
                  marginTop: '5px'
                }}
              >
                {item.title}
              </div>
            </Link>
          </div>
        ))}
        <div className='items-center flex'>
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
    </Card>
  )
}

export default MobileNav
