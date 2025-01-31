import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./Home.css";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");  // State for search query

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data); 
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="loader">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="error">No products found.</div>;
  }

  const categorizedProducts = {
    "Greeting Cards": filteredProducts.filter((p) => p.category === "cards"),
    "Greeting Boxes": filteredProducts.filter((p) => p.category === "boxes"),
    Gifts: filteredProducts.filter((p) => p.category === "gifts"),
    Scrapbooks: filteredProducts.filter((p) => p.category === "scrapbooks"),
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="home-container">
      <Link to="/login" className="login-button">Login</Link>

      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for products..."
        className="search-bar"
      />

      {Object.entries(categorizedProducts).map(([category, items]) => (
        <div key={category} className="category">
          <h2>{category}</h2>
          <div className="product-list">
            {items.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.image_url}
                  alt={product.name || "Product Image"}
                  className="product-image"
                  style={{ height: "300px", width: "300px" }}
                />
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
