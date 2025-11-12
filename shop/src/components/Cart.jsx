import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import { FaBars, FaSearch, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { filteredCart, updateCartQuantity, removeFromCart, wishlist, getCartTotal, clearCart, searchQuery, setSearchQuery } = useCart();

  const total = getCartTotal();

  return (
    <div>
      <header
        className="header"
        style={{
          position: 'sticky',top: 0,width: '100vw',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
          padding: '1.2rem 3rem',zIndex: 1000,
          boxSizing: 'border-box',transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo"  style={{leftMargin:'20px', color:'white', textDecoration:'none'}}/>
          <a href="/home" className="back-btn" style={{borderRadius: '5px',leftMargin:'20px',height:'30px',
            width:'100px', color:'white',padding:'10px',border:"1px solid white", textDecoration:'none'}}>← Back to Select Dress</a>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search products..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
        <div className="auth-container">
          <span className="auth-label" onClick={() => navigate('/wishlist')}>❤️ ({wishlist.length})</span>
          <span className="auth-label" onClick={() => navigate('/cart')}>🛒 ({filteredCart.length})</span>
          <span className="auth-label" onClick={() => navigate('/')}>Logout</span>
          {/* <span className="auth-label" onClick={() => navigate('/signup')}>Sign Up</span> */}
        </div>
      </header>

      <main className="cart-container">
        <div className="cart-header" style={{ textAlign: 'center' }}>
          <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Shopping Cart</h1>
        </div>

        {filteredCart.length === 0 ? (
          <div className="empty-cart" style={{ textAlign: 'center' }}>
            <p style={{ textAlign: 'center', fontSize: '1.3rem', color: 'rgba(232, 232, 232, 0.9)', marginBottom: '3rem', fontWeight: '300' }}>Your cart is empty. Start shopping!</p>
            <button className="back-home-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Back to Home</button>
          </div>
        ) : (
          <div>
            {filteredCart.map((item, index) => (
              <div key={`${item.name}-${item.size}`} className="cart-item" style={{ textAlign: 'left' }}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details" style={{ textAlign: 'left' }}>
                  <h3 className="cart-item-name" style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>{item.name}</h3>
                  <p className="cart-item-price" style={{ textAlign: 'left', color: '#ffd700', fontWeight: '700' }}>{item.price}</p>
                  <p className="cart-item-size" style={{ textAlign: 'left', color: 'rgba(232, 232, 232, 0.7)' }}>Size: {item.size}</p>
                  <p className="cart-item-subtotal" style={{ textAlign: 'left', color: '#ffd700', fontWeight: '700' }}>Subtotal: ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</p>
                  <div className="quantity-controls" style={{ textAlign: 'center' }}>
                    <button className="quantity-btn" onClick={() => item.quantity > 1 && updateCartQuantity(item, item.quantity - 1)} style={{ textAlign: 'center' }}>
                      <FaMinus />
                    </button>
                    <span className="quantity-display" style={{ textAlign: 'center', color: '#e8e8e8' }}>Quantity: {item.quantity}</span>
                    <button className="quantity-btn" onClick={() => updateCartQuantity(item, item.quantity + 1)} style={{ textAlign: 'center' }}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item)} style={{ textAlign: 'center' }}>Remove</button>
              </div>
            ))}

            <div className="cart-summary" style={{ textAlign: 'center' }}>
              <div className="cart-total" style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Total: ₹{total.toFixed(2)}</div>
              <div className="cart-actions" style={{ textAlign: 'center' }}>
                <button className="clear-cart-btn" onClick={clearCart} style={{ textAlign: 'center' }}>Clear Cart</button>
                <button className="checkout-btn" onClick={() => navigate('/checkout')} style={{ textAlign: 'center' }}>Proceed to Checkout</button>
              </div>
            </div>

            <button className="back-home-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Continue Shopping</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
