import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TransactionsHistoryPage from "./pages/TransactionsHistoryPage/TransactionsHistoryPage";
import EditAllBucketsPage from "./pages/EditAllBuckets/EditAllBuckets";
import TransactionDetailPage from "./pages/TransactionDetailPage/TransactionsDetailPage";
import AddBucketPage from "./pages/AddBucketPage/AddBucketPage";
import DeleteTransactionPage from "./pages/Delete/DeleteTransactionPage";
import DeleteBucketPage from "./pages/Delete/DeleteBucketPage";
import ExpensesPage from "./pages/ExpensesPage";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";

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

              {localStorage.token ? (
                <Route path="/delete/:id">
                  <DeleteTransactionPage />
                </Route>
              ) : null}

              {localStorage.token ? (
                <Route path="/delete-bucket/:id">
                  <DeleteBucketPage />
                </Route>
              ) : null}

              {localStorage.token ? (
                <Route path="/transactions/:id">
                  <TransactionDetailPage />
                </Route>
              ) : null}

              {localStorage.token ? (
                <Route path="/transactions">
                  <TransactionsHistoryPage />
                </Route>
              ) : null}

              {localStorage.token ? (
                <Route path="/addbucket">
                  <AddBucketPage />
                </Route>
              ) : null}
              {localStorage.token ? (
                <Route path="/edit-buckets">
                  <EditAllBucketsPage />
                </Route>
              ) : null}

              {localStorage.token ? (
                <Route path="/expenses">
                  <ExpensesPage />
                </Route>
              ) : null}
              <Route path="/home">
                <LandingPage />
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
