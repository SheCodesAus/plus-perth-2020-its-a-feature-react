import React from 'react'
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import "./Header.css"

function Header() {
    return (
        <Link className="header" to="/">
            <img className="main-logo" src={Logo} alt="main logo"/>
        </Link>
    )
}

export default Header