import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Nav from "./components/Nav/Nav";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import TransactionsHistoryPage from "./pages/TransactionsHistoryPage/TransactionsHistoryPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";


function App(){

  return(
    <div className = "App">
      <div>
      
        <Router>
        <div >
          <SideNavBar className = "nav" />
          <Switch>

          
          <Route path="/TransactionsHistoryPage">
            <TransactionsHistoryPage />
          </Route>

          <Route path="/TransactionsPage">
            <TransactionsPage />
          </Route>


          <Route path="/">
            <HomePage />
          </Route>
          
        </Switch>
        </div>
        </Router>
    </div>
    </div>
  )
}

export default App;