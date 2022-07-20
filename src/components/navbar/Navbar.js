import React, { useState, useEffect } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { hasUserSession, removeUserSession } from '../../utils/sesion';
import LogoutBtn from '../logout/Logout';

const Navbar = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const navigate = useNavigate();

  const handleScrollHeight = () => {
    const position = window.pageYOffset;
    setScrollHeight(position);
  };

  //* erase usertoken and redirects to login
  const clickLogout = () => {
    removeUserSession();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollHeight);
  }, []);

  return (
    <>
      {!hasUserSession() && <Navigate to="/login" replace />}
      {hasUserSession() && (
        <div className="container">
          <nav className={scrollHeight > 20 ? 'nav' : 'nav-2'}>
            <div className="container_logo">
              <h1>
                <span className="logo1">FAKE</span>
                <span className="logo2">FLIX</span>{' '}
              </h1>
            </div>

            <ul className="lista">
              <li>
                <Link to="home"> Home </Link>
              </li>
              <li>
                <Link to="movies"> Movies </Link>
              </li>
              <li>
                <Link to="news"> News </Link>
              </li>
              <li>
                <Link to="mylist"> My list </Link>
              </li>
            </ul>
            <div className="container_search">
              <input type="text" placeholder="Search your title 🔍" />
            </div>
            <div className="container_button">
              <button className="button" type="button">
                Search
              </button>
            </div>
            <div className="logout">
              <LogoutBtn clickLogout={clickLogout} />
            </div>
          </nav>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Navbar;
