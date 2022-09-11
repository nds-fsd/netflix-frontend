import { useForm } from 'react-hook-form';
import React, { useState, useRef } from 'react';
import './RegisterForm.css';

import { Navigate, useNavigate } from 'react-router-dom';
import { setUserSession } from '../../utils/sesion';
import api from '../../utils/api';

const RegisterForm = () => {
  //! The useForm Hook returns an object containing a few properties
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({});

  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  //* This function connects with the backend
  const handleRegistration = (data) => {
    const { name, email, password, passwordRepeat } = data;
    //! Verification of password before validating
    if (password !== passwordRepeat) {
      setError('passwordRepeat', { type: 'custom', message: 'Passwords do not match' }, { shouldFocus: true });
    } else {
      const body = { name, email, password };
      api('POST', 'register', { body })
        .then((userSession) => {
          setUserSession(userSession);
          navigate('/home');
        })
        .catch((e) => {
          setErrMsg(e.message);
          console.error(e);
        });
    }
  };

  //* Errors to display

  const registerOptions = {
    name: { required: 'Name is required' },
    email: { required: 'Email is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
  };

  return (
    // Add parent component container
    <section className="cont-reg-form ">
      <div className="register-form">
        <div className="left">
          <div className="header">
            <h1>
              <span className="logo1">FAKE</span>
              <span className="logo2">FLIX</span>
            </h1>
          </div>
          <div className="header">
            <h2>Sign In</h2>
            <h4>register and enjoy the service</h4>
          </div>
          <form onSubmit={handleSubmit(handleRegistration)} id="form" className="form">
            <>
              <label htmlFor="Name" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="form-field animation a3"
                {...register('name', registerOptions.name)}
              />
              <h6>{errors?.name && errors.name.message}</h6>
            </>
            <>
              <label htmlFor="Email" />
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                className="form-field animation a3"
                {...register('email', registerOptions.email)}
              />
              <h6>{errors?.email && errors.email.message}</h6>
            </>
            <>
              <label htmlFor="Password" />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="form-field animation a4"
                {...register('password', registerOptions.password)}
              />
              <h6>{errors?.password && errors.password.message}</h6>
            </>
            <>
              <label htmlFor="Confirm password" />
              <input
                type="password"
                name="passwordRepeat"
                placeholder="Confirm password"
                className="form-field animation a4"
                {...register('passwordRepeat', registerOptions.password)}
              />
              {errors.passwordRepeat && <h6>{errors.passwordRepeat.message}</h6>}
            </>

            <button className="animation a6" type="submit">
              Submit
            </button>
            {/* Redirect to log in, in case of having and account */}
            <span className="animation a5">
              Already have an account?
              <h4 className="animation a5">
                <a style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
                  Sign In!
                </a>
              </h4>
            </span>
          </form>
        </div>
        <div className="right-reg" />
      </div>
    </section>
  );
};

export default RegisterForm;
