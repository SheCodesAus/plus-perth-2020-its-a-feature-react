import React from "react";
import "./Button.css";

function Button({ value, ...props }) {
  return <input className="button" type="submit" value={value} {...props} />;
}

export default Button;
