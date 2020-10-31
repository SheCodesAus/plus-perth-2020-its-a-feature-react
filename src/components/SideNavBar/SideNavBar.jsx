import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";

import { slide as Menu } from "react-burger-menu";
import "./SideNavBar.css";
import {
  isAuthenticated,
  clearStorage,
  getStorage,
} from "../../helpers/localStorage"

export default (props) => {
    const [isloggedin, setisloggedin] = useState(false);
    const location = useLocation();
    //method
    useEffect(() => {
    isAuthenticated() ? setisloggedin(true) : setisloggedin(false);
    }, [location]);
    const handleLogout = () => {
    clearStorage();
    };
    let user = window.localStorage.getItem("user");
    console.log(user);
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
            {isloggedin ? (
          <Link className="bm-item.menu-item" to="/login" onClick={handleLogout}>
            Logout {getStorage}
          </Link>
        ) : (
          <Link id="nav-link" to="/login">
            Login
          </Link>
        )}
         {isloggedin ? (
           null ):(
      <a className="menu-item" href="/signup">
        Sign Up
      </a>
      )}
      
      <a className="menu-item" href="/transactions">
        Transaction History
      </a>
      <a className="menu-item" href="/transactions/:id">
        Transaction Detail
      </a>
    </Menu>
  );
};
