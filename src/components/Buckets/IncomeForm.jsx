import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import Button from "../../components/Button/Button";
import { getStorage, setStorage } from "../../helpers/localStorage";

function IncomeForm({ receipt }) {
  //   console.log("map receipt is...", receipt);
  const [transaction, setTransaction] = useState({
    income: "",
  });

  //   console.log("receipt is... ", receipt);
  //methods
  //set state

  const handleChange = (e) => {
    const { id, value } = e.target;

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [id]: value,
    }));

    console.log("transaction  is...", transaction);
  };

  const postData = async () => {
    let token = window.localStorage.getItem("token");
    const body = {
      income: transaction.income,
      receipt: JSON.stringify(receipt),
    };
    console.log({ body });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}transactions/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body,
      }
    );
    console.log("post response is...", response);
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transaction.income) {
      console.log("transaction is...", transaction);

      postData().then((response) => {
        console.log("respose is...", response);

        // window.location.reload();
      });
    }
  };
  return (
    <form className=" animated fadeInLeft">
      <label htmlFor="income"></label>
      <input
        className="input"
        type="text"
        id="income"
        placeholder="Enter Income"
        onChange={handleChange}
      />

      <Button
        id="incomebutton"
        value="Submit"
        onClick={handleSubmit}
        value="Calculate"
      />
    </form>
  );
}
export default IncomeForm;
