import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "../Buckets.css";
import Bucket_img from "../../../assets/images/bucket.png";
import Delete from "../../../assets/images/delete.png";

function Bucket() {
  // This is used to display the buckets on the page in correct order
  const [buckets, setBuckets] = useState();

  // This is used to change the bucket details which will then be POSTED to API
  const [updatedBuckets, setUpdatedBuckets] = useState();

  // This is used to update the error array instantly - required for the save function to work properly
  const percentageError = useRef([]);

  // This is used to force a re-render so the errors will be displayed on the page
  const [errorMsg, setErrorMsg] = useState([]);

  // This is used to show error if POST request fails
  const [fetchErrorMsg, setFetchErrorMsg] = useState();

  const token = window.localStorage.getItem("token");
  const history = useHistory();

  // Get bucket list to display in their groups on the page
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}buckets`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setBuckets(data);
      });
  }, [token]);

  // Flatten list of buckets into separate account objects - property/key is the bucket ID (this is used to keep track of which bucket user is updating)
  useEffect(() => {
    if (buckets) {
      let bucketList = {};
      for (let i = 0; i < buckets.length; i++) {
        const id = buckets[i].id;
        bucketList[id] = buckets[i];
        if (buckets[i].children.length > 0) {
          for (let j = 0; j < buckets[i].children.length; j++) {
            const id = buckets[i].children[j].id;
            bucketList[id] = buckets[i].children[j];
            if (buckets[i].children[j].children.length > 0) {
              for (let k = 0; k < buckets[i].children[j].children.length; k++) {
                const id = buckets[i].children[j].children[k].id;
                bucketList[id] = buckets[i].children[j].children[k];
              }
            }
          }
        }
      }
      setUpdatedBuckets(bucketList);
    }
  }, [buckets]);

  const handleChange = (e, bucketID) => {
    let { id, value } = e.target;
    if (id === "percentage") {
      value = parseInt(value);
    } else if (id === "min_amt") {
      value = parseFloat(value).toFixed(2);
    }
    const update = updatedBuckets[bucketID];
    update[id] = value;
    setUpdatedBuckets((prevBuckets) => ({
      ...prevBuckets,
      update,
    }));
  };

  const checkBucketPercentages = (parentBucket) => {
    let bucketIDs = [];
    if (!parentBucket) {
      bucketIDs = buckets.map((bucket) => bucket.id);
    } else {
      bucketIDs = parentBucket.children.map((bucket) => bucket.id);
    }
    const totals = bucketIDs.map((id) => updatedBuckets[id].percentage);

    const total = totals.reduce((accumulator, value) => accumulator + value);

    const index = percentageError.current.indexOf(
      parentBucket ? parentBucket.name : "top-level"
    );

    if (total !== 100) {
      if (index > -1) {
        return;
      }
      percentageError.current = [
        ...percentageError.current,
        parentBucket ? parentBucket.name : "top-level",
      ];
    } else {
      const errors = percentageError.current;
      if (index > -1) {
        errors.splice(index, 1);
      }
    }
  };

  const postBucketUpdate = async (bucket) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}buckets/${bucket.id}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(bucket),
      }
    );
    return response.json();
  };

  const saveChanges = () => {
    setFetchErrorMsg();
    checkBucketPercentages(null);
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i].children.length > 0) {
        checkBucketPercentages(buckets[i]);
        for (let j = 0; j < buckets[i].children.length; j++) {
          if (buckets[i].children[j].children.length > 0) {
            checkBucketPercentages(buckets[i].children[j]);
          }
        }
      }
    }
    if (percentageError.current.length === 0) {
      setErrorMsg([]);

      // Iterating over object...
      for (var key in updatedBuckets) {
        if (parseInt(key)) {
          postBucketUpdate(updatedBuckets[key]).then((response) => {
            if (response.owner) {
              history.push("/");
            } else {
              setFetchErrorMsg(
                "Unable to save changes. Please try again later."
              );
            }
          });
        }
      }
    } else {
      setErrorMsg(percentageError.current);
    }
  };

  return buckets ? (
    <React.Fragment>
      <div>
        <button onClick={saveChanges}>SAVE CHANGES :)</button>
        {fetchErrorMsg ? (
          <div>
            <h2>{fetchErrorMsg}</h2>
          </div>
        ) : null}
        {errorMsg.length > 0 ? (
          <div>
            <h2>Something doesn't add up</h2>
            <h4>check the child accounts of... </h4>
            <ul>
              {errorMsg.map((error) => {
                return error === "top-level" ? (
                  <li>Your top level</li>
                ) : (
                  <li>{error}</li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      {buckets.map((bucket) => {
        return (
          <div key={bucket.id} className=" bucket-group animated fadeInLeft">
            <div
              className="bucket-parent"
              style={
                bucket.children.length > 0
                  ? { borderBottom: "3px solid white" }
                  : null
              }
            >
              <img className="bucket-pic" alt="Bucket Image" src={Bucket_img} />
              <div>
                <input
                  className="input"
                  type="text"
                  id="name"
                  placeholder={bucket.name ? bucket.name : "Name"}
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
            </div>

            {bucket.children.length > 0 ? (
              <div className="children">
                {bucket.children.map((bucket, i) => (
                  <div
                    key={i}
                    className={
                      i < bucket.children.length - 1
                        ? "bucket bucket-child"
                        : "bucket"
                    }
                    style={
                      bucket.children.length > 0
                        ? { width: "max-content" }
                        : null
                    }
                  >
                    <span>
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
                          placeholder={bucket.name ? bucket.name : "Name"}
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

                      {bucket.children.length > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {bucket.children.map((bucket, i) => (
                            <div
                              key={i}
                              className="bucket"
                              style={{
                                borderTop: "5px solid white",
                                paddingTop: "30px",
                              }}
                            >
                              <span>
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
                                    placeholder={
                                      bucket.name ? bucket.name : "Name"
                                    }
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
                                      placeholder={
                                        bucket.min_amt ? bucket.min_amt : "0"
                                      }
                                      onChange={(e) =>
                                        handleChange(e, bucket.id)
                                      }
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
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </React.Fragment>
  ) : (
    <h2>Couldn't find any buckets!</h2>
  );
}

export default Bucket;
