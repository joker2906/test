import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { useCart } from './CartContext';

const Buynow = () => {
  const navigate = useNavigate();
  const { buyNowItem, cart, wishlist, searchQuery, setSearchQuery } = useCart();
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
          <span className="auth-label" onClick={() => navigate('/cart')}>🛒 ({cart.length})</span>
          <span className="auth-label" onClick={() => navigate('/')}>Logout</span>
          {/* <span className="auth-label" onClick={() => navigate('/signup')}>Sign Up</span> */}
        </div>
      </header>
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>Buy Now</h1>
        {buyNowItem ? (
          <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', textAlign: 'center' }}>
            <img src={buyNowItem.image} alt={buyNowItem.name} style={{ width: '200px', height: '200px' }} />
            <h3 style={{ color: '#e8e8e8' }}>{buyNowItem.name}</h3>
            <p style={{ color: '#ffd700' }}>Price: {buyNowItem.price}</p>
            <p style={{ color: 'rgba(232, 232, 232, 0.7)' }}>Size: {buyNowItem.size}</p>
            <button onClick={() => navigate('/payment')} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#ffd700', color: '#000', border: 'none', borderRadius: '5px' }}>Proceed to Payment</button>
          </div>
        ) : (
          <p style={{ color: 'rgba(232, 232, 232, 0.9)' }}>No item selected for purchase.</p>
        )}
        <button onClick={() => navigate('/home')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#e8e8e8', color: '#000', border: 'none', borderRadius: '5px' }}>Back to Home</button>
      </main>
    </div>
  );
};

export default Buynow;
