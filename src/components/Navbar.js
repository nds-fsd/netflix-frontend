import React from "react";
import { Link, Outlet } from "react-router-dom";
import './../components/Navbar.css';


const Navbar = () => {
    return (
       
         <div className="container">
          <nav className="nav">
                        <h1> <span className="logo1">FAKE</span><span className="logo2">FLIX</span> </h1>
                        <ul className="lista">
                            <li>
                                <Link to="Home"> Home </Link>
                            </li>
                            <li>
                                <Link to ="Movies"> Movies </Link>
                            </li>
                            <li>
                                 <Link to ="News"> News </Link>
                            </li>
                            <li>
                                 <Link to="MyList"> My list </Link>
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