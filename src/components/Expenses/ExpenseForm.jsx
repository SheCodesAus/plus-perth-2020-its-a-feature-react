import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Button from "../Button/Button";

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
    <form className="addBucketForm">
      <div className="Addbucket Addanimated fadeInLeft">
        <div>
          <label htmlFor="name">
            Expense Name<br></br>
          </label>
          <input type="text" id="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="monthly_exp_amt">Monthly Expense Amount</label>
          <input type="number" id="monthly_exp_amt" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="bucket_id">
            Select a Bucket for this expense
            <br></br>
          </label>
          <select type="select" id="bucket_id" onChange={handleChange}>
            <option value=""></option>
            {dropDownBucketList}
          </select>
        </div>

        <div>
          <Button value="Submit" onClick={handleSubmit} />
        </div>
        <Link to="/">Cancel</Link>
      </div>
    </form>
  );
}

export default ExpenseForm;
