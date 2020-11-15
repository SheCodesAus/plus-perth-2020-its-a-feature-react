import React, { useState } from "react";
import Delete from "../../assets/images/delete.png";
import ReactTooltip from "react-tooltip";

function DeleteExpense({ expense }) {
  const [exp, setExpense] = useState(expense);

  const ex = (name) => {
    return 'Delete "' + name + '"';
  };

  const deleteData = async () => {
    const token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}expenses/${exp.id}/`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      }
    );
  };
  //get token
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteData().then((response) => {
      window.location.reload();
    });
  };
  //template
  return (
    <React.Fragment>
      <img
        style={{ cursor: "pointer" }}
        src={Delete}
        alt="Delete"
        height={20}
        data-tip={ex(expense.name)}
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

export default DeleteExpense;
