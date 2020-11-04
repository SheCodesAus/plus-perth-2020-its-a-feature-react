import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import "../EditBuckets/EditBuckets.css";

import Button from "../../Button/Button";
import Bucket_img from "../../../assets/images/bucket.png";
import { getStorage, setStorage, clearStorage, isAuthenticated } from "../../../helpers/localStorage";

// import Slider from "../../Slider/Slider";

import "../../Buckets/Buckets.css";
import "../../Button/Button.css";

function EditBucketForm(props) {
  const {bucketData} = props;
  console.log(bucketData)
    const [bucketDetails, setBucketDetails] = useState({
      title: "",
      min_amount: 0,
      percentage: 0,
      description: "",
      category:"default"
    });
    const history = useHistory();
    const { id } = useParams();

    useEffect(() =>{
      setBucketDetails({
          title: bucketData.title,
          min_amount: bucketData.min_amount,
          percentage: bucketData.percentage,
          description: bucketData.description,
          category: bucketData.owner,
      });
  }
  ,[bucketData]);

    //methods
    //set state
    const handleChange = (e) => {
      const { id, value } = e.target;
      setBucketDetails((prevBucketDetails) => ({
        ...prevBucketDetails,
        [id]: value,
      }));
    };


  const postData = async() => {
    const token = getStorage("token")
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}buckets/${id}/`,{
          method: "put",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `token ${token}`,
          },
          body: JSON.stringify(bucketDetails),
      });
      return response.json();
    } catch(e) {
      console.log(e);
      // history.push(`/error/`);
    }
  };

      const handleSubmit = (e) => {
        e.preventDefault();
          postData(isAuthenticated()).then(res => {
            setStorage("title",bucketDetails.title);
            console.log(res.id)
            if(res.id === undefined){
              console.log("error");
              // history.push(`/error/`);
            }else{
              history.push( `/buckets/${res.id}`);
            }
        }
        );
      
    }

  return (
    <form className="editBucketForm">
      <div className="Editbucket Editanimated fadeInLeft">
        <div className="Editbucket">
          {/* get this icon-wrapper div to replace img */}
          <div className = "icon-wrapper"> 
              <img className="bucket-pic-edit" alt="Bucket" src={Bucket_img}/> 
              <span>
              {(() =>{
                switch(bucketDetails.category){ 
                  case "travel":
                    return(<div id="travel"></div>)
                  case "savings":
                    return(<div id="savings"></div>)
                  case "expense":
                    return(<div id="expense"></div>)
                  case "grocery":
                    return(<div id="grocery"></div>)
                  case "hitTheBeach":
                    return(<div id="hitTheBeach"></div>)
                  case "home":
                    return(<div id="home"></div>)
                  case "investment":
                    return(<div id="investment"></div>)
                  case "luggage":
                    return(<div id="luggage"></div>)
                  case "passport":
                    return(<div id="passport"></div>)
                  case "roadTrip":
                    return(<div id="roadTrip"></div>)
                  case "sunny":
                    return(<div id="sunny"></div>)
                  case "wallet":
                    return(<div id="wallet"></div>)
                  default:
                    return(<div id="default"></div>)
                }
              })()}
              </span>
          </div>
        </div>
        {/* <form> */}
        <div>
          <label htmlFor="title">
            Account Name<br></br>
          </label>
          <input
            type="text"
            id="title"
            value={bucketDetails.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="min_amount">
            Minimum Amount<br></br>
          </label>
          <input
            type="number"
            id="min_amount"
            value={bucketDetails.min_amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="percentage">
            %<br></br>
          </label>
          <input
            type="number"
            id="percentage"
            value={bucketDetails.percentage}
            onChange={handleChange}
          />
          {/* <Slider value = {bucketDetails.percentage} onChange={handleChange}/> */}
        </div>
        <div>
          <label htmlFor="description">
            Description<br></br>
          </label>
          <input
            type="text"
            id="description"
            value={bucketDetails.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="icon">
            Icon<br></br>
          </label>
          <select
            type="select"
            id="category"
            value={bucketDetails.category}
            onChange={handleChange}
          >
            <option value="travel" >Travel</option>
            <option value="savings">Savings</option>
            <option value="expense">Expense</option> 
            <option value="grocery">Grocery</option>
            <option value="hitTheBeach">Beach</option>
            <option value="home">Home</option>
            <option value="investment">Investment</option>
            <option value="luggage">Luggage</option>
            <option value="passport">Passport</option>
            <option value="roadTrip">Road Trip</option>
            <option value="sunny">Sunny</option>
            <option value="wallet">Wallet</option> 
            <option value="default">Default</option>
          </select>
        </div>

        {/* <div>
          <Button value="Submit" />
        </div> */}
        <Link to="/TransactionsPage">Cancel</Link>
        <div className = "button-container">
        <button className = "button" type="submit" onClick={handleSubmit}>
          Update!
        </button>
        </div>

      </div>
    </form>
  );
}

export default EditBucketForm;
