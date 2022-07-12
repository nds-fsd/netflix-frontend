import { useState, useEffect, useRef } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import './index.css'
import {hasUserSession, setUserSession} from "../../utils/sesion";
import api from "../../utils/api";


const LogIn = () => {
  const emailRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  //* This is to navigate to a page of our choice through router
  const navigate = useNavigate()

  useEffect(() => {
    //* Set the focus when the component loads
    emailRef.current.focus()
  }, [])

  //* This is to empty out any Err msg when the user update the state of email || psw
  useEffect(() => {
    setErrMsg('')
  }, [email, pwd])

  //* This is to avoid the reload of the page
  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {email, password: pwd};

    api("POST", 'login', {body}).then(userSession => {
      setUserSession(userSession);
      console.log(userSession);
      navigate('/home');
    }).catch(e =>{
      setErrMsg(e.message)
      console.error(e)
    })
  }

  return (
    <>
      {hasUserSession() && <Navigate to="/home" replace />}
      {!hasUserSession() && (<section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              // htmlFor must match with the id!
              id='email'
              ref={emailRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              // This will clear the input uppon submition
              value={email}
              required
            />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              // htmlFor must match with the id!
              id='password'
              autoComplete='off'
              onChange={(e) => setPwd(e.target.value)}
              // This will clear the input uppon submition
              value={pwd}
              required
            />
            <button>Sign in</button>
            <p>
              Need an Account? <span className='line'>
                <a style={{cursor : 'pointer'}} onClick={() => navigate('/register')}>Sign Up!</a>
              </span>
            </p>
          </form>
        </section>
      )}
    </>
  )
}

export default LogIn
