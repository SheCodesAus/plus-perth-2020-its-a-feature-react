import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Buckets/Buckets.css";
import Bucket_img from "../../assets/images/bucket.png";
import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/edit.png";
import { getStorage } from "../../helpers/localStorage";

function TransactionBucket(props) {
  //   const { bucketData, setBucketData } = useState([]);
  //   const { id } = useParams();
  //   const token = getStorage("token");
  //   console.log(bucketData);
  //   console.log(token);
  const { bucketData } = props;
  //   console.log(bucketData);

  //   useEffect(() => {
  //     fetch(`${process.env.REACT_APP_API_URL}buckets/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `token ${token}`,
  //       },
  //     })
  //       .then((results) => {
  //         return results.json();
  //       })
  //       .then((data) => {
  //         setBucketData(data);
  //       });
  //   }, [id]);

  return (
    <div className="bucket animated fadeInLeft">
      <div className="bucket">
        <img className="bucket-pic" alt="Bucket Image" src={Bucket_img} />
        {/* <img className="icon" alt="icon" src= /> */}
        {/* icon URLS */}
        <h2>{bucketData.name}</h2>
        <h3>{bucketData.min_atm}</h3>
        <h1>{bucketData.id}</h1>
        <h3>{bucketData.percentage}</h3>
      </div>
      <p id="description">Description</p>
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

    // * <EditBucketForm project_id={id} />
  );
}

export default TransactionBucket;
