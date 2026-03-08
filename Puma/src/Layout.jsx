import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import DilayTextChange from './components/component/DilayTextChange';

function Layout () {
    return(
        <>
            <DilayTextChange />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
export default Layout