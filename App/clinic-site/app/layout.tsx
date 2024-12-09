import 'lineicons/dist/lineicons.css'
import '@styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { Metadata } from 'next'
import Header from '@components/header/Header'

export const metadata: Metadata = {
  title: 'Clinic',
  description: 'My Clinic'
}
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <NextUIProvider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <Header />
          <main className='app'>{children}</main>
        </NextUIProvider>
      </body>
    </html>
  )
}

export default RootLayout
