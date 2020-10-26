import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
// import { isAuthenticated, setStorage } from "../utils/localStorage";

function EditBucketForm({ bucketData }) {
  //   console.log("---->", bucketData);
  //   const [bucketDetails, setBucketDetails] = useState({
  //     title: bucketData.title,
  //     description: bucketData.description,
  //     icon: bucketData.icon,
  //     min_amount:bucketData.min_amount,
  //     percentage:bucketData.percentage,
  //   });
  //   const history = useHistory();
  //   const { id } = useParams();

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
    <div className="form">
      <form>
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            // value={bucketDetails.title}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description"></label>
          <input
            type="text"
            id="description"
            // value={bucketDetails.description}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="goal"></label>
          <input
            type="number"
            id="goal"
            // value={bucketDetails.goal}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image"></label>
          <input
            type="url"
            id="image"
            // value={bucketDetails.image}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date_closed"></label>
          <input
            type="datetime-local"
            id="date_closed"
            // value={bucketDetails.date_closed}
            // onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sample"></label>
          <textarea
            id="sample"
            // value={bucketDetails.sample}
            // onChange={handleChange}
          />
        </div>
        {/* <button type="submit" onClick={handleSubmit}>
          Update!
        </button> */}
      </form>
    </div>
  );
}

export default EditBucketForm;
