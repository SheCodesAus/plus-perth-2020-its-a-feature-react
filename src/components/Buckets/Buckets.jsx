import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Buckets/Buckets.css";
import Bucket_img from "../../assets/images/bucket.png";
import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/edit.png";
import { getStorage } from "../../helpers/localStorage";
import handleChange from "../Buckets/IncomeForm";

function Bucket(props) {
  const { bucketData } = props;
  const { income } = props;
  // const calculation = ((bucketData.percentage / 100) * income).toFixed(2);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(((bucketData.percentage / 100) * income).toFixed(2));
  }, [income]);

  return (
    <div className=" bucket-group animated fadeInLeft">
      <div
        className="bucket-parent"
        style={
          bucketData.children.length > 0
            ? { borderBottom: "3px solid white" }
            : null
        }
      >
        <img className="bucket-pic" alt="Bucket Image" src={Bucket_img} />
        <h2>
          {bucketData.name}: {bucketData.percentage}%
        </h2>
        <h2>${calculation}</h2>
        <p>
          Minimum Amount:{" "}
          {bucketData.min_amt == null ? "None" : bucketData.min_amt}
        </p>
        <p>
          {bucketData.description ? (
            bucketData.description
          ) : (
            <span>&nbsp;</span>
          )}
        </p>

        <div>
          <a className="delete" href="/">
            {" "}
            <img src={Delete} alt="Bin image" height={30}></img>
          </a>
          <a className="edit" href="/EditBucket">
            {" "}
            <img src={Edit} alt="Edit image" height={30}></img>
          </a>
        </div>
      </div>

      {bucketData.children.length > 0 ? (
        <div className="children">
          {bucketData.children.map((child, i) => (
            <div
              className="bucket"
              style={
                child.children.length > 0
                  ? { width: "max-content", borderRight: "3px solid white" }
                  : null
              }
            >
              <span>
                <img
                  className="bucket-pic-child"
                  alt="Bucket Image"
                  src={Bucket_img}
                />
                <h2>
                  {child.name}: {child.percentage}%
                </h2>

                <h2>${((child.percentage / 100) * calculation).toFixed(2)}</h2>
                <p>
                  Minimum Amount:{" "}
                  {child.min_atm == null ? "None" : child.min_atm}
                </p>
                <p>
                  {child.description ? child.description : <span>&nbsp;</span>}
                </p>
                {child.children.length > 0 ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {child.children.map((nextchild, i) => (
                      <div
                        className="bucket"
                        style={{
                          borderTop: "3px solid white",
                          paddingTop: "30px",
                        }}
                      >
                        <span>
                          <img
                            className="bucket-pic-child"
                            alt="Bucket Image"
                            src={Bucket_img}
                          />
                          <h2>
                            {nextchild.name}: {nextchild.percentage}%
                          </h2>
                          <h2>
                            {(
                              (nextchild.percentage / 100) *
                              ((child.percentage / 100) * calculation).toFixed(
                                2
                              )
                            ).toFixed(2)}
                          </h2>
                          <p>
                            Minimum Amount:{" "}
                            {nextchild.min_atm == null
                              ? "None"
                              : nextchild.min_atm}
                          </p>
                          <p>
                            {nextchild.description ? (
                              nextchild.description
                            ) : (
                              <span>&nbsp;</span>
                            )}
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
