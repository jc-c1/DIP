import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
  let nav = props.user ? (
    <div className="container">
      <div className="row">
      <div className="col" >
      <span id="DIP"> D I P </span></div>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <div className="col" id="link">
          <span className="NavBar-welcome"  >WELCOME, {props.user.name}</span>
        
          
          <Link  to="" className="NavBar-link" onClick={props.handleLogout}>
            LOG OUT
          </Link>

        </div>
      </div>
    </div>
  ) : (
    <div>
      <Link to="/login" className="NavBar-link">
        LOG IN
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup" className="NavBar-link">
        SIGN UP
      </Link>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
