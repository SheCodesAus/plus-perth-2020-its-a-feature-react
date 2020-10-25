import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import "./SideNavBar.css";

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/login">
        Login
      </a>
      <a className="menu-item" href="/signup">
        Sign Up
      </a>
      <a className="menu-item" href="/TransactionsHistoryPage">
        Transaction History
      </a>
      <a className="menu-item" href="/TransactionsPage">
        Transaction Detail
      </a>
    </Menu>
  );
};