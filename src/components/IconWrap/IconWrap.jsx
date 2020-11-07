import React, {useState, useEffect} from "react";
import "../Buckets/Buckets.css";

function IconWrap(props){
    const {bucketData} = props;

return(
        <span>
        {(() =>{        
            switch(bucketData.icon){ 
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
)
}
export default IconWrap;