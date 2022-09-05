import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import { hasUserSession, setUserSession } from '../../utils/sesion';
import api from '../../utils/api';

const LogIn = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  //* This is to navigate to a page of our choice through router
  const navigate = useNavigate();
  useEffect(() => {
    //* Set the focus when the component loads
    emailRef.current.focus();
  }, []);

  //* This is to empty out any Err msg when the user update the state of email || psw
  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  //* This is to avoid the reload of the page
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { email, password: pwd };

    api('POST', 'login', { body })
      .then((userSession) => {
        setUserSession(userSession);
        console.log(userSession);
        if (userSession.user.role === 'ADMIN') navigate('/admin');
        if (userSession.user.role === 'USER') navigate('/home');
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  return (
    <>
      {hasUserSession() && <Navigate to="/home" replace />}
      {!hasUserSession() && (
        <div className="cont-login-form">
          <div className="left">
            <div className="header">
              <h1>
                <span className="logo1">FAKE</span>
                <span className="logo2">FLIX</span>
              </h1>
            </div>
            <div className="header">
              <h2 className="animation a1">Welcome Back</h2>
              <h4 className="animation a2">Log in to your account using email and password</h4>
              <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                {errMsg}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <label htmlFor="email" />
              <input
                placeholder="Email"
                type="text"
                // htmlFor must match with the id!
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                // This will clear the input uppon submition
                value={email}
                required
                className="form-field animation a3"
              />
              <label htmlFor="password" />
              <input
                placeholder="Password"
                type="password"
                // htmlFor must match with the id!
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                // This will clear the input uppon submition
                value={pwd}
                required
                className="form-field animation a4"
              />
              <button className="animation a6" type="submit">
                Sign in
              </button>
              <span className="animation a5">
                Need an Account?
                <h4 className="animation a5">
                  <a style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
                    Sign Up!
                  </a>
                </h4>
              </span>
            </form>
          </div>
          <div className="right" />
        </div>
      )}
    </>
  );
};

export default LogIn;
