import React from "react";
import { Link } from "react-router-dom";
import "../Buckets.css";
import Bucket_img from "../../../assets/images/bucket.png";
import Delete from "../../../assets/images/delete.png";
import IconWrap from "../../IconWrap/IconWrap";
import IconOption from "../../IconOption/IconOption";
import BucketContainer from "../BucketContainer/BucketContainer";

// Delete this?
// const BucketContainer = ({ bucket, depth, children }) => {

//   const getClassName = () => {
//     // if (depth == 0) {
//     //   return 'bucket-parent'
//     // }
//     // else {
//       return 'bucket'
//     // }
//   }

//   return (
//     <div
//       key={bucket.id}
//       className={getClassName()}
//       // style={
//       //   bucket.children.length > 0
//       //     ? { width: "max-content" }
//       //     : null
//       // }
//       style={
//         bucket.children.length !==0 && depth !==0
//           ? { borderRight: "5px solid white" }
//           : null
//       }
//     >
//       <span>
//         {children}
//       </span>
//     </div >
//   )
// }

const Bucket = ({ bucket, handleChange, depth = 0 }) => {
  return (
    <BucketContainer bucketData={bucket} depth={depth}>
      <div className={bucket.children.length > 0 ? "bucket-parent" : null}>
        <div className="icon-wrapper">
          <img
            className={depth === 0 ? "bucket-pic" : "bucket-pic-child"}
            alt="Bucket"
            src={Bucket_img}
          />
          <IconWrap bucketData={bucket} />
        </div>
        <div>
          <input
            className="input"
            type="text"
            id="name"
            value={bucket.name ? bucket.name : "Name"}
            onChange={(e) => handleChange(e, bucket.id)}
          />
          <input
            className="input-val"
            type="text"
            id="percentage"
            value={bucket.percentage ? bucket.percentage : null}
            onChange={(e) => handleChange(e, bucket.id)}
          />
          %
        </div>
        <br></br>
        <div>
          Min: $
          {bucket.min_amt.toLocaleString("en", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
        </div>
        <br></br>
        <div>
          <label>Description:</label>
          <br></br>
          <textarea
            className="input"
            type="text"
            id="description"
            value={bucket.description}
            placeholder={"Enter account description here (optional)"}
            onChange={(e) => handleChange(e, bucket.id)}
          ></textarea>
        </div>
        <br />
        <div>
          <label htmlFor="icon">
            Icon<br></br>
          </label>
          <select
            type="select"
            id="icon"
            value={bucket.icon}
            onChange={(e) => handleChange(e, bucket.id)}
          >
            <IconOption />
          </select>
        </div>
        <br />
        <div>
          <Link className="delete" to={`/delete-bucket/${bucket.id}`}>
            <img src={Delete} alt="Bin image" height={30}></img>
          </Link>
        </div>
        <br />
      </div>

      {/* Child buckets */}
      {bucket.children.length > 0 ? (
        <div className="children">
          {bucket.children.map((bucket, i) => (
            <Bucket
              key={i}
              depth={depth + 1}
              bucket={bucket}
              handleChange={handleChange}
            />
          ))}
        </div>
      ) : null}
    </BucketContainer>
  );
};
export default Bucket;
