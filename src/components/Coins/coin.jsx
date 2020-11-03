import React, {useState} from "react"
import { Animated } from "react-animated-css";
import Coin from "../../assets/images/coin.png";
import "../../components/Coins/coin.css"


function Coins(){

    document.getElementById('btn').addEventListener('click', function () {
        document.querySelector('.coin-pic').classList.add('grow');
      });
    }

export default Coins