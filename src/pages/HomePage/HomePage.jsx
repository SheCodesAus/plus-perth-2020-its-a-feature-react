import React, { useState, useEffect } from "react";
import { oneBucket } from "../../data";
import TransactionBucket from "../../components/Buckets/Buckets";

function HomePage() {
  const [bucketList, setBucketList] = useState([]);
  useEffect(() => {
    setBucketList(oneBucket);
  }, []);
  console.log(bucketList);

  return (
    //<p> Hi</p>
    <div id="bucket-list">
      {bucketList.map((bucketData, key) => {
        return <TransactionBucket key={key} bucketData={bucketData} />;
      })}
    </div>
  );
}

export default HomePage;
