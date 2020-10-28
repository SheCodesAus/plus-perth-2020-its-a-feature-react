import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import transactionBucket from "../../components/Buckets/Buckets";
import { Link } from "react-router-dom";

function TransactionsPage() {
  return (
    <div>
      <h1>This is Transactions Page with buckets</h1>

      <div className="bucket_row">
        <transactionBucket />
      </div>
      <div>
        <Button value="Submit" />
      </div>
    </div>
  );
}

export default TransactionsPage;
