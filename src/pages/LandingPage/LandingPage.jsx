import React from "react";
import RecordTransaction from "../../assets/gif/RecordTransaction.gif"

function LandingPage(){
    return(
        <div >
            <h1 id="text-head">Explore the features now</h1>
            <div>
            <div className="landing">
            <div className="landing-text">
                <h1>WELCOME</h1>
            </div>
            <img src={RecordTransaction} height={1000}/>
            </div>
        </div>
        </div>
    )
}
export default LandingPage;