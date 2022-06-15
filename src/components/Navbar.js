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
           
    }, [] )

    return (
       
         <div className = 'container' >
          <nav className = { scrollHeight > 20 ? 'nav':'nav-2'} >
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




// const [color, setColor] = useState ("transparent")
//     const listenScrollEvent = () => {
//        window.scrollY > 10 ? setColor ("#E4E4E4") : setColor ("transparent");
//        window.scrollY > 10 ? setnavSize ("5rem")  : setnavSize ("10rem");
//      };

//      useEffect( () => {
//      window.addEventListener("scroll", listenScrollEvent);
//         return () => {
//             window.removeEventListener("scroll", listenScrollEvent);
//         };
//     }, []);