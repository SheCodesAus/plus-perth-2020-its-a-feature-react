import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../EditBuckets/EditBuckets.css";
import Bucket_img from "../../../assets/images/bucket.png";
import Delete from "../../../assets/images/delete.png";
import Edit from "../../../assets/images/edit.png";
import { getStorage } from "../../../helpers/localStorage";
import ReactTooltip from "react-tooltip";

function Bucket() {

    // This is used to display the buckets on the page in correct order
    const [buckets, setBuckets] = useState();

    // This is used to change the bucket details which will then be POSTED to API
    const [updatedBuckets, setUpdatedBuckets] = useState();

    const [percentageError, setPercentageError] = useState([]);

    const token = window.localStorage.getItem("token");
    const income = 5000;

    const [calculation, setCalculation] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}buckets`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${token}`,
            },
        })
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setBuckets(data);
            });
    }, [token]);

    useEffect(() => {
        if (buckets) {
            let bucketList = {}
            for (let i = 0; i < buckets.length; i++) {
                const id = buckets[i].id;
                bucketList[id] = buckets[i];
                if (buckets[i].children.length > 0) {
                    for (let j = 0; j < buckets[i].children.length; j++) {
                        const id = buckets[i].children[j].id;
                        bucketList[id] = buckets[i].children[j];
                        if (buckets[i].children[j].children.length > 0) {
                            for (let k = 0; k < buckets[i].children[j].children.length; k++) {
                                const id = buckets[i].children[j].children[k].id;
                                bucketList[id] = buckets[i].children[j].children[k];
                            }
                        }
                    }
                }
            }
            setUpdatedBuckets(bucketList);
        }
    }, [buckets])

    const handleChange = (e, bucketID) => {
        const { id, value } = e.target;
        console.log("id is ", id, "value is ", value);
        const update = updatedBuckets[bucketID];
        update[id] = value;
        setUpdatedBuckets((prevBuckets) => ({
            ...prevBuckets,
            update
        }));
        // console.log(updatedBuckets);
        console.log("the bucket data looks like this... ", updatedBuckets);
        console.log("the errors look like this ", percentageError);

        // ACTUALLY NO! BETETR TO LOOP OVER THE BUCKETS AND GET THEM ALL OUT INTO A SINGLE LEVEL.THEN ACCESS THEM BY THEIR ID's BECAUSE I WILL BE SENDING THE REQUESTS PER INDIVIDUAL BUCKET. THEN I JUST NEED TO CHECK WHICH ONES HAVE THE SAME PARENT AND MAKE SURE THEY ADD UP TO 100.
    }

    const saveChanges = () => {
        console.log("checking everything adds to 100%")
        for (let i = 0; i < buckets.length; i++) {
            if (buckets[i].children.length > 0) {
                const bucketIDs = buckets[i].children.map(bucket => bucket.id)
                const totals = bucketIDs.map(id => updatedBuckets[id].percentage);
                console.log("totals of ", buckets[i].name, "children = ", totals);
                const total = totals.reduce((accumulator, value) => accumulator + value);
                if (total !== 100) {
                    console.log("ERROR! Children buckets of ", buckets[i].name, "do not add to 100%. Cannot save.")
                    setPercentageError((prevState) => ([
                        ...prevState,
                        buckets[i].name
                    ]));
                }
                else {
                    const index = percentageError.indexOf(buckets[i].name)
                    console.log("index to remove from error array is ", index);
                    const errors = percentageError;
                    if (index > -1) {
                        errors.splice(index, 1);
                        console.log("one error removed. errors now looks like this: ", errors);
                        setPercentageError(errors);
                    }
                }
                console.log("child bucket IDs of ", buckets[i].name, " = ", bucketIDs);

                for (let j = 0; j < buckets[i].children.length; j++) {
                    if (buckets[i].children[j].children.length > 0) {
                        const bucketIDs = buckets[i].children[j].children.map(bucket => bucket.id)
                        const totals = bucketIDs.map(id => updatedBuckets[id].percentage);
                        const total = totals.reduce((accumulator, value) => accumulator + value);
                        if (total !== 100) {
                            console.log("ERROR! Children buckets of ", buckets[i].children[j].name, "do not add to 100%. Cannot save.")
                            setPercentageError((prevState) => ([
                                ...prevState,
                                buckets[i].children[j].name
                            ]));
                        }
                        else {
                            const index = percentageError.indexOf(buckets[i].children[j].name)
                            const errors = percentageError;
                            if (index > -1) {
                                errors.splice(index, 1);
                                console.log("one error removed. errors now looks like this: ", errors);
                                setPercentageError(errors);
                            }
                        }
                        // console.log("total % = ", totals)
                        // console.log("child bucket IDs of ", buckets[i].children[j].name, " = ", bucketIDs);
                    }
                    else {
                        const index = percentageError.indexOf(buckets[i].name)
                        const errors = percentageError;
                        if (index > -1) {
                            errors.splice(index, 1);
                            setPercentageError(errors);
                        }
                    }
                }
            }
        }
    }

    return (
        buckets ?
            <React.Fragment>
                <button onClick={saveChanges}>SAVE CHANGES :)</button>
                {
                    buckets.map((bucket) => {
                        return (

                            <div key={bucket.id} className=" bucket-group animated fadeInLeft">
                                < div
                                    className="bucket-parent"
                                    style={
                                        bucket.children.length > 0
                                            ? { borderBottom: "3px solid white" }
                                            : null
                                    }
                                >
                                    <img className="bucket-pic" alt="Bucket Image" src={Bucket_img} />
                                    <div>
                                        <input
                                            className="input"
                                            type="text"
                                            id="name"
                                            placeholder={bucket.name ? bucket.name : "Title"}
                                            onChange={(e) => handleChange(e, bucket.id)}
                                        />
                                        <input
                                            className="input"
                                            type="text"
                                            id="percentage"
                                            placeholder={bucket.percentage}
                                            onChange={(e) => handleChange(e, bucket.id)}
                                        />
                                %
                                <p>
                                            Minimum Amount: <br />$
                                <input
                                                className="input"
                                                type="text"
                                                id="min_amt"
                                                placeholder={bucket.min_amt ? bucket.min_amt : "0"}
                                                onChange={(e) => handleChange(e, bucket.id)}
                                            />
                                        </p>
                                        <p>
                                            Bucket Description:
                            </p>
                                        <textarea
                                            className="input"
                                            type="text"
                                            id="description"
                                            onChange={(e) => handleChange(e, bucket.id)}
                                        >{bucket.description ? bucket.description : "Enter account description here (optional)"}</textarea>
                                    </div>

                                    <div>
                                        <a className="delete" href="/">
                                            {" "}
                                            <img src={Delete} alt="Bin image" height={30}></img>
                                        </a>

                                    </div>
                                </div >


                                {
                                    bucket.children.length > 0 ?
                                        <div className="children">
                                            {bucket.children.map((bucket, i) => (
                                                <div
                                                    key={i}
                                                    className={
                                                        i < bucket.children.length - 1
                                                            ? "bucket bucket-child"
                                                            : "bucket"
                                                    }
                                                    style={
                                                        bucket.children.length > 0 ? { width: "max-content" } : null
                                                    }
                                                >
                                                    <span>
                                                        <img
                                                            className="bucket-pic-child"
                                                            alt="Bucket"
                                                            src={Bucket_img}
                                                        />
                                                        <h2
                                                            data-tip={bucket.description}
                                                            data-for="descriptionTip-child"
                                                        >
                                                        </h2>
                                                        <div>
                                                            <input
                                                                className="input"
                                                                type="text"
                                                                id="name"
                                                                placeholder={bucket.name ? bucket.name : "Title"}
                                                                onChange={(e) => handleChange(e, bucket.id)}
                                                            />
                                                            <input
                                                                className="input"
                                                                type="text"
                                                                id="percentage"
                                                                placeholder={bucket.percentage}
                                                                onChange={(e) => handleChange(e, bucket.id)}
                                                            />
                                %
                                <p>
                                                                Minimum Amount: <br />$
                                <input
                                                                    className="input"
                                                                    type="text"
                                                                    id="min_amt"
                                                                    placeholder={bucket.min_amt ? bucket.min_amt : "0"}
                                                                    onChange={(e) => handleChange(e, bucket.id)}
                                                                />
                                                            </p>
                                                            <p>
                                                                Bucket Description:
                            </p>
                                                            <textarea
                                                                className="input"
                                                                type="text"
                                                                id="description"
                                                                onChange={(e) => handleChange(e, bucket.id)}
                                                            >{bucket.description ? bucket.description : "Enter account description here (optional)"}</textarea>
                                                        </div>

                                                        <div>
                                                            <a className="delete" href="/">
                                                                {" "}
                                                                <img src={Delete} alt="Bin image" height={30}></img>
                                                            </a>

                                                        </div>


                                                        {bucket.children.length > 0 ? (
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                {bucket.children.map((bucket, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="bucket"
                                                                        style={{
                                                                            borderTop: "5px solid white",
                                                                            paddingTop: "30px",
                                                                        }}
                                                                    >
                                                                        <span>
                                                                            <img
                                                                                className="bucket-pic-child"
                                                                                alt="Bucket"
                                                                                src={Bucket_img}
                                                                            />
                                                                            <h2
                                                                                data-tip={bucket.description}
                                                                                data-for="descriptionTip-childs-child"
                                                                            ></h2>
                                                                            <div>
                                                                                <input
                                                                                    className="input"
                                                                                    type="text"
                                                                                    id="name"
                                                                                    placeholder={bucket.name ? bucket.name : "Title"}
                                                                                    onChange={(e) => handleChange(e, bucket.id)}
                                                                                />
                                                                                <input
                                                                                    className="input"
                                                                                    type="text"
                                                                                    id="percentage"
                                                                                    placeholder={bucket.percentage}
                                                                                    onChange={(e) => handleChange(e, bucket.id)}
                                                                                />
                                %
                                <ReactTooltip id="descriptionTip-childs-child" />

                                                                                <p>
                                                                                    Minimum Amount: <br />$
                                <input
                                                                                        className="input"
                                                                                        type="text"
                                                                                        id="min_amt"
                                                                                        placeholder={bucket.min_amt ? bucket.min_amt : "0"}
                                                                                        onChange={(e) => handleChange(e, bucket.id)}
                                                                                    />
                                                                                </p>
                                                                                <p>
                                                                                    Bucket Description:
                            </p>
                                                                                <textarea
                                                                                    className="input"
                                                                                    type="text"
                                                                                    id="description"
                                                                                    onChange={(e) => handleChange(e, bucket.id)}
                                                                                >{bucket.description ? bucket.description : "Enter account description here (optional)"}</textarea>
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        :
                                        null
                                }
                            </div >
                        )
                    })
                }
            </React.Fragment>
            :
            <h2>Couldn't find any buckets!</h2>
    );
}

export default Bucket;
