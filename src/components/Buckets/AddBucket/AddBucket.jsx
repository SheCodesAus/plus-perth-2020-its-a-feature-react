import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import "../AddBucket/AddBucket.css";

import Button from "../../Button/Button";
import Bucket_img from "../../../assets/images/bucket.png";
import Travel from "../../../assets/images/travel.png";
import "../../Buckets/Buckets.css";
import "../../Button/Button.css";

// import { isAuthenticated, setStorage } from "../utils/localStorage";

function AddBucketForm(props) {
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

  // Maybe this for creating live list
  // https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3

  //   console.log("---->", bucketData);
  //   const [bucketDetails, setBucketDetails] = useState({
  //     title: bucketData.title,
  //     description: bucketData.description,
  //     icon: bucketData.icon,
  //     min_amount:bucketData.min_amount,
  //     percentage:bucketData.percentage,
  //   });
  const history = useHistory();
  // const { bucketList } = useParams();

  //   //methods
  //   //set state
  //   const handleChange = (e) => {
  //     const { id, value } = e.target;
  //     setBucketDetails((prevBucketDetails) => ({
  //       ...prevBucketDetails,
  //       [id]: value,
  //     }));
  //   };

  //   const postData = async () => {
  //     const token = window.localStorage.getItem("token");
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}projects/${id}`,
  //       {
  //         method: "put",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `token ${token}`,
  //         },
  //         body: JSON.stringify(bucketDetails),
  //       }
  //     );
  //     return response.json();
  //   };
  //   //get token
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     postData(isAuthenticated()).then((response) => {
  //       history.push(`/project/${response.id}`);
  //     });
  //   };
  //template

  return (
    <form className="addBucketForm">
      <div className="Addbucket Addanimated fadeInLeft">
        <div className="Addbucket">
          <img className="bucket-pic" alt="Bucket Image" src={Bucket_img} />
          {/* <img className="icon" alt="icon" src= /> */}
          {/* icon URLS */}
        </div>
        {/* <form> */}
        <div>
          <label htmlFor="childBucketSelect">
            Is this a child bucket? If so, pick the parent bucket from the list
            <br></br>
          </label>
          <select
            type="select"
            id="childBucketSelect"
            // value={projectDetails.category}
            // onChange={handleChange}
          >
            {/* <option value="buckets">Buckets</option>
            <option value="buckets">More buckets</option>
            <option value="buckets">Even more buckets</option>
            <option value="buckets">
              Another bucket but this one has a hole in the bottom
            </option> */}
            {bucketList.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <label htmlFor="title">
            Account Name<br></br>
          </label>
          <input
            type="text"
            id="title"
            // value={bucketDetails.title}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="min_amount">
            Minimum Amount<br></br>
          </label>
          <input
            type="number"
            id="min_amount"
            // value={bucketDetails.title}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="percentage">
            %<br></br>
          </label>
          <input
            type="number"
            id="percentage"
            // value={bucketDetails.title}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">
            Description<br></br>
          </label>
          <input
            type="text"
            id="description"
            // value={bucketDetails.description}
            // onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="icon">
            Icon<br></br>
          </label>
          <select
            type="select"
            id="Icon"
            // value={projectDetails.category}
            // onChange={handleChange}
          >
            <option value="travel" src={Travel}>
              Travel
            </option>
            <option value="savings">Savings</option>
            {/* <option value="Historical-Fiction">Historical Fiction</option>
            <option value="Horror">Horror </option>
            <option value="Mystery">Mystery </option>
            <option value="Non-Fiction">Non-Fiction </option>
            <option value="Poetry">Poetry </option>
            <option value="Romance">Romance </option>
            <option value="Sci-Fi">Sci-Fi </option>
            <option value="Thriller">Thriller </option>
            <option value="Young-Adult">Young Adult </option> */}
          </select>
        </div>

        <div>
          <Button value="Submit" />
        </div>
        <Link to="/TransactionsPage">Cancel</Link>
        {/* <button type="submit" onClick={handleSubmit}>
          Update!
        </button> */}
      </div>
    </form>
  );
}

export default AddBucketForm;
