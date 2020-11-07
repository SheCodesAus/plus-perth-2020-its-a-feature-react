import React from "react";
import "../Buckets.css";
import Bucket_img from "../../../assets/images/bucket.png";
import Delete from "../../../assets/images/delete.png";


const BucketContainer = ({ bucket, depth, children }) => {

  const getClassName = () => {
    if (depth == 0) {
      return 'bucket-parent'
    }
    else {
      return 'bucket'
    }
  }

  return (
    <div
      key={bucket.id}
      className={getClassName()}
      style={
        bucket.children.length > 0
          ? { width: "max-content" }
          : null
      }
    >
      <span>
        {children}
      </span>
    </div >
  )
}

const Bucket = ({ bucket, handleChange, depth = 0 }) => {
  return (
    <BucketContainer bucket={bucket} depth={depth}>
      <img
        className="bucket-pic-child"
        alt="Bucket"
        src={Bucket_img}
      />

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
          placeholder={bucket.percentage}
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
          value={
            bucket.description
              ? bucket.description
              : "Enter account description here (optional)"
          }
          onChange={(e) => handleChange(e, bucket.id)}
        ></textarea>
      </div>

      <div>
        <a className="delete" href="/">
          {" "}
          <img src={Delete} alt="Bin image" height={30}></img>
        </a>
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
export default Bucket