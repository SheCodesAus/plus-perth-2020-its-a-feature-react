import React, { useState, useEffect } from "react";
import "../Buckets.css";
import ViewBucket from "../../Buckets/ViewBucket/ViewBucket"


function BucketContainer({ bucketData, depth, income, children }, props) {

  // const {income} = props
  const [hasEnough, setHasEnough] = useState(false)
  const [calculation, setCalculation] = useState(0);
  const getClassName = () => {
    //   if (depth == 0) {
    return 'bucket';
    //   }
    //   else {
    //     return 'bucket bucket-child'
    //   }
  };
  useEffect(() => {
    console.log("use effect", income)
    if (income) {
    const amount = (bucketData.percentage / 100) * income
    setCalculation(amount)
   const notEnough = (amount < bucketData.min_amt)
      setHasEnough(notEnough)
      console.log(amount)
    }
      // console.log("amount on Buckets.jsx", amount)
      // console.log("calculation on Buckets.jsx", calculation)
    // hasEnough ? amount > bucketData.min_amt : false
    // console.log(hasEnough, "amount is less than min amount in", bucketData.name)
  }, [income]);
console.log(bucketData.name, bucketData.percentage, "%", bucketData.min_amt, "income", income)
  return (
    <div

      key={bucketData.id}
      className={getClassName()}
      style={bucketData.children.length !== 0 && depth !== 0
        ? { borderRight: "5px solid white" }
        : null}
    >

      <span>
        {children}
      </span>
    </div>
  );
}

  export default BucketContainer;