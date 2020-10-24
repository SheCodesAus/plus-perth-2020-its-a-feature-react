import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";

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
          <Nav className = "nav" />
          <Switch>

          
          <Route path="/transactionshistory">
            <TransactionsHistoryPage />
          </Route>

          <Route path="/home">
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