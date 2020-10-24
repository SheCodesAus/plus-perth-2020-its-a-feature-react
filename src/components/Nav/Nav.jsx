import React,{useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import "./Nav.css";
// import { clearStorage } from "../../helpers/localStorage";
// import { getStorage } from "../../helpers/localStorage";


function Nav(){
    return(
        <nav id = "nav-container">
             <Link className = "nav-text" to="/home">Transactions</Link>
             <Link className = "nav-text" to="/transactionshistory">TransactionsHistory</Link>
        </nav>

    )
}


export default Nav;

