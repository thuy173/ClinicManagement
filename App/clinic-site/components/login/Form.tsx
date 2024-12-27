'use client'

import { useEffect } from 'react'
import { useAuth } from '@hooks/useAuth'
import { Card, CardBody } from '@node_modules/@nextui-org/card/dist'
import { useLayout } from '@context/LayoutContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import BackgroundImage from '../../public/assets/images/bgr-banner.webp'

const LoginForm: React.FC = () => {
  const { login, isLoading, error } = useAuth()
  const { setShowHeaderFooter } = useLayout()

  // Hide Header/Footer on mount and show on unmount
  useEffect(() => {
    setShowHeaderFooter(false)
    return () => setShowHeaderFooter(true)
  }, [setShowHeaderFooter])

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await login(values.username, values.password)
    } catch {
      // Handle errors here
    }
  }

  return (
    <section className='flex min-h-screen items-center justify-center'>
      {/* Background */}
      <div
        className='absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat' 
        style={{
          backgroundImage: `url(${BackgroundImage.src})`,
        }}
      />

      {/* Form */}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='relative z-20 w-full max-w-md'>
            <Card className='w-full border border-gray-300 bg-black/10 p-6 shadow-lg rounded-lg'>
              <CardBody>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Login</h2>

                <div className='mb-4'>
                  <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-1'>
                    Username
                  </label>
                  <Field
                    id='username'
                    type='text'
                    name='username'
                    placeholder='Enter your username'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>

                <div className='mb-4'>
                  <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                    Password
                  </label>
                  <Field
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>

                <button
                  type='submit'
                  disabled={isLoading || isSubmitting}
                  className='w-full bg-sky-500 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200'
                >
                  {isLoading || isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                {error && <p className='text-red-500 text-sm mt-4 text-center'>{error}</p>}
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default LoginForm
