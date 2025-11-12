import React from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import Home from "./components/Home.jsx"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/Login.jsx';
import Signup from './login/Signup.jsx';
import ForgotPassword from './login/ForgotPassword.jsx';
import ResetPassword from './login/ResetPassword.jsx';
import Casualwear from "./components/Casualwear.jsx";
import Formalwear from "./components/Formalwear.jsx";
import Jeans from "./components/Jeans.jsx";
import Shorts from "./components/Shorts.jsx";
import Tshirts from "./components/T-shirts.jsx";
import Trackpants from "./components/Trackpants.jsx";
import Whistlist from "./components/Whistlist.jsx";
import Cart from "./components/Cart.jsx";
import Buynow from "./components/Buynow.jsx";
import Ethnicwear from "./components/Ethnicwear.jsx";
import Westernwear from "./components/Westernwear.jsx";
import Dress from "./components/Dress.jsx";
import Sareewear from "./components/Sareewear.jsx";
import Babydress from "./components/Babydress.jsx";
import Childdress from "./components/Childdress.jsx";
import Kidswear from "./components/Kidswear.jsx";
import Childboywear from "./components/Childboywear.jsx";
import Checkout from "./components/Checkout.jsx";
import RazorpayPayment from "./components/RazorpayPayment.jsx";
import Sunscreen from "./components/Sunscreen.jsx";
import Lipbalm from "./components/Lipbalm.jsx";
import Perfume from "./components/Perfume.jsx";
import Shampoo from "./components/Shampoo.jsx";
import Formalshoes from "./components/Formalshoes.jsx";
import Runningshoes from "./components/Runningshoes.jsx";
import Footheels from "./components/Footheels.jsx";
import Footwearwomen from "./components/Footwearwomen.jsx";
import { CartProvider } from "./components/CartContext.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
            <Route path="/product" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} /> {/* 👈 new route */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/casual" element={<Casualwear />} />
            <Route path="/formal" element={<Formalwear />} />
            <Route path="/jeans" element={<Jeans />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/trackpants" element={<Trackpants />} />
            <Route path="/Tshirts" element={<Tshirts />} />
            <Route path="/wishlist" element={<Whistlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
            <Route path="/ethnicwear" element={<Ethnicwear />} />
            <Route path="/westernwear" element={<Westernwear />} />
            <Route path="/dress" element={<Dress />} />
            <Route path="/sareewear" element={<Sareewear />} />
            <Route path="/babydress" element={<Babydress />} />
            <Route path="/childdress" element={<Childdress />} />
            <Route path="/kidswear" element={<Kidswear />} />
            <Route path="/childboywear" element={<Childboywear />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<RazorpayPayment />} />
            <Route path="/sunscreen" element={<Sunscreen />} />
            <Route path="/lipbalm" element={<Lipbalm />} />
            <Route path="/perfume" element={<Perfume />} />
            <Route path="/shampoo" element={<Shampoo />} />
            <Route path="/formalshoes" element={<Formalshoes />} />
            <Route path="/runningshoes" element={<Runningshoes />} />
            <Route path="/footheels" element={<Footheels />} />
            <Route path="/footwearwomen" element={<Footwearwomen />} />
        </Routes>      
    </Router>
    </CartProvider>
  );
}

export default App;