import React from "react";
import { Link } from "react-router-dom";
import RecordTransaction from "../../assets/gif/RecordTransaction.gif"

function LandingPage(){
    return(
        <div className="animated fadeInLeft">
            <h1 id="text-head">Explore the features now</h1>
            <div className="landing">
                <div className="landing-container animated fadeInLeft">
                    <div className="animated fadeInLeft" id="landing-text">
                        <h1>WELCOME</h1>
                        <div className="landing-direct">
                        <div className="landing-in-out">
                            <Link to="/signup/"> Sign Up </Link>
                        </div>
                        <div className="landing-in-out">
                            <Link to="/login/"> Login </Link>
                        </div>
                        </div>
                    </div>
                    <div className="landing-gif">
                        <img className="landing-gif" src={RecordTransaction}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LandingPage;