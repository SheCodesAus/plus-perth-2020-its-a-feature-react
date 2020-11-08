import React from "react";
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
      <div className = {bucket.children.length >0 ? "bucket-parent" : null}>
      <div className = "icon-wrapper">
      <img
        className={depth ===0 ? "bucket-pic" : "bucket-pic-child"}
        alt="Bucket"
        src={Bucket_img}
      />
      <IconWrap bucketData = {bucket} />
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
          value={bucket.percentage}
          onChange={(e) => handleChange(e, bucket.id)}
        />
            %
            <p>
          Minimum Amount: <br />$
              <input
            className="input"
            type="text"
            id="min_amt"
            placeholder={bucket.min_amt ? bucket.min_amt : "0"}
            onChange={(e) => handleChange(e, bucket.id)}
          />
        </p>
        <p>Bucket Description:</p>
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
        <label htmlFor="icon">Icon<br></br></label>
        <select type="select" id="icon" value={bucket.icon} onChange={(e) => handleChange(e, bucket.id)}>
          <IconOption />
        </select>
      </div>
      <br />
      <div>
        <a className="delete" href="/">
          {" "}
          <img src={Delete} alt="Bin image" height={30}></img>
        </a>
      </div>
      <br />
      </div>
      

      {/* Child buckets */}
      {bucket.children.length > 0 ? (
        <div className="children">
          {bucket.children.map((bucket, i) => (
            <Bucket key={i} depth={depth + 1} bucket={bucket} handleChange={handleChange} />
          ))}
        </div>
      ) : null}

    </BucketContainer>
  )
}
export default Bucket;