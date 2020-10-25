import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import "./SignUpForm.css";
import Button from "../Button/Button";
// import {getStorage, setStorage} from "../../helpers/localStorage";


function SignUpForm(){
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
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}users/`,{
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
    //             setStorage("signup", credentials.username);
    //             history.push("/login");
    //         });
    //     }else{
//     props.showError('Fill in all details');
// }
    // };

    const handleChange = (e) => {};
    const handleSubmit = (e) => {};

    //template
    return(
        <form className = "login-box animated fadeInLeft">
            <div class="box-header">
            <h2 id = "loginheader">Sign Up</h2>
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
                <p class = "small">Already have an account? </p>
                <Link  to="/login">  Login </Link>
            </div>
            <br/>

            <Button id="inbutton" value = "Submit"
            onClick={handleSubmit} value = "Sign Up"/>
        </form>
    );
}

export default SignUpForm;