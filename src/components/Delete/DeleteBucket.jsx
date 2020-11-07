import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";

function DeleteBucket() {
  const history = useHistory();
  const { id } = useParams();

  const deleteData = async () => {
    const token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}buckets/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );
    // return response.json();
  };
  //get token
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteData().then((response) => {
      //   clearStorage();
      //   console.log(response);
      history.push(`/edit-buckets`);
    });
  };
  //template
  return (
    <div className="Delete-Bucket">
      <h3>Are you sure you want to delete this Bucket?</h3>
      <p>This will delete all related buckets as well!</p>
      <button type="submit" onClick={handleSubmit}>
        Delete
      </button>
      <Link to = "/edit-buckets"> Cancel</Link>
    </div>
  );
}

export default DeleteBucket;
