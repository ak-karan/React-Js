import { Link } from "react-router-dom";

function Navbar({ cart }) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div className="mainNav">
      <div className="logo">
        <Link to="/">
          <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png" alt="Swiggy" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/product" className="nav-link">Products</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart ({itemCount})
        </Link>
      </div>
    </div>
  );
}

export default Navbar;