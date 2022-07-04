import './App.css'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import News from './pages/news/News'
import Movies from './pages/movies/Movies'
import MyList from './pages/myList/MyList'
import Register from './pages/register/Register'
import LogIn from './pages/login/LogIn'
import {AuthProvider} from "./context/AuthProvider";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='login' element={<LogIn />} />
            <Route path='register' element={<Register />} />
            <Route path='/' element={<Navbar />}>
              <Route path='home' element={<Home />} />
              <Route path='movies' element={<Movies />} />
              <Route path='news' element={<News />} />
              <Route path='mylist' element={<MyList />} />
            </Route>
          </Routes>
        </AuthProvider>
        {/* navbar with Scroll */}

      </BrowserRouter>
    </div>
  )
}

export default App
