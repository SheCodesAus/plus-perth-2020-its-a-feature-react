import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TransactionDetailPage() {

    const { id } = useParams();

    const [transaction, setTransaction] = useState();
    const [receipt, setReceipt] = useState();

    useEffect(async () => {
        // const token = window.localStorage.getItem("token");
        const token = "6c63ed64ee07640fcb91c3a10383c953e1b3713d"
        if (!token) { return }
        console.log("id is... ", id)
        const response = await fetch(`http://localhost:8000/transactions/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
        })
        const data = await response.json();
        if (response.ok) {
            /// check response.status for status code too as response.ok only checks for server errors!
            setTransaction(data);
            console.log(data);
            console.log(data.receipt);
            console.log(typeof (data.receipt))
            // console.log(receiptObj);
            // console.log(typeof (receiptObj))
            // const array = JSON.parse(receiptObj);
            const array = data.receipt.slice(1, -1).split('},');
            console.log(array);
            console.log(typeof (array))
            const parsed = JSON.parse(array);
            const receiptData = data.receipt.map(item => item + "},");
            console.log(receiptData);
            // const ro = JSON.parse(receipt);

            console.log(receiptData);
        }
    }, [])

    return (
        transaction ?
            <div>
                < h1 > ${transaction.income}</h1 >
                <h4>{transaction.date_created.slice(0, 10)}</h4>
                <h4>{transaction.date_created.slice(11, 19)}</h4>

            </div >
            :
            null
    )
}

export default TransactionDetailPage;