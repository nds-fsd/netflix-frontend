
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register/Register';
import Home from './pages/home/Home';


function App() {

  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
