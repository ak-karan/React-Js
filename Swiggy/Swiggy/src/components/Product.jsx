import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Product() {
  const { cart, setCart } = useOutletContext();

  const productlist = [
    {
      id: 1,
      title: "Onion",
      subtitle: "(Pyaaz)",
      dis: "Rich Flavor, high in antioxidants, perfect for everyday cooking",
      price: "₹ 40",
      wig: "1kg",
      imageUrl: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/765ff374dd4023fde2d3936ec482814d",
      url: "/"
    },
    {
      id: 2,
      title: "Potato",
      subtitle: "(Aloo)",
      dis: "Agra’s finest potatoes; great for fries, mash & curries",
      price: "₹ 29",
      wig: "1kg",
      imageUrl: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/1/3/e867701b-6697-47db-b838-d83363d25bc7_1108.png",
      url: "/"
    },
    {
      id: 3,
      title: "Beetroot",
      subtitle: "(Chukandar)",
      dis: "Rich in iron, earthy sweetness, ideal for salads/sides",
      price: "₹ 39",
      wig: "500g",
      imageUrl: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/2c16f47d900ff298b17c4e95fe1d755c",
      url: "/"
    },
    {
      id: 4,
      title: "Sambar Onion",
      subtitle: "(Pyaaz)",
      dis: "Tiny, pure & ideal for authentic sambhar",
      price: "₹ 20",
      wig: "250g",
      imageUrl: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/c4bf6be996dcdcc63d36a1733a99d7db",
      url: "/"
    },
  ];

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="Main-Product">
      <div className="Product-hading">
        <h1>Groceries Product</h1>
        <Link to="/cart" className="cart-link">
          <div className="cart-bounce">🛒</div> Cart ({cart.reduce((total, item) => total + item.quantity, 0)}) Contiue
        </Link>
      </div>
      
      <div className="Main-Product-b">
        <div className="Product-box-main">
          {productlist.map((product) => (
            <div className="Product-box" key={product.id}>
              <div className="product-img">
                <img src={product.imageUrl} alt={product.title} loading="lazy" />
              </div>
              <div className="product-text">
                <h3>{product.title} <span>{product.subtitle}</span></h3>
                <p>{product.dis}</p>
                <p>{product.price} <span>{product.wig}</span></p>
                <button 
                  onClick={() => addToCart(product)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;