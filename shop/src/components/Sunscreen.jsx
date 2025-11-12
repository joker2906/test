import React from 'react';
import { useNavigate } from 'react-router-dom';
import sunscreen from './sunscreen.jpg';
import logo from './logo.jpg';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { useCart } from './CartContext';

export default function Sunscreen() {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();

  const handleAddToCart = () => {
    const size = document.getElementById('size').value;
    if (!size) {
      alert('Please select a size');
      return;
    }
    const quantity = 1;
    addToCart({ name: 'SPF 50 Sunscreen', price: '₹299.99', size, image: sunscreen }, quantity);
  };

  const handleAddToWishlist = () => {
    const size = document.getElementById('size').value;
    if (!size) {
      alert('Please select a size');
      return;
    }
    addToWishlist({ name: 'SPF 50 Sunscreen', price: '₹299.99', size, image: sunscreen });
  };

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
          <a href="/home" class="back-btn" style={{borderRadius: '5px',leftMargin:'20px',height:'30px',
            width:'100px', color:'white',padding:'10px',border:"1px solid white", textDecoration:'none'}}>← Back to Beauty</a>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search products..." className="search-input" />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
        <div className="auth-container">
          <span className="auth-label" onClick={() => navigate('/wishlist')}>❤️ ({wishlist.length})</span>
          <span className="auth-label" onClick={() => navigate('/cart')}>🛒 ({cart.length})</span>
          <span className="auth-label" onClick={() => navigate('/')}>Logout</span>
        </div>
      </header>

      <main className="main-content">
        <section id="beauty-section" className="beauty-section" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', padding: '2rem' }}>
          <div className="product-image-container" style={{ flex: '1', maxWidth: '50%'}}>
            <img src={sunscreen} alt="Sunscreen" className="product-image" style={{ height: '60%', width: '60%', objectFit: 'cover' }} />
          </div>
          <div className="product-details" style={{ flex: '1', maxWidth: '50%', textAlign: 'center' }}>
            <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>SPF 50 Sunscreen</h1>
            <h2 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Product Details</h2>
            <h3 style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.9)', fontWeight: '300' }}>Broad spectrum SPF 50 protection,<br />
               Water-resistant, non-greasy formula</h3>
            <h2 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Benefits</h2>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Protects against UVA/UVB rays</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Suitable for all skin types</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>80ml bottle</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Material & Care</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Apply generously to skin</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Reapply every 2 hours</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Available Sizes: 50ml, 100ml, 200ml</p>
              <div class="size-select:" style={{ textAlign: 'center' }}>
                <label for="size" style={{ textAlign: 'center', color: '#e8e8e8', fontWeight: '600' }}>Select Size:</label>
                <select id="size" name="size" onchange="selectSize(this.value)" style={{height:'30px',width:'110px'}}>
                    <option value="">Choose Size</option>
                    <option value="50ml">50ml</option>
                    <option value="100ml">100ml</option>
                    <option value="200ml">200ml</option>
                </select>
               <br></br>

               <br></br>
                <button class="product"
                onClick={handleAddToCart}
                 style={{height:'40px',width:'100px', textAlign: 'center'}}> Add to Cart</button>

              &nbsp;&nbsp;&nbsp;&nbsp;
              <button class="product" onClick={handleAddToWishlist}
                style={{height:'40px',width:'100px', textAlign: 'center'}}>
                Add to Wishlist</button>
            </div>
            <h3 className="product-title" style={{ textAlign: 'center', color: '#e8e8e8', fontWeight: '600' }}>Sunscreen</h3>
            <p className="product-price" style={{ textAlign: 'center', color: '#ffd700', fontWeight: '700' }}>price - ₹299.99</p>
          </div>
        </section>
      </main>
    </div>
  );
}
