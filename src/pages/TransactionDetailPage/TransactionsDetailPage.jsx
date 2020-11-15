import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Delete from "../../assets/images/delete.png";
import Bucket from "../../components/Buckets/Buckets";
import DeleteTransactionHistory from "../Delete/DeleteTransactionPage";

function TransactionDetailPage() {
  const { id } = useParams();

  const [transaction, setTransaction] = useState();
  const [receipt, setReceipt] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return;
    }
    console.log("id is... ", id);
    async function fetchData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}transactions/${id}`,
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
        const parsed = JSON.parse(data.receipt);
        console.log(parsed);
        setTransaction(data);
        setReceipt(parsed);
      }
    }
    fetchData();
  }, [id]);

  // console.log("receipt...", receipt);
  // console.log("transaction...", transaction);

  return transaction ? (
    <div
      className=" animated fadeInLeft"
      style={{ justifyContent: "center", position: "sticky" }}
    >
      <div key={transaction.id} className="hist-tile detail">
        <span>
          <h3>${transaction.income.toLocaleString("en")}</h3>
          <h4>
            {" "}
            {transaction.date_created.slice(8, 10)}
            {"/"}
            {transaction.date_created.slice(5, 7)}
            {"/"}
            {transaction.date_created.slice(0, 4)}
            <br></br>
            {transaction.date_created.slice(11, 16)}
          </h4>
          <DeleteTransactionHistory id={transaction.id} />
        </span>
      </div>

      <div id="bucket-list">
        {receipt
          ? receipt.map((bucketData, key) => {
              return (
                <Bucket
                  key={key}
                  bucketData={bucketData}
                  income={transaction.income}
                />
              );
            })
          : null}
      </div>
    </div>
  ) : null;
}

export default TransactionDetailPage;
