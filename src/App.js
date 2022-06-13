import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import News from './pages/News';
import Movies from './pages/Movies';
import MyList from './pages/MyList';

function App() {
  return (
    <div>
        
        <BrowserRouter>
        {/*hladgnld */}
        <Routes>
          <Route path='/' element = {<Navbar /> } >         
            <Route path="Home" element = {<Home />} />
            <Route path="Movies" element = {<Movies />} />
            <Route path="News" element = {<News />} />                  
            <Route path="MyList" element = {<MyList />} />
          </Route> 
        </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;

