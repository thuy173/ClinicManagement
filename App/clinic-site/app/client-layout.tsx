'use client'

import { ReactNode } from 'react'
import Header from '@components/header/Header'
import Footer from '@components/footer/Footer'
import { useLayout } from '@context/LayoutContext'

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const { showHeaderFooter } = useLayout()

  return (
    <>
      <div className='main'>
        <div className='gradient' />
      </div>
      {showHeaderFooter && <Header />}
      <main className='app'>{children}</main>
      {showHeaderFooter && <Footer className='hidden lg:block' />}
    </>
  )
}

export default ClientLayout
