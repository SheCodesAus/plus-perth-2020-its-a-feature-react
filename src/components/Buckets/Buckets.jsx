import React, { useState, useEffect } from "react";
import "../Buckets/Buckets.css";
import Bucket_img from "../../assets/images/bucket.png";
// import ReactTooltip from "react-tooltip";
import IconWrap from "../IconWrap/IconWrap";
import ViewBucket from "../Buckets/ViewBucket/ViewBucket";

function Bucket(props) {
  const { bucketData } = props;
  const { income } = props;

  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation((bucketData.percentage / 100) * income);
  }, [bucketData.percentage, income]);

  // console.log(bucketData);

  return (
    <React.Fragment>
      {/* Individual buckets View */}
      <div id="bucket-list">
        <div className="bucket-group animated fadeInLeft">
          <ViewBucket
            bucketData={bucketData}
            income={income}
            calculation={calculation}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Bucket;
