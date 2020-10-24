import React from "react";
import "./Button.css";

function Button({ value, ...props }) {
  return (
    <form className="button-container">
      <input className="button" type="submit" value={value} {...props} />
    </form>
  );
}

export default Button;