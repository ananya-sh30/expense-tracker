import React, {useState} from "react";
import "./styles/Navbar.css";
import logo from '../assets/logo.png'; 
import { useNavigate } from "react-router-dom";

function Navbar(props){
  const navigate2 = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const handleSignIn = () =>{
    if (!isSignedIn) {
      setIsSignedIn(true); 
      navigate2("/signin");
       
    }
      
  };
  return (
    <nav className="navbar">
      <div className="logo"><img src={logo} alt="logo" className="logo"/></div>
      <div className="wbName">SpendSight</div>
    
      <ul className="nav-right-links">
        {!props.user ? (
          <li className="signin">
            <li className="signin"><a href="#signIn" onClick={handleSignIn}>Sign In</a></li> 
          </li>
        ) : (
          <li className="signin">{props.user}</li> 
        )}
        <li className="contactBtn"><a href="#demo" className="btn-demo">Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
