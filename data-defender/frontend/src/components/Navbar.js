import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Data-Defender</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
          <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
        </div>
        <button className="md:hidden text-gray-300 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-700 p-2">
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-white block">Home</Link></li>
            <li><Link to="/login" className="text-gray-300 hover:text-white block">Login</Link></li>
            <li><Link to="/register" className="text-gray-300 hover:text-white block">Register</Link></li>
            <li><Link to="/dashboard" className="text-gray-300 hover:text-white block">Dashboard</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;