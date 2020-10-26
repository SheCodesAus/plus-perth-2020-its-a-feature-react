import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Bucket from "../../components/Buckets/Buckets";

function TransactionsPage() {
  return (
    <div>
      <h1>This is Transactions Page with buckets</h1>
      <div className="bucket_row">
        <Bucket />
      </div>
      <div>
        <Button value="Submit" />
      </div>
    </div>
  );
}

export default TransactionsPage;
