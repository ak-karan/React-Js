import React from 'react';
import Navbar from './Header/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';

function Layout () {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
