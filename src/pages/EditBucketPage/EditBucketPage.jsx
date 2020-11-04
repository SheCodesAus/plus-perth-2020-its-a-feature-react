import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import EditBucketForm from "../../components/Buckets/EditBuckets/EditBuckets";
import { getStorage, setStorage, clearStorage, isAuthenticated } from "../../helpers/localStorage";


function EditBucketPage(){
  const [bucketData, setBucketData] = useState([]);
  const {id} = useParams();
  console.log(id); //undefined

  useEffect(() =>{
      fetch(`${process.env.REACT_APP_API_URL}buckets/${id}/`)
      .then((results) => {
          return results.json();
      })
      .then((data) => {
        setBucketData(data);
      });
  },[id])

  if(isAuthenticated()){
      return <EditBucketForm bucketData = {bucketData}/>;
  }
  return (
  <div >
      <h1> Login or Sign-Up to Edit Buckets! </h1>
  </div>
  )
}

export default EditBucketPage;
