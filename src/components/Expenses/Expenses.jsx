import React, { useState } from "react";
import DeleteExpense from "../Delete/DeleteExpense";

const makeSpaces = (n) => Array.from(Array(n * 3)).join("\xA0\xA0");

function Expenses({ expense, bucketList }) {
  const [exp, setExpense] = useState(expense);
  const token = window.localStorage.getItem("token");

  let dropDownBucketList = bucketList.map((s) => {
    return (
      <option key={s.name} value={s.id}>
        {s.depth === 0 ? "\u203A" : makeSpaces(s.depth)} {s.name}
      </option>
    );
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [id]: value,
    }));
  };

  const postExpense = async (expID) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}expenses/${expID}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(exp),
      }
    );
    console.log("Expense Put is", exp);
    return response.json();
  };

  const handleSubmit = (e, expID, expNAME) => {
    e.preventDefault();
    postExpense(expID).then((response) => {
      // window.location.reload();
      alert(`Expense: "${response.name}" updated`);
      console.log("put is", response);
    });
  };

  return (
    <div>
      <label htmlFor="name"></label>
      <input
        type="text"
        id="name"
        defaultValue={exp.name}
        onChange={handleChange}
      />
      <label htmlFor="monthly_exp_amt"></label>
      $
      <input
        className="input-val"
        type="number"
        id="monthly_exp_amt"
        defaultValue={exp.monthly_exp_amt}
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
        onClick={(e) => {
          handleSubmit(e, exp.id);
        }}
      >
        Update
      </button>
      <DeleteExpense key={exp.id} expense={expense} />
    </div>
  );
}
export default Expenses;
