import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Account from "./components/Account";
import Help from "./components/Help"
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);
  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCart([]);
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Define routes for different views */}
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" replace />} // Redirect to /home as the default route
        />
        <Route
          path="/home"
          element={<Home addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
        <Route
          path="/account"
          element={
            isAuthenticated ? (
              <Account cart={cart} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;

