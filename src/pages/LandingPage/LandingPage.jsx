import React from "react";
import RecordTransaction from "../../assets/gif/RecordTransaction.gif"

function LandingPage(){
    return(
        <div className="landing-text animated fadeInLeft">
            <h1 id="text-head">Explore the features now</h1>
            <div>
            <div className="landing animated fadeInLeft">
            <div className="landing-text animated fadeInLeft">
                <h1>WELCOME</h1>
            </div>
            <img src={RecordTransaction} height={1000}/>
            </div>
        </div>
        </div>
    )
}
export default LandingPage;