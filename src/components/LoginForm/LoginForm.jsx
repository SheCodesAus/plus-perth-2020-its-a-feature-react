import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./LoginForm.css";
import Button from "../../components/Button/Button";
import { setStorage } from "../../helpers/localStorage";

function LoginForm(props) {
  //variables
  const [credentials, setCredentials] = useState({
    username: "",
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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api-token-auth/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
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
      postData().then((response) => {
        if (response.ok) {
        setStorage("token", response.token);
        setStorage("user", credentials.username);
        // window.location.reload();
        history.push("/");
        } else {
          alert (response.non_field_errors[0])
          // console.log(response.non_field_errors[0])
        }
      });
    }
  }
  const handleKeyPress = e =>{
    if (e.keyCode ===13){
      handleSubmit();
    }
  }


  // const handleChange = (e) => {};
  // const handleSubmit = (e) => {};

  //template
  return (
    <form className="login-box animated fadeInLeft">
      <div className="box-header">
        <h2 id="loginheader">Login</h2>
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
      <button id="inbutton" onClick={handleSubmit} type ="submit">Login</button>

      <div className="in-out">
        <p className="small">Don't have an account? </p>
        <Link to="/signup/"> Sign Up </Link>
      </div>
      <br />
    </form>
  );
}

export default LoginForm;
