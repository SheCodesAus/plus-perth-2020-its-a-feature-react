import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import "../AddBucket/AddBucket.css";

import Button from "../../Button/Button";
import Bucket_img from "../../../assets/images/bucket.png";
import Travel from "../../../assets/images/travel.png";
import "../../Buckets/Buckets.css";
import "../../Button/Button.css";

function AddBucketForm(props) {
  const [Bucket, setBucket] = useState([]);
  const [bucketList, setBucketList] = useState([]);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}bucketlist/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setBucketList(data);
      });
  }, []);

  const history = useHistory();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBucket((prevBucket) => ({
      ...prevBucket,
      [id]: value,
    }))
  }

  const postDataBucket = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}buckets/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(Bucket),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Bucket.name) {
      postDataBucket().then((response) => {
        history.push("/buckets");
      });
    }
  };

  let dropDownBucketList = bucketList.map((s) => {
    return (
    <option key={s.name} value={s.name}>
      {s.name}
    </option>
  )
})

  return (
    <form className="addBucketForm">
      <div className="Addbucket Addanimated fadeInLeft">
        <div className="Addbucket">
          <img className="bucket-pic" alt="Bucket Image" src={Bucket_img} />
        </div>
        <div>
          <label htmlFor="childBucketSelect">
            Is this a child bucket? If so, pick the parent bucket from the list
            <br></br>
          </label>
          <select
            type="select"
            id="childBucketSelect"
          >
            <option value="">
            </option>
            {dropDownBucketList}
          </select>
          <label htmlFor="name">
            Bucket Name<br></br>
          </label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="min_amount">
            Minimum Amount<br></br>
          </label>
          <input
            type="number"
            id="min_amt"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="percentage">
            %<br></br>
          </label>
          <input
            type="number"
            id="percentage"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">
            Description<br></br>
          </label>
          <input
            type="text"
            id="description"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="icon">
            Icon<br></br>
          </label>
          <select
            type="select"
            id="icon"
            onChange={handleChange}
          >
            <option value="travel" src={Travel}>
              Travel
            </option>
            <option value="savings">Savings</option>
          </select>
        </div>

        <div>
          <Button value="Submit" onClick={handleSubmit}/>
        </div>
        <Link to="/TransactionsPage">Cancel</Link>
      </div>
    </form>
  );
}

export default AddBucketForm;
