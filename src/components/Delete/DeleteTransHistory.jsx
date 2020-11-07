import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";

function DeleteTransactionHistory() {
  const history = useHistory();
  const { id } = useParams();

  const deleteData = async () => {
    const token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}transactions/${id}`,
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
      history.push(`/transactions`);
    });
  };
  //template
  return (
    <div className="Delete-Transaction-History">
      <h3>Are you sure you want to delete this receipt?</h3>
      <p>There's no getting it back!</p>
      <button type="submit" onClick={handleSubmit}>
        Delete
      </button>
      <Link to = "/transactions"> Cancel</Link>
    </div>
  );
}

export default DeleteTransactionHistory;
