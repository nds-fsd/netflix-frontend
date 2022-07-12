import React from 'react'
import './index.css'
import bgImg from '../../assets/img11.jpg'
import { useForm } from 'react-hook-form'

import { Navigate, useNavigate } from 'react-router-dom'
import { hasUserSession, setUserSession } from '../../utils/sesion'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  //* This is to navigate to a page of our choice through router
  const navigate = useNavigate()

  const authRegister = ({ password, passwordConfirm }) => {
    !password === passwordConfirm ? Navigate('/register') : Navigate('/')
  }
  //   console.log(watch('name'))

  return (
    //Add parent component container
    <section>
      {hasUserSession() && <Navigate to='/home' replace />}
      {!hasUserSession() && (
        <div className='register-form'>
          <div className='col-1'>
            <h2>Sign In</h2>
            <span>register and enjoy the service</span>
            <form
              id='form'
              className='flex flex-col'
              onSubmit={handleSubmit(authRegister)}
            >
              <input
                {...register('name', { required: true })}
                type='text'
                placeholder='Enter your name'
              />
              <input
                {...register('email', { required: true })}
                type='email'
                placeholder='Email address'
              />
              <input
                {...register('password', { required: true })}
                type='password'
                placeholder='Enter password'
              />
              <input
                {...register('passwordConfirm', { required: true })}
                type='password'
                placeholder='Confirm your password'
              />
              <button className='btn'>Sign In</button>
              {/*Redirect to log in, in case of having and account*/}
              <p>
                Already have an account?
                <span className='line'>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/login')}
                  >
                    Sign In!
                  </a>
                </span>
              </p>
            </form>
          </div>
          <div className='col-2'>
            <img src={bgImg} alt='' />
          </div>
        </div>
      )}
    </section>
  )
}

export default RegisterForm
