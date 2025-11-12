import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Checkout.css';
import Razorpay from 'razorpay';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const total = getCartTotal();

  const handleInputChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.phone) {
      alert('Please fill in all shipping details');
      return;
    }
    // Store shipping details in localStorage for the payment page
    localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
    navigate('/payment');
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container" style={{ textAlign: 'center' }}>
        <div className="checkout-header" style={{ textAlign: 'center' }}>
          <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>Checkout</h1>
        </div>
        <div className="empty-checkout" style={{ textAlign: 'center' }}>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'rgba(232, 232, 232, 0.9)', marginBottom: '3rem', fontWeight: '300' }}>Your cart is empty. Please add items to checkout.</p>
          <button className="empty-checkout-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container" style={{ textAlign: 'center' }}>
      <div className="checkout-header" style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>Checkout</h1>
      </div>

      <div className="checkout-content" style={{ textAlign: 'center' }}>
        <div className="order-summary" style={{ textAlign: 'center' }}>
          <h2 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className="order-item" style={{ textAlign: 'left' }}>
              <img src={item.image} alt={item.name} className="order-item-image" />
              <div className="order-item-details" style={{ textAlign: 'left' }}>
                <h4 style={{ textAlign: 'left', color: '#e8e8e8', fontSize: '1.2rem', fontWeight: '600' }}>{item.name}</h4>
                <p style={{ textAlign: 'left', color: 'rgba(232, 232, 232, 0.7)', fontSize: '1rem' }}>Size: {item.size} | Quantity: {item.quantity} | Price: {item.price}</p>
              </div>
            </div>
          ))}
          <div className="order-total" style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>
            Total: ₹{total.toFixed(2)}
          </div>
        </div>

        <div className="shipping-form" style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <h2 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Shipping Details</h2>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>Name:</label>
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                style={{ textAlign: 'left' }}
              />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>Address:</label>
              <textarea
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                required
                placeholder="Enter your complete address"
                style={{ textAlign: 'left' }}
              />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={shippingDetails.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
                style={{ textAlign: 'left' }}
              />
            </div>
            <button type="submit" className="proceed-btn" style={{ textAlign: 'center' }}>
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate('/cart')} style={{ textAlign: 'center' }}>Back to Cart</button>
    </div>
  );
};

export default Checkout;
