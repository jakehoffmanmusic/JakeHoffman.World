import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useApp } from '../App';
import '../styles/Pages.css';

import thankYouImg from '../assets/thank-you-order.png';
import returnHomeImg from '../assets/return-home.png';

const PAYPAL_CLIENT_ID = "AR3he9CUCJRJ4JP73_yJgfg0U1OcVq0xlPKWqQFKmQ5S8hzL_ouzBL39Wuz9e8vWqYXwEyhULwVDni50"; // LIVE Client ID

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useApp();
  const [orderConfirmed, setOrderConfirmed] = useState(false); 
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const total = cartItems.reduce((sum: number, item: any) => sum + item.price, 0);

  const handleApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      setOrderDetails(details);
      setOrderConfirmed(true);
      clearCart();
    });
  };

  if (orderConfirmed) {
    return (
      <div className="container">
        <div className="confirmation-page">
          <div className="confirmation-card">
            <img src={thankYouImg} alt="Thank you for your order" className="handwritten-thank-you" />
            <p style={{marginTop: '1rem'}}>Your purchase was successful.</p>
            <div className="order-summary">
              <p><strong>Order ID:</strong> {orderDetails?.id}</p>
              <p><strong>Total Paid:</strong> ${orderDetails?.purchase_units[0]?.amount?.value}</p>
            </div>
            <p className="email-note" style={{textAlign: 'center'}}>A receipt has been sent to your email.</p>
            <a href="/" className="return-home-img-btn">
              <img src={returnHomeImg} alt="Return Home" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ 
      "clientId": PAYPAL_CLIENT_ID,
      "currency": "USD"
    }}>
      <div className="container">
        <div className="cart-page">
          <h2>Your Cart</h2>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <a href="/" className="back-to-shop-btn">Return Home</a>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items-list">
                {cartItems.map((item: any, index: number) => (
                  <div key={index} className="cart-item-row">
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                    <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="summary-card">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="paypal-checkout-container">
                    <PayPalButtons
                      style={{ layout: "vertical", shape: "rect" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              description: "Jake Hoffman Music Store Purchase",
                              amount: {
                                currency_code: "USD",
                                value: total.toFixed(2),
                              },
                              payee: {
                                email_address: "Jakehoffman.world@gmail.com"
                              }
                            },
                          ],
                        });
                      }}
                      onApprove={handleApprove}
                      onCancel={() => {
                        alert("Transaction cancelled.");
                      }}
                      onError={(err) => {
                        console.error("PayPal Error:", err);
                        alert("An error occurred with the PayPal transaction.");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Cart;
