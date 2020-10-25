import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import "./LoginForm.css";
import Button from "../../components/Button/Button";
// import {getStorage, setStorage} from "../../helpers/localStorage";


function LoginForm(){
    // //variables
    // const[credentials,setCredentials] = useState({
    //     username: "",
    //     password:"",
    // });

    // const history = useHistory();

    // //methods
    // //set state
    // const handleChange = (e)=> {
    //     const {id, value} = e.target;
    //     setCredentials((prevCredentials) => ({
    //         ...prevCredentials,
    //         [id]: value,
    //     }));
    // };

    // const postData = async() => {
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}api-token-auth/`,{
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(credentials),
    //     });
    //     return response.json();
    // };

    // //get token
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(credentials.username && credentials.password){
    //         postData().then((response)=> {
    //             setStorage("token", response.token);
    //             //window.localStorage.setItem("user", credentials.username);
    //             setStorage("user", credentials.username);
    //             history.push("/");
    //         });
    //     }
    // };

    const handleChange = (e) => {};
    const handleSubmit = (e) => {};

    //template
    return(
        <form className = "login-box animated fadeInLeft">
            <div class="box-header">
            <h2 id = "loginheader">Login</h2>
            </div>

            <div >
                <label htmlFor="username">Username: </label>
                <input className = "input" type="text" 
                id="username" 
                placeholder="Enter username" 
                onChange = {handleChange}/>
            </div>
            <br/>
            <div >
            <label htmlFor="password">Password: </label>
                <input className = "input" type="password" 
                id="password" 
                placeholder="Enter password" 
                onChange = {handleChange}/>
            </div>

            <div className="in-out">
                <p class = "small">Don't have an account? </p>
                <Link  to="/signup/">  Sign Up </Link>
            </div>
            <br/>

            <Button id="inbutton" value = "Submit"
            onClick={handleSubmit} value = "Login"/>
        </form>
    );
}

export default LoginForm;