import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Expenses from "../components/Expenses/Expenses";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import "../components/Expenses/Expenses.css";
// import Pen from "../assets/images/feather-pen-clipart.jpg"

function ExpensesPage(props) {
  const [expenseList, setExpenseList] = useState([]);
  const [newExpense, setNewExpense] = useState();
  const [expense, setExpense] = useState({
    // id: props.id,
  });
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
    setExpense((prevExpense) => ({
      ...prevExpense,
      [id]: value,
    }));
    console.log(expense);
  };

  const postExpense = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}expenses/${expense.id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(expense),
      }
    );
    console.log("Expense Put is", expense);
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.name) {
      postExpense().then((response) => {
        // history.push("/edit-buckets");
        console.log("put is", response);
      });
    }
  };

  // const handleKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     handleSubmit();
  //   }
  // };

  return (
    <div>
      <div className="expense-container">
        {token != null ? (
          <div>
            <div className="expense-header">
              <h1>Expenses</h1>
            </div>

            {expenseList ? (
              <div className="expense-box animated fadeInLeft">
                <div>
                  {expenseList.map((exp) => (
                    <div
                      className="expenses-list"
                      key={exp.id}
                      onChange={handleChange}
                    >
                      <div>
                        <label htmlFor="name"></label>
                        <input
                          type="text"
                          id="name"
                          placeholder={exp.name}
                          onChange={handleChange}
                        />
                        <label htmlFor="monthly_exp_amt"></label>
                        <input
                          type="number"
                          id="monthly_exp_amt"
                          placeholder={exp.monthly_exp_amt}
                          onChange={handleChange}
                        />
                        <label htmlFor="bucket_id"></label>
                        <select
                          type="select"
                          id="bucket_id"
                          value={exp.bucket_id}
                          onChange={handleChange}
                        >
                          <option></option>
                          {dropDownBucketList}
                        </select>
                        <button
                          id="exbutton"
                          type="submit"
                          onClick={(id) => {
                            handleSubmit(id);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <ExpenseForm />

            <div>{/* <img src={Pen} alt="Pen" height={100}></img> */}</div>
          </div>
        ) : (
          "No Token"
        )}
      </div>
    </div>
  );
}

export default ExpensesPage;
