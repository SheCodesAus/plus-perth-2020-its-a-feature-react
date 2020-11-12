import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Expenses from "../components/Expenses/Expenses";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import "../components/Expenses/Expenses.css";

function ExpensesPage() {
  const [expenseList, setExpenseList] = useState([]);
  const [newExpense, setNewExpense] = useState();
  const token = window.localStorage.getItem("token");
  const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}bucketlist/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setBucketList(data);
      });
  }, []);

  let dropDownBucketList = bucketList.map((s) => {
    return (
      <option key={s.name} value={s.id}>
        {s.name}
      </option>
    );
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}expenses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setExpenseList(data);
      });
  }, [token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setExpenseList((prevExpenseList) => ({
      ...prevExpenseList,
      [id]: value,
    }));
    console.log(expenseList);
  };

  return (
    <div>
      {token != null ? (
        <div>
          <div className="trans-hist-page">
            <h1>Expenses</h1>
          </div>
          {expenseList ? (
            <div className=" animated fadeInLeft">
              <ul>
                {expenseList.map((exp) => (
                  <div className="expenses-list" key={exp.id}>
                    {/* <li>
                      {exp.name}: ${exp.monthly_exp_amt.toLocaleString("en")}{" "}
                      {exp.bucket_name}
                    </li> */}
                    <li>
                      <input type="text" id="name" value={exp.name} />
                      <input
                        type="number"
                        id="monthly_exp_amt"
                        value={exp.monthly_exp_amt}
                        onChange={handleChange}
                      />
                      <select
                        type="select"
                        id="bucket_id"
                        value={exp.bucket_id}
                        onChange={handleChange}
                      >
                        <option></option>
                        {dropDownBucketList}
                      </select>
                      <button onChange={handleChange}>Update</button>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            <ExpenseForm />
          </div>
        </div>
      ) : (
        "No Token"
      )}
    </div>
  );
}

export default ExpensesPage;
