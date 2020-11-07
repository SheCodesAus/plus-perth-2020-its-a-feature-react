import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./SideNavBar.css";
import { isAuthenticated, clearStorage } from "../../helpers/localStorage";
import AddBucketPage from "../../pages/AddBucketPage/AddBucketPage";

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
  console.log("auth", isAuthenticated(), "loggedin", isloggedin);
  return (
    <Menu>
      {isloggedin ? (
        <a className="menu-item" href="/">
          Home
        </a>
      ) : (
        <a className="menu-item" href="/login">
          Login
        </a>
      )}
      {isloggedin ? (
        <a className="menu-item" href="/addbucket">
          Add Bucket
        </a>
      ) : null}
      {isloggedin ? (
        <a className="menu-item" href="/transactions">
          History
        </a>
      ) : (
        <a className="menu-item" href="/signup">
          Sign Up
        </a>
      )}
      {isloggedin ? (
        <Link className="bm-item.menu-item" to="/" onClick={handleLogout}>
          Logout {clearStorage}
        </Link>
      ) : null}
    </Menu>
  );
};
