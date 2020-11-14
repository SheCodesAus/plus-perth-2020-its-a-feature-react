import React, { useState, useEffect } from "react";
import Bucket from "../../components/Buckets/Buckets";
import LoginForm from "../../components/LoginForm/LoginForm";
import IncomeForm from "../../components/Buckets/IncomeForm";
import LandingPage from "../LandingPage/LandingPage";
import Add from "../../assets/images/add.png";
import ReactTooltip from "react-tooltip";

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
            { loading ? <h2>Loading...</h2> :
            bucketList.length > 0 ?
            bucketList.map((bucketData, key) => {
              return (
                <Bucket key={key} bucketData={bucketData} income={income} />
              );
            })
            :
            <a
            className="big-add-bucket-box"
            href="/addbucket"
            data-tip="Add new bucket"
            data-for="AddTip"
          >
            <h2>Add Bucket</h2>
            <img className= "big-add-buckets" src={Add} alt="Add" height={30}></img>
            <ReactTooltip id="AddTip" />
          </a>
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
