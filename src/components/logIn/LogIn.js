import { useState, useEffect, useRef, useContext } from 'react'
import AuthContext from '../../context/AuthProvider'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './index.css'

//! This will match with the backend
const LOGIN_URL = `${process.env.REACT_APP_BASE_URL}/login`

const LogIn = () => {
  const { setAuth } = useContext(AuthContext)
  const emailRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  //* This is to navigate to a page of our choice through router
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    //* Set the focus when the component loads
    emailRef.current.focus()
    let token
    const loginData = window.localStorage.getItem('userLogin')
    if (loginData) {
      token = JSON.parse(loginData)
      // setAuth(token)
      navigate('/')
    }
  }, [])

  //* This is to empty out any Err msg when the user update the state of email || psw
  useEffect(() => {
    setErrMsg('')
  }, [email, pwd])

  //* This is to avoid the reload of the page
  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = JSON.stringify({
      email: email,
      password: pwd,
    })

    await fetch(LOGIN_URL, {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: false,
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data?.message) throw data.message
        else {
          // setAuth(data)
          window.localStorage.setItem('userLogin', JSON.stringify(data))
          setSuccess(true)
        }
      })
      .catch((e) => {
        setErrMsg(e)
        console.error(e)
      })
  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1> <br />
          <p>
            <a href='#'>Go to home</a>
          </p>
        </section>
      ) : (
        <section>
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
              Need an Account?
              <br />
              {/* Router link to register */}
              <span className='line'>
                <a href='#'>Sign Up!</a>
              </span>
            </p>
          </form>
        </section>
      )}
    </>
  )
}

export default LogIn
