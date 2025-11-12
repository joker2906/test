import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';


const RazorpayPayment = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, addOrder, clearCart } = useCart();
  const [shippingDetails, setShippingDetails] = useState(null);

  const total = getCartTotal();

  useEffect(() => {
    // Retrieve shipping details from localStorage or context
    const details = localStorage.getItem('shippingDetails');
    if (details) {
      setShippingDetails(JSON.parse(details));
    } else {
      // If no shipping details, redirect back to checkout
      navigate('/checkout');
    }
  }, [navigate]);

  useEffect(() => {
    if (shippingDetails) {
      // Razorpay integration
      const options = {
        key: 'rzp_test_Ra1DZZ9t1TWTUw', // Test API Key
        amount: total * 100, // Amount in paisa (multiply by 100 for rupees)
        currency: 'INR',
        name: 'RowdyWear',
        description: 'Purchase from RowdyWear',
        image: '/logo.jpg', // Optional
        handler: function (response) {
          // Payment success handler
          const order = {
            items: cart,
            total: total,
            shippingDetails: shippingDetails,
            paymentDetails: { razorpay_payment_id: response.razorpay_payment_id }
          };
          addOrder(order);
          clearCart();
          localStorage.removeItem('shippingDetails'); // Clean up
          alert('Payment successful! Order placed.');
          navigate('/home');
        },
        prefill: {
          name: shippingDetails?.name || '',
          email: 'customer@example.com', // You can get this from user context if available
          contact: shippingDetails?.phone || ''
        },
        notes: {
          address: shippingDetails?.address || ''
        },
        theme: {
          color: '#ffd700'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  }, [shippingDetails, cart, total, addOrder, clearCart, navigate]);

  if (cart.length === 0) {
    return (
      <div className="payment-container" style={{ textAlign: 'center' }}>
        <div className="payment-header" style={{ textAlign: 'center' }}>
          <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>Payment</h1>
        </div>
        <div className="empty-payment" style={{ textAlign: 'center' }}>
          <p style={{ textAlign: 'center', fontSize: '1.3rem', color: 'rgba(232, 232, 232, 0.9)', marginBottom: '3rem', fontWeight: '300' }}>No items to pay for. Please add items to cart.</p>
          <button className="empty-payment-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container" style={{ textAlign: 'center' }}>
      <div className="payment-header" style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>Processing Payment</h1>
      </div>
      <div className="payment-content" style={{ textAlign: 'center' }}>
        <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.9)', fontSize: '1.2rem' }}>Redirecting to Razorpay...</p>
        <button className="back-btn" onClick={() => navigate('/checkout')} style={{ textAlign: 'center' }}>Back to Checkout</button>
      </div>
    </div>
  );
};

export default RazorpayPayment;
