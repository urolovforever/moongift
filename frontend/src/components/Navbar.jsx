import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Bosh sahifa' },
    { path: '/products', label: 'Mahsulotlar' },
    { path: '/about', label: 'Biz haqimizda' },
    { path: '/contact', label: "Bog'lanish" },
  ];

  return (
    <nav className="bg-primary-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">🌙 MoonGift</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path) ? 'text-accent-500 font-semibold' : 'text-white hover:text-secondary-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-md text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md ${
                  isActive(link.path) ? 'bg-primary-700 text-accent-500 font-semibold' : 'text-white hover:bg-primary-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
