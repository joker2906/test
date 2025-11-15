import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCartHook';
import api from '../services/api';


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

  const handlePaymentClick = () => {
    if (!window.Razorpay) {
      alert('Razorpay is not loaded. Please refresh the page and try again.');
      return;
    }

    if (!shippingDetails) {
      alert('Shipping details not found. Please go back to checkout.');
      navigate('/checkout');
      return;
    }

    // Razorpay integration
    const options = {
      key: 'rzp_test_RemvVoxNmSdEWl', // Test API Key
      amount: total * 100, // Amount in paisa (multiply by 100 for rupees)
      currency: 'INR',
      name: 'RowdyWear',
      description: 'Purchase from RowdyWear',
      image: '/logo.jpg', // Optional
      handler: async function (response) {
        // Payment success handler
        try {
          const orderId = localStorage.getItem('currentOrderId');
          if (orderId) {
            await api.put(`/orders/${orderId}/pay`, { paymentId: response.razorpay_payment_id });
          }
          const order = {
            items: cart,
            total: total,
            shippingDetails: shippingDetails,
            paymentDetails: { razorpay_payment_id: response.razorpay_payment_id }
          };
          addOrder(order);
          clearCart();
          localStorage.removeItem('shippingDetails');
          localStorage.removeItem('currentOrderId');
          alert('Payment successful! Order placed.');
          navigate('/home');
        } catch {
          alert('Payment captured, but failed to update order status.');
        }
      },
      prefill: {
        name: shippingDetails?.name || '',
        email: 'customer@example.com',
        contact: shippingDetails?.phone || ''
      },
      notes: {
        address: shippingDetails?.address || ''
      },
      theme: {
        color: '#ffd700'
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay Error:', error);
      alert('Failed to initialize Razorpay. Please try again.');
    }
  };

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
        <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>Payment</h1>
      </div>
      <div className="payment-content" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.9)', fontSize: '1.2rem', marginBottom: '1rem' }}>Order Total: ₹{total.toFixed(2)}</p>
        <p style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)', fontSize: '1rem', marginBottom: '2rem' }}>Click the button below to proceed with Razorpay payment</p>
        <button 
          onClick={handlePaymentClick} 
          style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            color: '#1a1a2e',
            border: 'none',
            borderRadius: '50px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            marginRight: '1rem',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1rem'
          }}
        >
          Pay with Razorpay
        </button>
        <button 
          onClick={() => navigate('/checkout')} 
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(232, 232, 232, 0.7)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '50px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Back to Checkout
        </button>
      </div>
    </div>
  );
};

export default RazorpayPayment;
