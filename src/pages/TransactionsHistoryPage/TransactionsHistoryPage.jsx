import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TransactionHistory.css";

function TransactionsHistoryPage() {
  const [transactionList, setTransactionList] = useState([]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}transactions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        /// check response.status for status code too as response.ok only checks for server errors!
        setTransactionList(data);
        // console.log(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="trans-hist-page">
        <h1>Transaction History</h1>
      </div>

      {transactionList ? (
        <div className="trans-hist-page animated fadeInLeft">
          {transactionList.map((transactionData) => (
            <Link to={`/transactions/${transactionData.id}`}>
              <div key={transactionData.id} className="hist-tile">
                <span>
                  <h3>${transactionData.income.toLocaleString("en")}</h3>
                  <h4>
                    {" "}
                    {transactionData.date_created.slice(8, 10)}
                    {"/"}
                    {transactionData.date_created.slice(5, 7)}
                    {"/"}
                    {transactionData.date_created.slice(0, 4)}
                    <br></br>
                    {transactionData.date_created.slice(11, 16)}
                  </h4>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
          <h3>No transactions</h3>
        )}
    </div>
  );
}

export default TransactionsHistoryPage;
