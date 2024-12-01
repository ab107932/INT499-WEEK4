// Cart.jsx
import React, { useState, useEffect } from 'react';

const Cart = () => {
  // State to store the cart items
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from LocalStorage when the component mounts
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems)); // Parse the stored JSON string into an array
    }
  }, []);

  // Function to add an item to the cart
  const addItemToCart = (movie) => {
    // Check if the movie is already in the cart
    const isMovieInCart = cartItems.some(item => item.id === movie.id);
    if (!isMovieInCart) {
      const updatedCart = [...cartItems, movie]; // Add new movie to cart
      setCartItems(updatedCart); // Update state
      localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Save to LocalStorage
    } else {
      alert("This movie is already in your cart!");
    }
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id); // Filter out the item to remove
    setCartItems(updatedCart); // Update the state
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Save updated cart items to LocalStorage
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]); // Clear the state
    localStorage.removeItem('cartItems'); // Remove cart items from LocalStorage
  };

  return (
    <div>
      <h1>Your Cart</h1>

      {/* If cart is empty, show a message */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.overview}</p>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          {/* Clear cart button */}
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
