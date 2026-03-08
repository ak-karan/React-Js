import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useOutletContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  // Calculate totals
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
    return sum + (price * item.quantity);
  }, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment processing
    setTimeout(() => {
      setOrderPlaced(true);
      setCart([]);
      setIsCheckingOut(false);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <h2><div className="cart-bounce">🎉</div> Order Placed Successfully!</h2>
        <p>Thank you for your purchase.</p>
        <Link to="/" className="back-to-shop">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
        <Link to="/" className="continue-shopping">← Continue Shopping</Link>
      </div>

      {cart.length === 0 && !orderPlaced ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="shop-now-btn">Shop Now</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.title} <span>{item.subtitle}</span></h3>
                  <p className="item-description">{item.dis}</p>
                  <p className="item-price">{item.price} <span className="item-weight">{item.wig}</span></p>
                </div>
                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ₹ {(parseFloat(item.price.replace(/[^0-9.-]+/g,"")) * item.quantity)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>FREE</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;