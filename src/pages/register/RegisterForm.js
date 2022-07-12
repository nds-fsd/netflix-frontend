import { React, useState, useRef } from 'react'
import './index.css'
import bgImg from '../../assets/img11.jpg'
import { useForm } from 'react-hook-form'

import { Navigate, useNavigate } from 'react-router-dom'
import { setUserSession } from '../../utils/sesion'
import api from '../../utils/api'

const RegisterForm = () => {
  const { register, handleSubmit } = useForm()

  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  //* This is to navigate to a page of our choice through router
  const navigate = useNavigate()

  //* This is to avoid the reload of the page
  const onSubmit = (data) => {
    // e.preventDefault()

    const { name, email, password } = data
    const authRegister = ({ password, passwordConfirm }) => {
      !password === passwordConfirm ? Navigate('/register') : Navigate('/')
    }
    const body = { name, email, password }
    api('POST', 'register', { body })
      .then((userSession) => {
        setUserSession(userSession)
        navigate('/home')
      })
      .catch((e) => {
        setErrMsg(e.message)
        console.error(e)
      })
  }

  //   console.log(watch('name'))

  return (
    //Add parent component container
    <section>
      <div className='register-form'>
        <div className='col-1'>
          <span
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </span>
          <h2>Sign In</h2>
          <span>register and enjoy the service</span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id='form'
            className='flex flex-col'
          >
            <input
              {...register('name', { required: true })}
              type='text'
              placeholder='Enter your name'
            />
            <input
              {...register('email', { required: true })}
              type='email'
              placeholder='Enter email address'
            />

            <input
              {...register('password', { required: true })}
              type='password'
              placeholder='Enter password'
            />
            <input
              {...register('passwordConfirm', {
                required: true,
              })}
              type='password'
              placeholder='Confirm your password'
            />
            <button className='btn'>Sign In</button>
            {/*Redirect to log in, in case of having and account*/}
            <span>
              Already have an account?
              <span className='line'>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >
                  Sign In!
                </a>
              </span>
            </span>
          </form>
        </div>
        <div className='col-2'>
          <img src={bgImg} alt='' />
        </div>
      </div>
    </section>
  )
}

export default RegisterForm
