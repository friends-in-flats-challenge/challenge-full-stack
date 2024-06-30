"use client";
import '@/app/globals.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authprovider';
import { getUserByEmail } from '@/utils/database';

const AuthenticatedMenu = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleAddApartment = () => {
    router.push('/add-apartment');
    closeMenu();
  };

  const handleClearApartments = () => {
   
    closeMenu();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.email) return;

      try {
        const { data, error } = await getUserByEmail(user.email);
        if (error) {
          throw new Error(error.message || 'Failed to fetch user data');
        }

        if (!data) {
          throw new Error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError(error.message || 'Failed to fetch user data. Please try again.');
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      setError('Failed to log out. Please try again.');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer">
        {user && (
          <img
            src="/person.png"
            alt="User Icon"
            className="h-14 w-12 mt-1 cursor-pointer bg-slate-500 border-r-slate-400 box-border rounded-3xl"
            onClick={toggleMenu}
          />
        )}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
          <div className="flex items-center px-4 py-2">
            <span className="text-left">Hello, {user}</span>
          </div>
          <button
            onClick={handleAddApartment}
            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
          >
            Añadir Apartamento
          </button>
          <button
            onClick={handleClearApartments}
            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
          >
            Limpiar Apartamentos
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
          >
            Logout
          </button>
          <div>
            <button
              className="fixed bottom-10 right-10 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
              onClick={handleAddApartment}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      {!user && isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              router.push('/login');
              closeMenu();
            }}
            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push('/signup');
              closeMenu();
            }}
            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left"
          >
            Sign up
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

const UnAuthenticatedMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
        <img
          src="/unverifiedicon.png"
          alt="Menu Icon"
          className="h-14 w-12 cursor-pointer bg-slate-500 border-r-slate-400 box-border rounded-3xl"
        />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              router.push('/login');
              closeMenu();
            }}
            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push('/signup');
              closeMenu();
            }}
            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left"
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
};

export {UnAuthenticatedMenu,AuthenticatedMenu};
