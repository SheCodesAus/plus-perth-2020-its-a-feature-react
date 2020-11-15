import React, { useState, useEffect } from "react";
import Expenses from "../components/Expenses/Expenses";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import "../components/Expenses/Expenses.css";

const formatBucketList = (data) => {
  let bucketList = [];

  const addBuckets = (buckets, depth = 0) => {
    buckets.forEach((b) => {
      bucketList.push({ ...b, depth });
      addBuckets(b.children, depth + 1);
    });
  };

  addBuckets(data);

  return bucketList;
};

function ExpensesPage(props) {
  const [expenseList, setExpenseList] = useState([]);
  const token = window.localStorage.getItem("token");
  const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}buckets/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        const bucketList = formatBucketList(data);
        setBucketList(bucketList);
      });
  }, []);

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
      <div className="expense-container animated fadeInLeft">
        {token != null ? (
          <div>
            <div className="expense-header animated fadeInLeft">
              <h1>Expenses</h1>
            </div>

            {expenseList ? (
              <div className="expense-box animated fadeInLeft">
                <div>
                  {expenseList.map((exp) => (
                    <div className="expenses-list">
                      <Expenses
                        key={exp.id}
                        expense={exp}
                        bucketList={bucketList}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <ExpenseForm bucketList={bucketList} />
          </div>
        ) : (
          "No Token"
        )}
      </div>
    </div>
  );
}

export default ExpensesPage;
