import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

const makeSpaces = (n) => Array.from(Array(n + 1)).join("\xA0\xA0");

function ExpenseForm({ bucketList }) {
  const [Expense, setExpense] = useState({});
  const token = window.localStorage.getItem("token");

  const history = useHistory();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [id]: value,
    }));
    console.log(Expense);
  };

  const postDataExpense = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}expenses/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(Expense),
    });
    console.log("Expense is", Expense);
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Expense.name) {
      postDataExpense().then((response) => {
        alert(`"${response.name}" Expense added to "${response.bucket_name}"`);
        window.location.reload();

        console.log("response is", response);
      });
    }
  };

  let dropDownBucketList = bucketList.map((s) => {
    return (
      <option key={s.name} value={s.id}>
        {s.depth === 0 ? "\u203A" : makeSpaces(s.depth)} {s.name}
      </option>
    );
  });

  return (
    <form>
      <div className="expense-box animated fadeInLeft">
        <div className="newexpense-container">
          <div>
            <label htmlFor="name"></label>
            <input
              style={{ fontSize: "smaller" }}
              type="text"
              id="name"
              onChange={handleChange}
              placeholder="New Expense Name"
            />
            <label htmlFor="monthly_exp_amt"></label>$
            <input
              style={{ fontSize: "smaller" }}
              type="number"
              id="monthly_exp_amt"
              onChange={handleChange}
              placeholder="Monthly Exp"
            />
            <label htmlFor="bucket_id"></label>
            <select
              style={{ fontSize: "smaller" }}
              type="select"
              id="bucket_id"
              placeholder="Select Bucket"
              onChange={handleChange}
            >
              <option> Select a bucket</option>

              {dropDownBucketList}
            </select>
            <button id="exbutton" type="submit" onClick={handleSubmit}>
              &nbsp; Add &nbsp;
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
