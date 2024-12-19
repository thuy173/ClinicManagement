import 'lineicons/dist/lineicons.css'
import '@styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { Metadata } from 'next'
import { LayoutProvider } from '@context/LayoutContext'
import ClientLayout from './client-layout'

export const metadata: Metadata = {
  title: 'Clinic',
  description: 'My Clinic'
}
const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/assets/icons/favicon.svg' />
        <meta name='description' content='Your website description' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
        <NextUIProvider>
          <LayoutProvider>
            <ClientLayout>{children}</ClientLayout>
          </LayoutProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}

export default RootLayout
