import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import formal from './formal.jpg';
import casual from './casual.jpg';
import jeans from './jeans.jpg';
import shorts from './shorts.jpg';
import trackpants from './trackpants.jpg';
import tshirt from './tshirt.jpg';
import dress from './dress.jpg';
import sareewear from './sareewear.jpg';
import westernwear from './westernwear.jpg';
import ethnicwear from './ethnicwear.jpg';
import babydress from './babydress.jpg';
import childboywear from './childboy.jpg';
import childshirt from './childshirt.jpg';
import kidswear from './kidswear.jpg';
import sunscreen from './sunscreen.jpg';
import lipbalm from './lipbalm.jpg';
import perfume from './perfume.jpg';
import shampoo from './shampoo.jpg';
import fromalshoes from './fromalshoes.jpg';
import runningshoes from './runningshoes.jpg';
import footheels from './footheels.jpg';
import footwearwomens from './footwearwomens.jpg';
import './Home.css';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { useCart } from './CartContext';
import Footer from './Footer';

export default function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, wishlist, searchQuery, setSearchQuery } = useCart();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const casualwear = () => {
    navigate("/casual");
  };
  const Formalwear = () => {
    navigate("/formal");
  };
  const Jeans = () => {
    navigate("/jeans");
  };
  const Shorts = () => {
    navigate("/shorts");
  };
  const Trackpants = () => {
    navigate("/trackpants");
  };
  const Tshirts = () => {
    navigate("/Tshirts");
  };
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header
          className="header"
          style={{
            position: 'sticky', top: 0, width: '100%',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
            padding: window.innerWidth <= 768 ? '1rem' : '1.2rem 3rem',
            zIndex: 1000, boxSizing: 'border-box', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            gap: window.innerWidth <= 768 ? '1rem' : '0'
          }}
        >
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
          <div className="auth-container">
            <span className="auth-label" onClick={() => navigate('/wishlist')}>❤️ ({wishlist.length})</span>
            <span className="auth-label" onClick={() => navigate('/cart')}>🛒 ({cart.length})</span>
            
          </div>
        </header>
        <nav className="nav">
          <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="menu-item" onClick={() => { scrollToSection('mens-section'); setIsMenuOpen(false); }}>Men</div>
            <div className="menu-item" onClick={() => { scrollToSection('womens-section'); setIsMenuOpen(false); }}>Women</div>
            <div className="menu-item" onClick={() => { scrollToSection('kids-section'); setIsMenuOpen(false); }}>Kids</div>
            <div className="menu-item" onClick={() => { scrollToSection('beauty-section'); setIsMenuOpen(false); }}>Beauty</div>
            <div className="menu-item" onClick={() => { scrollToSection('footwear-section'); setIsMenuOpen(false); }}>Footwear</div>
            <span className="menu-item" onClick={() => navigate('/')}>Logout</span>
          </div>
          {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </nav>
        <main className="main-content">
        <section id="mens-section" className="mens-section">
          <h2 className="section-title">Mens</h2>
          <div className="product-grid">
            <div className="product-card" onClick={casualwear}>
              <img src={casual} alt="Casual Wear" className="product-image" />
              <h3 className="product-title">Casual Wear</h3>
              <p className="product-price">₹299.99</p>
            </div>
            <div className="product-card">
              <div className="product-card" onClick={Formalwear}>
                <img src={formal} alt="Formal Wear" className="product-image" />
                <h3 className="product-title">Formal Wear</h3>
                <p className="product-price">₹499.99</p>
              </div>
            </div>
            <div className="product-card" onClick={Jeans}>
              <img src={jeans} alt="Jeans" className="product-image" />
              <h3 className="product-title">Jeans</h3>
              <p className="product-price">₹949.99</p>
            </div>
            <div className="product-card" onClick={Shorts}>
              <img src={shorts} alt="Shorts" className="product-image" />
              <h3 className="product-title">Shorts</h3>
              <p className="product-price">₹199.99</p>
            </div>
            <div className="product-card" onClick={Trackpants}>
              <img src={trackpants} alt="Track Pants" className="product-image" />
              <h3 className="product-title">Track Pants</h3>
              <p className="product-price">₹349.99</p>
            </div>
            <div className="product-card" onClick={Tshirts}>
              <img src={tshirt} alt="T-Shirt" className="product-image" />
              <h3 className="product-title">T-Shirt</h3>
              <p className="product-price">₹249.99</p>
            </div>
          </div>
        </section>

        <section id="womens-section" className="womens-section">
          <h2 className="section-title">Womens</h2>
          <div className="product-grid">
            <div className="product-card" onClick={() => navigate('/dress')}>
              <img src={dress} alt="Dress" className="product-image" />
              <h3 className="product-title">Dress</h3>
              <p className="product-price">₹599.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/sareewear')}>
              <img src={sareewear} alt="Saree Wear" className="product-image" />
              <h3 className="product-title">Saree Wear</h3>
              <p className="product-price">₹799.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/westernwear')}>
              <img src={westernwear} alt="Western Wear" className="product-image" />
              <h3 className="product-title">Western Wear</h3>
              <p className="product-price">₹399.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/ethnicwear')}>
              <img src={ethnicwear} alt="Ethnic Wear" className="product-image" />
              <h3 className="product-title">Ethnic Wear</h3>
              <p className="product-price">₹499.99</p>
            </div>

          </div>
        </section>

        <section id="kids-section" className="kids-section">
          <h2 className="section-title">Kids</h2>
          <div className="product-grid">
            <div className="product-card" onClick={() => navigate('/babydress')}>
              <img src={babydress} alt="Baby Dress" className="product-image" />
              <h3 className="product-title">Baby Dress</h3>
              <p className="product-price">₹199.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/childboywear')}>
              <img src={childboywear} alt="Child Boy Wear" className="product-image" />
              <h3 className="product-title">Child Boy Wear</h3>
              <p className="product-price">₹299.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/childdress')}>
              <img src={childshirt} alt="Child Dress" className="product-image" />
              <h3 className="product-title">Child Dress</h3>
              <p className="product-price">₹249.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/kidswear')}>
              <img src={kidswear} alt="Kids Wear" className="product-image" />
              <h3 className="product-title">Kids Wear</h3>
              <p className="product-price">₹349.99</p>
            </div>
          </div>
        </section>

        <section id="beauty-section" className="kids-section">
          <h2 className="section-title">Beauty</h2>
          <div className="product-grid">
            <div className="product-card" onClick={() => navigate('/sunscreen')}>
              <img src={sunscreen} alt="Sunscreen" className="product-image" />
              <h3 className="product-title">Sunscreen</h3>
              <p className="product-price">₹299.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/lipbalm')}>
              <img src={lipbalm} alt="Lip Balm" className="product-image" />
              <h3 className="product-title">Lip Balm</h3>
              <p className="product-price">₹149.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/perfume')}>
              <img src={perfume} alt="Perfume" className="product-image" />
              <h3 className="product-title">Perfume</h3>
              <p className="product-price">₹799.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/shampoo')}>
              <img src={shampoo} alt="Shampoo" className="product-image" />
              <h3 className="product-title">Shampoo</h3>
              <p className="product-price">₹349.99</p>
            </div>
          </div>
        </section>

        <section id="footwear-section" className="kids-section">
          <h2 className="section-title">Footwear</h2>
          <div className="product-grid">
            <div className="product-card" onClick={() => navigate('/formalshoes')}>
              <img src={fromalshoes} alt="Formal Shoes" className="product-image" />
              <h3 className="product-title">Formal Shoes</h3>
              <p className="product-price">₹799.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/runningshoes')}>
              <img src={runningshoes} alt="Running Shoes" className="product-image" />
              <h3 className="product-title">Running Shoes</h3>
              <p className="product-price">₹599.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/footheels')}>
              <img src={footheels} alt="High Heels" className="product-image" />
              <h3 className="product-title">High Heels</h3>
              <p className="product-price">₹699.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/footwearwomen')}>
              <img src={footwearwomens} alt="Women's Footwear" className="product-image" />
              <h3 className="product-title">Women's Footwear</h3>
              <p className="product-price">₹499.99</p>
            </div>
          </div>
        </section>
        </main>
      </div>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
