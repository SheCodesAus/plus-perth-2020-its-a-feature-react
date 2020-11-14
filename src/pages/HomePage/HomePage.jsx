import React, { useState, useEffect } from "react";
import Bucket from "../../components/Buckets/Buckets";
import LoginForm from "../../components/LoginForm/LoginForm";
import IncomeForm from "../../components/Buckets/IncomeForm";
import LandingPage from "../LandingPage/LandingPage";

function HomePage() {
  const [bucketList, setBucketList] = useState([]);
  const token = window.localStorage.getItem("token");
  const [income, setIncome] = useState();
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    setLoading(true)
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
        setLoading(false);
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

          <div id="bucket-list">
            { loading ? <h2>Loading</h2> :
            bucketList.length > 0 ?
            bucketList.map((bucketData, key) => {
              return (
                <Bucket key={key} bucketData={bucketData} income={income} />
              );
            })
            :
            <h2>"Add bucket"</h2>
      }
          </div>
        </div>
      ) : (
        // <LoginForm />
        <LandingPage />
      )}
    </div>
  );
}

export default HomePage;
