import React from "react";
import "../Buckets.css";


const BucketContainer = ({ bucketData, depth, children }) => {

    const getClassName = () => {
    //   if (depth == 0) {
        return 'bucket'
    //   }
    //   else {
    //     return 'bucket bucket-child'
    //   }
    }
  
    return (
      <div
        key={bucketData.id}
        className={getClassName()}
        style={
          bucketData.children.length !==0 && depth !==0
            ? { borderRight: "5px solid white" }
            : null
        }
      >
        <span>
          {children}
        </span>
      </div >
    )
  }

  export default BucketContainer;