import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Expenses from "../components/Expenses/Expenses";
import ExpenseForm from "../components/Expenses/ExpenseForm";

function ExpensesPage() {
  const [expenseList, setExpenseList] = useState([]);
  const token = window.localStorage.getItem("token");

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

  return (
    <div>
      {token != null ? (
        <div>
          <div className="trans-hist-page">
            <h1>Expenses</h1>
          </div>
          {expenseList ? (
            <div className="animated fadeInLeft">
              <ul>
                {expenseList.map((exp) => (
                  <div key={exp.id}>
                    <li>
                      {exp.name}: ${exp.monthly_exp_amt.toLocaleString("en")}{" "}
                      {exp.bucket_name}
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
