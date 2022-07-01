import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import News from './pages/News'
import Movies from './pages/Movies'
import MyList from './pages/MyList'
import Register from './components/register/Register'
import LogIn from './components/logIn/LogIn'

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* navbar with Scroll */}
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='home' element={<Home />} />
            <Route path='movies' element={<Movies />} />
            <Route path='news' element={<News />} />
            <Route path='mylist' element={<MyList />} />
            <Route path='login' element={<LogIn />} />
          </Route>
          <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
