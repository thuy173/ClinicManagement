'use client'

import React, { useEffect } from 'react'
import Head from './Head'
import Nav from './Nav'
import { useLayout } from '@context/LayoutContext'
import Hero from './Hero'
import Service from './Service'
import Feature from './Feature'

const AGSPage = () => {
  const { setShowHeaderFooter } = useLayout()

  useEffect(() => {
    setShowHeaderFooter(false)
    return () => setShowHeaderFooter(true)
  }, [setShowHeaderFooter])
  
  return (
    <section>
      <Head />
      <Nav />
      <Hero />
      <Service />
      <Feature />
    </section>
  )
}

export default AGSPage
