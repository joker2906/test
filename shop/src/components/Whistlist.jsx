import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { useCart } from './CartContext';
import './Wishlist.css';

const Whistlist = () => {
  const navigate = useNavigate();
  const { filteredWishlist, removeFromWishlist, cart, addToCart, searchQuery, setSearchQuery } = useCart();

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
          <span className="auth-label" onClick={() => navigate('/wishlist')}>❤️ ({filteredWishlist.length})</span>
          <span className="auth-label" onClick={() => navigate('/cart')}>🛒 ({cart.length})</span>
          <span className="auth-label" onClick={() => navigate('/')}>Logout</span>
          {/* <span className="auth-label" onClick={() => navigate('/signup')}>Sign Up</span> */}
        </div>
      </header>

      <main className="wishlist-container">
        <div className="wishlist-header">
          <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>My Wishlist</h1>
        </div>

        {filteredWishlist.length === 0 ? (
          <div className="empty-wishlist" style={{ textAlign: 'center' }}>
            <p style={{ textAlign: 'center', fontSize: '1.3rem', color: 'rgba(232, 232, 232, 0.9)', marginBottom: '3rem', fontWeight: '300' }}>Your wishlist is empty. Start adding items!</p>
            <button className="back-home-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Back to Home</button>
          </div>
        ) : (
          <div>
            {filteredWishlist.map((item, index) => (
              <div key={`${item.name}-${item.size}`} className="wishlist-item" style={{ textAlign: 'left' }}>
                <img src={item.image} alt={item.name} className="wishlist-item-image" />
                <div className="wishlist-item-details" style={{ textAlign: 'left' }}>
                  <h3 className="wishlist-item-name" style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>{item.name}</h3>
                  <p className="wishlist-item-price" style={{ textAlign: 'left', color: '#ffd700', fontWeight: '700' }}>{item.price}</p>
                  <p className="wishlist-item-size" style={{ textAlign: 'left', color: 'rgba(232, 232, 232, 0.7)' }}>Size: {item.size}</p>
                </div>
                <div className="wishlist-actions" style={{ textAlign: 'center' }}>
                  <button className="add-to-cart-btn" onClick={() => {
                    addToCart(item, 1); // Add with default quantity 1
                    removeFromWishlist(item); // Remove from wishlist after adding to cart
                  }} style={{ textAlign: 'center' }}>Add to Cart</button>
                  <button className="remove-btn" onClick={() => removeFromWishlist(item)} style={{ textAlign: 'center' }}>Remove</button>
                </div>
              </div>
            ))}
            <button className="back-home-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Continue Shopping</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Whistlist;
