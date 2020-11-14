import React, { useState, useEffect } from "react";
import "../Buckets.css";
import { Link } from "react-router-dom";
import ViewBucket from "../../Buckets/ViewBucket/ViewBucket";

function BucketContainer({ bucketData, depth, children }) {
  // const {income} = props
  // const [hasEnough, setHasEnough] = useState(false)
  // const [calculation, setCalculation] = useState(0);
  const getClassName = () => {
    //   if (depth == 0) {
    return "bucket";
    //   }
    //   else {
    //     return 'bucket bucket-child'
    //   }
  };
  return (
    <div>
      <div
        key={bucketData.id}
        className="bucket"
        style={
          bucketData.children.length !== 0 &&
          depth !== 0 &&
          bucketData.id < bucketData.children.length
            ? { borderRight: "5px solid white" }
            : null
        }
      >
        <span>{children}</span>
      </div>
    </div>
  );
}

export default BucketContainer;
