import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import "../Buckets.css";
import Bucket_img from "../../../assets/images/bucket.png";
import IconWrap from "../../IconWrap/IconWrap";
import BucketContainer from "../BucketContainer/BucketContainer";

//delete this maybe?
// const BucketContainer = ({ bucketData, depth, children }) => {

//   const getClassName = () => {
//     if (depth == 0) {
//       return 'bucket-parent'
//     }
//     else {
//       return 'bucket'
//     }
//   }

//   return (
//     <div
//       key={bucketData.id}
//       className={getClassName()}
//       style={
//         bucketData.children.length > 0
//           ? { width: "max-content" }
//           : null
//       }
//     >
//       <span>
//         {children}
//       </span>
//     </div >
//   )
// }

const ViewBucket = ({ bucketData, income, calculation, hasEnough, depth = 0 }) => {

  // --- Don't need any of this anymore as we are now getting the value from props... --- //

  // const [hasEnough, setHasEnough] = useState(true)

  // useEffect(() => {
  //   console.log("use effect", income)
  //   if (income) {
  //     const notEnough = (calculation < bucketData.min_amt)
  //     setHasEnough(notEnough)
  //     console.log("amount on bucket called ", bucketData.name, " is ", calculation, "this is not enough ", notEnough)
  //   }
  //   // console.log("amount on Buckets.jsx", amount)
  //   // console.log("calculation on Buckets.jsx", calculation)
  //   // hasEnough ? amount > bucketData.min_amt : false
  //   // console.log(hasEnough, "amount is less than min amount in", bucketData.name)
  // }, [income]);

  return (
    <BucketContainer bucketData={bucketData} depth={depth} income={income}>
      {
        // --- check if they've started entering the income. If so, show the not enough message. Else, don't show it yet. --- //
        income ?
          <div className={hasEnough ? 'enough' : 'not_enough'}>
            You haven't covered your minimum amount!
      </div>
          :
          null
      }

      <div className={bucketData.children.length > 0 ? "bucket-parent" : null}>
        <div className="icon-wrapper">
          <img
            className={depth === 0 ? "bucket-pic" : "bucket-pic-child"}
            alt="Bucket"
            src={Bucket_img}
          />
          <IconWrap bucketData={bucketData} />
        </div>

        <div>
          <h2 data-tip={bucketData.description} data-for="descriptionTip">
            {bucketData.name}:<br></br>
            {bucketData.percentage}%
            <ReactTooltip id="descriptionTip" />
          </h2>

          {income ? (
            <h2>
              $
              {calculation.toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </h2>
          ) : (
              <h2>&nbsp; </h2>
            )}
          <p>
            Min: $
            {bucketData.min_amt == null
              ? "0"
              : bucketData.min_amt.toLocaleString("en")}
          </p>
        </div>
      </div>

      {/* Child buckets */}
      {bucketData.children.length > 0 ? (
        <div className="children">
          {bucketData.children.map((bucket, i) => (
            <ViewBucket
              key={i}
              bucketData={bucket}
              depth={depth + 1}
              income={income}
              calculation={(bucket.percentage / 100) * calculation}
              hasEnough={(bucket.percentage / 100) * calculation > bucket.min_amt}
            />
          ))}
        </div>
      ) : null}
    </BucketContainer>
  );
};
export default ViewBucket;
