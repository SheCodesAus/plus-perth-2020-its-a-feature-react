import React, { useState, useEffect } from "react";
import { oneBucket } from "../../data";
import Bucket from "../../components/Buckets/Buckets";
import { getStorage } from "../../helpers/localStorage";

function HomePage() {
  const [bucketList, setBucketList] = useState([]);
  const token = window.localStorage.getItem("token");
  console.log(token);
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
  }, []);
  console.log(bucketList);

  return (
    //<p> Hi</p>
    <div id="bucket-list">
      {bucketList.map((bucketData, key) => {
        return <Bucket key={key} bucketData={bucketData} />;
      })}
    </div>
  );
}

export default HomePage;
