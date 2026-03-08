import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import './App.css';
import Footer from './components/Footer';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <Navbar cart={cart} />
      <Outlet context={{ cart, setCart }} />
      <Footer />
    </div>
  );
}

export default App;