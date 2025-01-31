import React, { useState } from "react";
import "./cart.css";

function Cart({ cart, removeFromCart }) {
  const [cartCount, setCartCount] = useState(0);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Mock payment function
    alert(`Payment of $${totalPrice} successful!`);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalPrice}</h3>
      {cart.length > 0 && (
        <button className="payment-btn" onClick={handlePayment}>Proceed to Payment</button>
      )}
      <div className="cart-icon">
        🛒 Cart: <span>{cart.length}</span>
      </div>
    </div>
  );
}

export default Cart;
