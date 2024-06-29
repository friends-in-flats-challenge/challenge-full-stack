"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authprovider';
import { AuthenticatedMenu, UnAuthenticatedMenu } from './profile'; // Asegúrate de importar ambos componentes correctamente

const Header = () => {
  const { authReady, user } = useAuth();
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
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
        <nav className="flex flex-grow justify-evenly space-x-8 text-gray-600 font-bold text-xl -scroll-ml-6 p-1">
          <Link href="/properties" className="hover:text-gray-300 cursor-pointer p-4">
            Flat Matches
          </Link>
          <Link href="/about" className="hover:text-gray-300 cursor-pointer p-4">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-gray-300 cursor-pointer p-4">
            Contact Us
          </Link>
          <Link href="/landlords" className="hover:text-gray-300 cursor-pointer p-4">
            For Landlords
          </Link>
          {user ? <AuthenticatedMenu /> : <UnAuthenticatedMenu />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
