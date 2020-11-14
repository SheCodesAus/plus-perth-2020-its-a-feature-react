import React from "react";
import RecordTransaction from "../../assets/gif/RecordTransaction.gif"

function LandingPage(){
    return(
        <div className="animated fadeInLeft">
            <h1 id="text-head">Explore the features now</h1>
            <div className="landing">
                <div className="animated fadeInLeft">
                    <div className="animated fadeInLeft" id="landing-text">
                        <h1>WELCOME</h1>
                    </div>
                    <div className="landing-gif">
                        <img src={RecordTransaction}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LandingPage;