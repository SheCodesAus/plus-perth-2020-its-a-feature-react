import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Bucket_img from "../../assets/images/bucket.png";
import TransactionHistory from "../../pages/TransactionsHistoryPage/TransactionHistory.css";
import Coin from "../../assets/images/coin.png";
import "../../components/Coins/coin.css"
import Coins from "../../components/Coins/coin"
import Button from "../../components/Button/Button";

function TransactionsHistoryPage() {
  const [transactionList, setTransactionList] = useState();

  useEffect(async () => {
    const token = window.localStorage.getItem("token");

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
      {/* <div>
        <img className="coin-pic" alt="coin" src={Coin}/>
        <Button onClick={Coins}/>
      </div> */}
      {transactionList ? (
        <div className="trans-hist-page">
          {transactionList.map((trans) => (
            <Link to={`/transactions/${trans.id}`}>
              <div key={trans.id} className="hist-tile">
                <h4>
                  #{trans.id}: <br></br>
                  {trans.date_created.slice(0, 10)} <br></br> $
                  {trans.income.toLocaleString("en")}
                </h4>
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
