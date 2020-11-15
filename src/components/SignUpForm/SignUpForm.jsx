import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUpForm.css";
import Button from "../Button/Button";
import { setStorage } from "../../helpers/localStorage";

function SignUpForm(props) {
  //variables
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  //methods
  //set state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };


  const postData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json()
    return {
      ok: response.ok,
      data: data
    }
  };

  //get token
  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      console.log("i am here");
      postData().then((response) => {
        console.log(response)
        if (response.ok) {
          // console.log(response);
          setStorage("signup", response.data.username);
          history.push("/login");
        }
        else {
          alert(response.data.detail)
        }
      })
    } else {
      alert("Fill in all details");
    }
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  // const handleChange = (e) => {};
  // const handleSubmit = (e) => {};

  //template
  return (
    <form className="login-box animated fadeInLeft">
      <div className="box-header">
        <h2 id="loginheader">Sign Up</h2>
      </div>

      <div>
        <label htmlFor="username">Username: </label>
        <input
          className="input"
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <br />
      <div>
        <label htmlFor="email">
          Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <input
          className="input"
          type="text"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <br />
      <div>
        <label htmlFor="password">Password: </label>
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <button id="inbutton" onClick={handleSubmit} type="submit">Sign Up</button>

      <div className="in-out">
        <p className="small">Already have an account? </p>
        <Link to="/login"> Login </Link>
      </div>
      <br />
    </form>
  );
}

export default SignUpForm;
