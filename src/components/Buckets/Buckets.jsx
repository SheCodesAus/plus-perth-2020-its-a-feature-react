import React, { useState, useEffect } from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import IconWrap from "../IconWrap/IconWrap"
import IconOption from "../IconOption/IconOption"

import "../Buckets/Buckets.css";
import Bucket_img from "../../assets/images/bucket.png";
import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/edit.png";
import ReactTooltip from "react-tooltip";

function Bucket(props) {
  const { bucketData } = props;
  const { income } = props;

  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation((bucketData.percentage / 100) * income);
  }, [bucketData.percentage, income]);

  return (
    <div className=" bucket-group animated fadeInLeft" key={bucketData.id}>
      <div
        className="bucket-parent"
        style={
          bucketData.children.length > 0
            ? { borderBottom: "5px solid white" }
            : null
        }
      >
        <div className = "icon-wrapper"> 
              <img className="bucket-pic" alt="Bucket" src={Bucket_img}/> 
              <IconWrap bucketData = {bucketData} />
        </div>
        <h2 data-tip={bucketData.description} data-for="descriptionTip">
          {bucketData.name}:<br></br>
          {bucketData.percentage}%
          <ReactTooltip id="descriptionTip" />
        </h2>
        {income ? (
          <h2>
            $
            {calculation.toLocaleString("en", {
              minimumFractionDigits: 2,
            })}
          </h2>
          
        ) : (
          <h2>&nbsp; </h2>
        )}

        <p>
          Min:{" "}
          {bucketData.min_amt == null
            ? "$0"
            : bucketData.min_amt.toLocaleString("en")}
        </p>

        <div>
          {/* <a className="delete" href="/">
            {" "}
            <img src={Delete} alt="Bin" height={30}></img>
          </a> */}
          {/* need to provide authentication? */}
          {/* <Link to={`/EditBucket/${bucketData.id}`}> 
              <img src={Edit} alt="Edit" height={30}></img>
          </Link> */}

        </div>
      </div>

      {bucketData.children.length > 0 ? (
        <div className="children">
          {bucketData.children.map((child, i) => (
            <div
              key={i}
              className={
                i < bucketData.children.length - 1
                  ? "bucket bucket-child"
                  : "bucket"
              }
              style={
                child.children.length > 0 ? { width: "max-content" } : null
              }
            >
              <span>
                <div className = "icon-wrapper"> 
                  <img className="bucket-pic-child" alt="Bucket" src={Bucket_img}/> 
                  <IconWrap bucketData = {child}/>
                </div>
                <h2
                  data-tip={child.description}
                  data-for="descriptionTip-child"
                >
                  {child.name}:<br></br>
                  {child.percentage}%
                  <ReactTooltip id="descriptionTip-child" />
                </h2>
                {income ? (
                  <h2>
                    $
                    {((child.percentage / 100) * calculation).toLocaleString(
                      "en",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </h2>
                ) : (
                  <h2>&nbsp;</h2>
                )}
                <p>Min: {child.min_amt == null ? "$0" : child.min_amt}</p>

                {child.children.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {child.children.map((nextchild, i) => (
                      <div
                        key={i}
                        className="bucket"
                        style={{
                          borderTop: "5px solid white",
                          paddingTop: "30px",
                        }}
                      >
                        <span>
                          <div className = "icon-wrapper"> 
                              <img className="bucket-pic-child" alt="Bucket" src={Bucket_img}/> 
                              <IconWrap bucketData = {nextchild}/>
                          </div>
                          <h2
                            data-tip={nextchild.description}
                            data-for="descriptionTip-childs-child"
                          >
                            {nextchild.name}:<br></br>
                            {nextchild.percentage}%
                          </h2>
                          <ReactTooltip id="descriptionTip-childs-child" />
                          {income ? (
                            <h2>
                              $
                              {(
                                (nextchild.percentage / 100) *
                                ((child.percentage / 100) * calculation)
                              ).toLocaleString("en", {
                                minimumFractionDigits: 2,
                              })}
                            </h2>
                          ) : (
                            <h2>&nbsp;</h2>
                          )}
                          <p>
                            Min:{" "}
                            {nextchild.min_amt == null
                              ? "$0"
                              : nextchild.min_amt}
                          </p>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Bucket;
