import React from 'react';
import { useNavigate } from 'react-router-dom';
import shorts from './shorts.jpg';
import logo from './logo.jpg';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { useCart } from './useCartHook';

export default function Shorts() {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();

  const handleAddToCart = () => {
    const size = document.getElementById('size').value;
    if (!size) {
      alert('Please select a size');
      return;
    }
    const quantity = 1;
    addToCart({ name: 'Mast & Harbour Men Cotton Shorts', price: '₹199.99', size, image: shorts }, quantity);
  };

  const handleAddToWishlist = () => {
    const size = document.getElementById('size').value;
    if (!size) {
      alert('Please select a size');
      return;
    }
    addToWishlist({ name: 'Mast & Harbour Men Cotton Shorts', price: '₹199.99', size, image: shorts });
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
          <img src={logo} alt="Logo" className="logo"  style={{marginLeft:'20px', color:'white', textDecoration:'none'}}/>
          <a href="/home" className="back-btn" style={{borderRadius: '5px',marginLeft:'20px',height:'30px',
            width:'100px', color:'white',padding:'10px',border:"1px solid white", textDecoration:'none'}}>← Back to Select Dress</a>
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
          {/* <span className="auth-label" onClick={() => navigate('/signup')}>Sign Up</span> */}
        </div>
      </header>

      <main className="main-content">
        <section id="mens-section" className="mens-section" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', padding: '2rem' }}>
          <div className="product-image-container" style={{ flex: '1', maxWidth: '50%'}}>
            <img src={shorts} alt="Shorts" className="product-image" style={{ height: '60%', width: '60%', objectFit: 'cover' }} />
          </div>
          <div className="product-details" style={{ flex: '1', maxWidth: '50%', textAlign: 'center' }}>
            <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Mast & Harbour Men Cotton Shorts</h1>
            <h2 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Product Details</h2>
            <h3 style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.9)', fontWeight: '300' }}>Blue cotton shorts,<br />
               has an elasticated waistband, 2 pockets,<br />
               straight hem</h3>
            <h2 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Size & Fit</h2>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Brand Fit: Standard</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Fit: Regular Fit</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>The model (height 6') <br/>size 40</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Material & Care</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>100% cotton</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Machine Wash</p>
            <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)' }}>Available Sizes: S, M, L, XL, XXL</p>
              <div className="size-select" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <label
                  htmlFor="size"
                  style={{ textAlign: 'center', color: '#e8e8e8', fontWeight: '600', display: 'block', marginBottom: '0.75rem' }}
                >
                  Select Size:
                </label>
                <select
                  id="size"
                  name="size"
                  style={{
                    minWidth: '140px',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '10px',
                    border: '2px solid rgba(255, 215, 0, 0.5)',
                    background: '#fdfdfd',
                    color: '#000000',
                    fontSize: '0.9rem',
                  }}
                >
                    <option value="">Choose Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
               <div
                 style={{
                   marginTop: '1.5rem',
                   display: 'flex',
                   flexWrap: 'wrap',
                   justifyContent: 'center',
                   gap: '0.75rem',
                 }}
               >
                 <button
                   className="product-button product-button-primary"
                   onClick={handleAddToCart}
                   style={{
                     minWidth: '170px',
                     padding: '0.65rem 1.6rem',
                     textAlign: 'center',
                     borderRadius: '999px',
                     fontWeight: 600,
                     fontSize: '0.95rem',
                     whiteSpace: 'nowrap',
                   }}
                 >
                   Add to Cart
                 </button>
                 <button
                   className="product-button product-button-secondary"
                   onClick={handleAddToWishlist}
                   style={{
                     minWidth: '190px',
                     padding: '0.65rem 1.6rem',
                     textAlign: 'center',
                     borderRadius: '999px',
                     fontWeight: 600,
                     fontSize: '0.95rem',
                     whiteSpace: 'nowrap',
                   }}
                 >
                   Add to Wishlist
                 </button>
               </div>
            </div>
            <h3 className="product-title" style={{ textAlign: 'center', color: '#e8e8e8', fontWeight: '600' }}>Shorts</h3>
            <p className="product-price" style={{ textAlign: 'center', color: '#ffd700', fontWeight: '700' }}>price - ₹199.99</p>
          </div>
        </section>
      </main>
    </div>
  );
}
