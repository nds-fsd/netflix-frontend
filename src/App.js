import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import MyList from './pages/myList/MyList';
import RegisterForm from './pages/register/RegisterForm';
import LogIn from './pages/login/LogIn';
import Admin from './pages/admin/Admin';
import PrivateRoute from './utils/PrivateRoute';
import Player from './components/player/Player';
import WatchLaterList from './pages/watchLater/WatchLater';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="player" element={<Player />} />
          <Route path="/" element={<Navbar />}>
            <Route path="home" element={<Home />} />
            <Route path="mylist" element={<MyList />} />
            <Route path="watchlater" element={<WatchLaterList />} />
            <Route
              path="admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
