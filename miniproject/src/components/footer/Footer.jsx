import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <footer className="bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-y py-4 text-center">
        <div className='mx-auto w-full max-w-7xl px-4 py-6 lg:py-8'>
            <div className='md:flex md:justify-between'>
                <div className='mb-6 md:mb-0'>
                    <h2 className="text-xl font-bold mb-2">Your Company</h2>
                    <p className="text-sm">Building great web experiences.</p>
                </div>
                <div className='md:w-1/3'>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                        <li><Link to="/github" className="hover:text-blue-600">GitHub</Link></li>
                    </ul>
                </div>
                <div className='md:w-1/3'>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                        <li><Link to="/github" className="hover:text-blue-600">GitHub</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer