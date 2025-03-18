import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.cart.items);
      calculateTotal(response.data.cart.items);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cart items');
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/cart/update',
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  const checkout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/orders/create', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order placed successfully!');
      fetchCart();
    } catch (err) {
      alert('Failed to place order');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-price">${item.product.price}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="remove-item-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={checkout} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 