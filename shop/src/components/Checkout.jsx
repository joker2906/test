import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCartHook';
import logo from './logo.jpg';
import { FaSearch } from 'react-icons/fa';
import './Checkout.css';
import api from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, wishlist, getCartTotal, searchQuery, setSearchQuery } = useCart();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.phone) {
      alert('Please fill in all shipping details');
      return;
    }
    try {
      const payload = {
        items: cart.map((c) => ({
          productId: c._id || null,
          name: c.name,
          price: Number(c.price),
          quantity: Number(c.quantity || 1),
          image: c.image,
          size: c.size || null,
        })),
        total: Number(total),
        shippingDetails,
      };
      const { data } = await api.post('/orders', payload);
      const orderId = data?.order?._id;
      // Store shipping and order id for the payment page
      localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
      if (orderId) localStorage.setItem('currentOrderId', orderId);
      navigate('/payment');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to create order';
      alert(`❌ ${msg}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <header
          className="header"
          style={{
            position: 'sticky',
            top: 0,
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
            padding: '1.2rem 3rem',
            zIndex: 1000,
            boxSizing: 'border-box',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <a
              href="/cart"
              className="back-btn"
              style={{
                borderRadius: '5px',
                marginLeft: '20px',
                height: '30px',
                width: '120px',
                color: 'white',
                padding: '10px',
                border: '1px solid white',
                textDecoration: 'none',
              }}
            >
              ← Back to Cart
            </a>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button" style={{ color: '#000000' }}>
              <FaSearch />
            </button>
          </div>
          <div className="auth-container">
            <span className="auth-label" onClick={() => navigate('/wishlist')}>
              ❤️ ({wishlist.length})
            </span>
            <span className="auth-label" onClick={() => navigate('/cart')}>
              🛒 ({cart.length})
            </span>
            <span className="auth-label" onClick={() => navigate('/') }>
              Logout
            </span>
          </div>
        </header>

        <div className="checkout-container" style={{ textAlign: 'center' }}>
          <div className="checkout-header" style={{ textAlign: 'center' }}>
            <h1
              style={{
                textAlign: 'center',
                fontFamily: "'Playfair Display', serif",
                color: '#ffd700',
                textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
              }}
            >
              Checkout
            </h1>
          </div>
          <div className="empty-checkout" style={{ textAlign: 'center' }}>
            <p
              style={{
                textAlign: 'center',
                fontSize: '1.2rem',
                color: 'rgba(232, 232, 232, 0.9)',
                marginBottom: '3rem',
                fontWeight: '300',
              }}
            >
              Your cart is empty. Please add items to checkout.
            </p>
            <button
              className="empty-checkout-btn"
              onClick={() => navigate('/home')}
              style={{ textAlign: 'center' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header
        className="header"
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
          padding: '1.2rem 3rem',
          zIndex: 1000,
          boxSizing: 'border-box',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <a
            href="/cart"
            className="back-btn"
            style={{
              borderRadius: '5px',
              marginLeft: '20px',
              height: '30px',
              width: '120px',
              color: 'white',
              padding: '10px',
              border: '1px solid white',
              textDecoration: 'none',
            }}
          >
            ← Back to Cart
          </a>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" style={{ color: '#000000' }}>
            <FaSearch />
          </button>
        </div>
        <div className="auth-container">
          <span className="auth-label" onClick={() => navigate('/wishlist')}>
            ❤️ ({wishlist.length})
          </span>
          <span className="auth-label" onClick={() => navigate('/cart')}>
            🛒 ({cart.length})
          </span>
          <span className="auth-label" onClick={() => navigate('/') }>
            Logout
          </span>
        </div>
      </header>

      <div className="checkout-container" style={{ textAlign: 'center' }}>
        <div className="checkout-header" style={{ textAlign: 'center' }}>
          <h1
            style={{
              textAlign: 'center',
              fontFamily: "'Playfair Display', serif",
              color: '#ffd700',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
            }}
          >
            Checkout
          </h1>
        </div>

        <div className="checkout-content" style={{ textAlign: 'center' }}>
          <div className="order-summary" style={{ textAlign: 'center' }}>
            <h2
              style={{
                textAlign: 'center',
                color: '#ffd700',
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
            >
              Order Summary
            </h2>
            {cart.map((item, index) => (
              <div
                key={index}
                className="order-item"
                style={{
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="order-item-image"
                  style={{
                    width: '100%',
                    maxWidth: '160px',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
                    flexShrink: 0,
                  }}
                />
                <div
                  className="order-item-details"
                  style={{ textAlign: 'left', flex: 1, minWidth: '200px' }}
                >
                  <h4
                    style={{
                      textAlign: 'left',
                      color: '#e8e8e8',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    style={{
                      textAlign: 'left',
                      color: 'rgba(232, 232, 232, 0.7)',
                      fontSize: '1rem',
                    }}
                  >
                    Size: {item.size} | Quantity: {item.quantity} | Price: {item.price}
                  </p>
                </div>
              </div>
            ))}
            <div
              className="order-total"
              style={{
                textAlign: 'center',
                fontFamily: "'Playfair Display', serif",
                color: '#ffd700',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
            >
              Total: ₹{total.toFixed(2)}
            </div>
          </div>

          <div className="shipping-form" style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
              <h2
                style={{
                  textAlign: 'center',
                  color: '#ffd700',
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                }}
              >
                Shipping Details
              </h2>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label
                  style={{
                    textAlign: 'left',
                    color: '#e8e8e8',
                    fontWeight: '600',
                  }}
                >
                  Name:
                </label>
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
                <label
                  style={{
                    textAlign: 'left',
                    color: '#e8e8e8',
                    fontWeight: '600',
                  }}
                >
                  Address:
                </label>
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
                <label
                  style={{
                    textAlign: 'left',
                    color: '#e8e8e8',
                    fontWeight: '600',
                  }}
                >
                  Phone:
                </label>
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
              <button
                type="submit"
                className="proceed-btn"
                style={{ textAlign: 'center' }}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate('/cart')}
          style={{ textAlign: 'center' }}
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;
