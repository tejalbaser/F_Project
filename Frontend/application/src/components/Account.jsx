import React, { useEffect, useState } from "react";


function Account(){
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/orders")
          .then((response) => response.json())
          .then((data) => setOrderHistory(data))
          .catch((error) => console.error("Error fetching order history:", error));
    }, []);
    
    return(
        <div>
            <h1>Your Account</h1>
            <p>Manage your account details here.</p>
            <h2>Order History</h2>
      <ul>
        {orderHistory.map((order) => (
          <li key={order.id}>{`Order #${order.id} - Total: $${order.total}`}</li>
        ))}
      </ul>
        </div>
    );
}

export default Account;