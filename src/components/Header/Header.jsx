import React, { useEffect, useState } from 'react'

import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import "./Header.css"
import {
    isAuthenticated,
    clearStorage,
    getStorage,
  } from "../../helpers/localStorage"

function Header() {
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
        <div>
            {isloggedin ? (
          <p id="user_name">
              Hello {user} <br/>
              <Link to ="/home" onClick={handleLogout}>
          Logout {clearStorage}
        </Link>
          </p>
        ) : (
          ""
        )}
        
        <Link className="header" to="/">
            <img className="main-logo" src={Logo} alt="main logo"/>
        </Link>
        </div>
    )
}

export default Header