import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-red-600 text-white shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold z-10">
          AALMUN'25
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`hover:text-blue-200 ${isActive('/') ? 'text-blue-200' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:text-blue-200 ${isActive('/about') ? 'text-blue-200' : ''}`}
          >
            About
          </Link>
          <Link
            to="/committees"
            className={`hover:text-blue-200 ${isActive('/committees') ? 'text-blue-200' : ''}`}
          >
            Committees
          </Link>
          <Link
            to="/apply"
            className={`hover:text-blue-200 ${isActive('/apply') ? 'text-blue-200' : ''}`}
          >
            Apply
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`hover:text-blue-200 ${isActive('/dashboard') ? 'text-blue-200' : ''}`}
            >
              Dashboard
            </Link>
          )}
        </div>
        
        {/* Desktop User Authentication */}
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {user.displayName || user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/apply"
              className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
            >
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 absolute top-full left-0 right-0 shadow-lg z-20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className={`hover:text-blue-200 ${isActive('/') ? 'text-blue-200' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-200 ${isActive('/about') ? 'text-blue-200' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/committees"
              className={`hover:text-blue-200 ${isActive('/committees') ? 'text-blue-200' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Committees
            </Link>
            <Link
              to="/apply"
              className={`hover:text-blue-200 ${isActive('/apply') ? 'text-blue-200' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Apply
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`hover:text-blue-200 ${isActive('/dashboard') ? 'text-blue-200' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            {/* Mobile User Authentication */}
            <div className="border-t border-blue-500 pt-4">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <span className="text-sm">Welcome, {user.displayName || user.email}</span>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm self-start"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/apply"
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;