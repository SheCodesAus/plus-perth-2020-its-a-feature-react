import React from "react";
import "../Buckets/Buckets.css";
import Bucket_img from "../../assets/images/bucket.png";
import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/edit.png";

function TransactionBucket(props) {
  const { bucketData } = props;
  console.log(bucketData);
  return (
    <div className="bucket animated fadeInLeft">
      <div className="bucket">
        <img className="bucket-pic" alt="Bucket Image" src={Bucket_img} />
        {/* <img className="icon" alt="icon" src= /> */}
        {/* icon URLS */}
        <h2>Account Name</h2>
        <h3>Minimum Amount</h3>
        <h1>{bucketData.id}</h1>
        <h3>%</h3>
        <p id="description">Description</p>
        <div>
          <div>
            {/* <Link to={`/delete/${id}`}> */}
            <a className="delete" href="/">
              {" "}
              <img src={Delete} alt="Bin image" height={30}></img>
            </a>
            <a className="edit" href="/EditBucket">
              {" "}
              <img src={Edit} alt="Edit image" height={30}></img>
            </a>

            {/* </Link> */}
          </div>
        </div>

        {/* <EditBucketForm project_id={id} /> */}
      </div>
    </div>
  );
}

export default TransactionBucket;
