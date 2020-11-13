import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import Edit from "../../assets/images/edit.png";
import Add from "../../assets/images/add.png";
import Expbutton from "../../assets/images/expbutton.png";
import ReactTooltip from "react-tooltip";

function IncomeForm({ receipt, upDateIncome }) {
  const [transaction, setTransaction] = useState({
    income: 0,
  });
  const history = useHistory();

  //methods
  //set state

  const handleChange = (e) => {
    const { id, value } = e.target;
    upDateIncome(value);
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
    console.log(body);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}transactions/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(body),
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
        console.log("response is...", response);
        alert(
          "Transaction has been saved. Go to Transaction History page for previous transactions."
        );
        // history.push("/transactions");
        // window.location.reload();
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  return (
    <div className="income-form">
      <form className="incomeForm animated fadeInLeft">
        <div
          style={{
            border: "1px solid lightgray",
            padding: "2px",
            borderRadius: "3px",
            margin: "0 0.3em 0 0.3em",
          }}
        >
          <label htmlFor="income"></label>
          $
          <input
            className="input"
            type="number"
            step="50"
            id="income"
            placeholder="Enter Income"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <form>
          <input
            className="button"
            type="submit"
            id="inbutton"
            value="Save"
            onClick={handleSubmit}
          />
        </form>
      </form>
      <div className="income-form right">
        <a
          className="edit buckets"
          href="/edit-buckets"
          data-tip="Edit buckets"
          data-for="EditTip"
        >
          <img src={Edit} alt="Edit image" height={30}></img>
          <ReactTooltip id="EditTip" />
        </a>

        <a
          className="edit buckets"
          href="/addbucket"
          data-tip="Add new bucket"
          data-for="AddTip"
        >
          <img src={Add} alt="Add" height={30}></img>
          <ReactTooltip id="AddTip" />
        </a>
        <a
          className="edit buckets"
          href="/expenses"
          data-tip="Edit expenses"
          data-for="ExpTip"
        >
          <img src={Expbutton} alt="Exp" height={30}></img>
          <ReactTooltip id="ExpTip" />
        </a>
      </div>
    </div>
  );
}
export default IncomeForm;
