'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname === '/login') {
    return null;
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 px-4 md:px-10 py-3">
        <div className="flex items-center gap-4 text-[#663399]">
          <div className="w-4 h-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-lg font-bold">TyHub</h2>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop Nav */}
          <nav className="items-center gap-9 hidden md:flex">
            <Link href="/" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Products
            </Link>
            <Link href="/orders" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Orders
            </Link>
            <Link href="/customers" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              Customers
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 bg-opacity-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-[#663399]">TyFits</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium text-gray-900 hover:text-gray-600"
          >
            Products
          </Link>
          <Link
            href="/orders"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium text-gray-900 hover:text-gray-600"
          >
            Orders
          </Link>
          <Link
            href="/customers"
            onClick={() => setIsMenuOpen(false)}
            className="text-sm font-medium text-gray-900 hover:text-gray-600"
          >
            Customers
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Header;
