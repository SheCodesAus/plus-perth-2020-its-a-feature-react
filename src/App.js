import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SideNavBar from "./components/SideNavBar/SideNavBar";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TransactionsHistoryPage from "./pages/TransactionsHistoryPage/TransactionsHistoryPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import EditAllBucketsPage from "./pages/EditAllBuckets/EditAllBuckets";
import TransactionDetailPage from "./pages/TransactionDetailPage/TransactionsDetailPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <SideNavBar className="nav" />
          <Route path="/">
            <Header />
          </Route>
          <div>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>

              <Route path="/signup">
                <SignUpPage />
              </Route>

              <Route path="/transactions/:id">
                <TransactionDetailPage />
              </Route>

              <Route path="/transactions">
                <TransactionsHistoryPage />
              </Route>

              <Route path="/transactions-page">
                <TransactionsPage />
              </Route>

              <Route path="/edit-buckets">
                <EditAllBucketsPage />
              </Route>

              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
