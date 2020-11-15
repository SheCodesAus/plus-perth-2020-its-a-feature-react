import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Delete from "../../assets/images/delete.png";
import ReactTooltip from "react-tooltip";

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
      alert("Transaction Deleted");
      history.push(`/transactions`);
    });
  };
  //template
  return (
    <React.Fragment>
      <img
        style={{ cursor: "pointer" }}
        src={Delete}
        alt="Delete"
        height={30}
        data-tip="Delete Transaction"
        data-for="DelTip"
        onClick={(e) => {
          if (window.confirm("Are you sure you wish to delete this item?"))
            handleSubmit(e);
        }}
      ></img>
      <ReactTooltip id="DelTip" />
    </React.Fragment>
  );
}

export default DeleteTransactionHistory;
