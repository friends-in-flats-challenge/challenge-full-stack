"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authprovider';
import { AuthenticatedMenu,UnAuthenticatedMenu } from './profile';

const Header = () => {
  const { authReady, user } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (path) => {
    router.push(path);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!authReady) {
    return <p>Loading...</p>;
  }

  return (
    <header className="bg-white p-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => navigateTo('/')}>
          <img
            src="/friendinfloatsicon.png"
            alt="Friends in floats"
            className="h-14 w-auto"
          />
        </div>
        <nav className="hidden md:flex md:flex-grow md:justify-evenly md:space-x-8 text-gray-600 font-bold text-xl">
          <Link href="/" className="hover:text-gray-300 cursor-pointer p-4">
            Flat Matches
          </Link>
          <Link href="/"  className="hover:text-gray-300 cursor-pointer p-4">
            About Us
          </Link>
          <Link href="/"   className="hover:text-gray-300 cursor-pointer p-4">
            Contact Us
          </Link>
          <Link href="/"  className="hover:text-gray-300 cursor-pointer p-4">
            For Landlords
          </Link>
          {user ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />}
        </nav>

        <div className="md:hidden flex items-center">
          <button className="text-gray-600 focus:outline-none" onClick={toggleMenu}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      
        {menuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full bg-white shadow-md mt-16">
            <div className="flex flex-col items-center py-4">
              <Link href="/properties" className="hover:text-gray-300 cursor-pointer p-2" onClick={() => navigateTo('/properties')}>
                Flat Matches
              </Link>
              <Link href="/about" className="hover:text-gray-300 cursor-pointer p-2" onClick={() => navigateTo('/about')}>
                About Us
              </Link>
              <Link href="/contact" className="hover:text-gray-300 cursor-pointer p-2" onClick={() => navigateTo('/contact')}>
                Contact Us
              </Link>
              <Link href="/landlords" className="hover:text-gray-300 cursor-pointer p-2" onClick={() => navigateTo('/landlords')}>
                For Landlords
              </Link>
              {user ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
