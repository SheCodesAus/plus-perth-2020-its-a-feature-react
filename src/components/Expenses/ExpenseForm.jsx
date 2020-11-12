import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
// import Button from "../Button/Button";

function ExpenseForm(props) {
  const [Expense, setExpense] = useState({});
  const [bucketList, setBucketList] = useState([]);
  const token = window.localStorage.getItem("token");

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
        window.location.reload();
        console.log("response is", response);
      });
    }
  };

  let dropDownBucketList = bucketList.map((s) => {
    return (
      <option key={s.name} value={s.id}>
        {s.name}
      </option>
    );
  });

  return (
    <form>
      <div className=" trans-hist-page animated fadeInLeft">
        <li>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            placeholder="Expense Name"
          />

          <label htmlFor="monthly_exp_amt"></label>
          <input
            type="number"
            id="monthly_exp_amt"
            onChange={handleChange}
            placeholder="Monthly Amount"
          />

          <label htmlFor="bucket_id"></label>
          <select
            type="select"
            id="bucket_id"
            placeholder="Select Bucket"
            onChange={handleChange}
          >
            <option></option>
            {dropDownBucketList}
          </select>
          <button onClick={handleSubmit}>Add</button>

          {/* <Button value="Add" onClick={handleSubmit} /> */}
        </li>
      </div>
    </form>
  );
}

export default ExpenseForm;
