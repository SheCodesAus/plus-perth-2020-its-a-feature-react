import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Bucket_img from "../../assets/images/bucket.png";
import TransactionHistory from "../../pages/TransactionsHistoryPage/TransactionHistory.css";

function TransactionsHistoryPage() {
  const [transactionList, setTransactionList] = useState([]);
  const token = window.localStorage.getItem("token");

  useEffect(async () => {
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
      console.log(data);
    }
  }, []);

  return (
    <div>
      <h1>Transaction History</h1>

      {transactionList ? (
        <div className="trans-hist-page">
          {transactionList.map((transactionData) => (
            <Link to={`/transactions/${transactionData.id}`}>
              <div key={transactionData.id} className="hist-tile">
                <span>
                  <h3>#{transactionData.id}</h3>
                  <h4>
                    {" "}
                    {transactionData.date_created.slice(8, 10)}
                    {"/"}
                    {transactionData.date_created.slice(5, 7)}
                    {"/"}
                    {transactionData.date_created.slice(0, 4)}{" "}
                    {transactionData.date_created.slice(11, 16)}
                    <br></br>${transactionData.income.toLocaleString("en")}
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
