'use client'

import { useEffect } from 'react'
import { useAuth } from '@hooks/useAuth'
import { Card, CardBody } from '@node_modules/@nextui-org/card/dist'
import { useLayout } from '@context/LayoutContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const LoginForm: React.FC = () => {
  const { login, isLoading, error } = useAuth()
  const { setShowHeaderFooter } = useLayout()

  // Hide Header/Footer on mount and show on unmount
  useEffect(() => {
    setShowHeaderFooter(false)
    return () => setShowHeaderFooter(true)
  }, [setShowHeaderFooter])

  // Form validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })

  // Submit handler
  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      await login(values.username, values.password)
      // router.push('/') // Redirect to homepage after successful login
    } catch {
      // Errors handled in Zustand store
    }
  }

  return (
    <section className='relative flex min-h-screen items-center justify-center'>
      <div
        className='absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat'
        style={
          {
            // backgroundImage: `url(${BackgroundImage})`
          }
        }
      />
      <div className='absolute inset-0 z-10 bg-black/15' />

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Card className='w-full border border-white/30 bg-white/10 p-6 shadow-xl backdrop-blur-md'>
              <CardBody>
                <h2 className='min-h-40'>Login</h2>

                <div className='form-group'>
                  <Field
                    type='text'
                    name='username'
                    placeholder='Username'
                    className='input'
                  />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>

                <div className='form-group'>
                  <Field
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='input'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500 text-sm mt-1'
                  />
                </div>

                <button type='submit' disabled={isLoading || isSubmitting}>
                  {isLoading || isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                {error && <p className='error'>{error}</p>}
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default LoginForm
