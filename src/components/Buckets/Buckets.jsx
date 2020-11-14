import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Buckets/Buckets.css";
import Bucket_img from "../../assets/images/bucket.png";
// import ReactTooltip from "react-tooltip";
import IconWrap from "../IconWrap/IconWrap";
import ViewBucket from "../Buckets/ViewBucket/ViewBucket";

function Bucket(props) {
  const { bucketData } = props;
  const { income } = props;

  const [incomeState, setIncomeState] = useState();
  // const [hasEnough, setHasEnough] = useState(false)
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setIncomeState(income);
  }, [income])

  useEffect(() => {
    if (income) {
      const amount = (bucketData.percentage / 100) * income
      setCalculation(amount)
      // setHasEnough(amount > calculation)
    }
    // console.log(bucketData)
  }, [income]);


  return (
    <React.Fragment>
      {/* Individual buckets View */}
      <div className="bucket-group animated fadeInLeft">
        {console.log("The bucket data is... ", bucketData)}
        <ViewBucket bucketData={bucketData} income={income} calculation={calculation} hasEnough={calculation > bucketData.min_amt} />
      </div>
    </React.Fragment>
  );
}
export default Bucket;
