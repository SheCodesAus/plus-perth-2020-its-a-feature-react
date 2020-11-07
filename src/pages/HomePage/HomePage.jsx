import React, { useState, useEffect } from "react";
import {Link, useParams, useHistory} from "react-router-dom";

import Bucket from "../../components/Buckets/Buckets";
import LoginForm from "../../components/LoginForm/LoginForm";
import IncomeForm from "../../components/Buckets/IncomeForm";
import Edit from "../../assets/images/edit.png";

function HomePage() {
  const [bucketList, setBucketList] = useState([]);
  const token = window.localStorage.getItem("token");
  const [income, setIncome] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}buckets`, {
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
  }, [token]);

  const upDateIncome = (income) => {
    setIncome(income);
  };

  return (
    <div>
      {token != null ? (
        <div>
          <IncomeForm receipt={bucketList} upDateIncome={upDateIncome} />
          {/* <Link to={`/edit-buckets`}> 
              <img src={Edit} alt="Edit" height={30}></img>
          </Link> */}
          <div id="bucket-list">
            {bucketList.map((bucketData, key) => {
              return (
                <Bucket key={key} bucketData={bucketData} income={income} />
              );
            })}
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default HomePage;
