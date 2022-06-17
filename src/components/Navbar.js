import React, {useState,useEffect} from "react";
import { Link, Outlet } from "react-router-dom";
import './../components/Navbar.css';



const Navbar = () => {
    
    const [scrollHeight, setScrollHeight] =useState(0);

  const handleScrollHeight = () => {
    const position = window.pageYOffset;
    setScrollHeight(position);
  }

    useEffect ( () => {
      window.addEventListener ('scroll', handleScrollHeight)
           
    }, [""] )

    return (
       
         <div className = 'container' >
          <nav className = { scrollHeight > 20 ? 'nav':'nav-2'} >
                        <h1> <span className="logo1">FAKE</span><span className="logo2">FLIX</span> </h1>
                        <ul className="lista">
                            <li>
                                <Link to="home"> Home </Link>
                            </li>
                            <li>
                                <Link to ="movies"> Movies </Link>
                            </li>
                            <li>
                                 <Link to ="news"> News </Link>
                            </li>
                            <li>
                                 <Link to="mylist"> My list </Link>
                            </li>
                        </ul>   
                <div className="search">
                        <input type="search" placeholder="Search your movie"></input>
             </div>
             <button className="button">Search</button>
         </nav>                
          <Outlet />
        </div>
        
        
  );
};


export default Navbar;

