import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TransactionsHistoryPage() {

    const [transactionList, setTransactionList] = useState();

    useEffect(async () => {
        // const token = window.localStorage.getItem("token");
        const token = "6c63ed64ee07640fcb91c3a10383c953e1b3713d"
        if (!token) { return }
        const response = await fetch("http://localhost:8000/transactions/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
        })
        const data = await response.json();
        if (response.ok) {
            /// check response.status for status code too as response.ok only checks for server errors!
            setTransactionList(data);
            console.log(data);
        }
    }, [])

    return (
        <div>
            <h1>Transaction History</h1>

            {
                transactionList ?
                    <ul>
                        {transactionList.map(trans => <Link to={`/TransactionsHistoryDetail/${trans.id}`}><li key={trans.id}>{trans.date_created.slice(0, 10)}</li></Link>)}
                    </ul>
                    :
                    <h3>No transactions</h3>
            }
        </div>

    )
}

export default TransactionsHistoryPage;