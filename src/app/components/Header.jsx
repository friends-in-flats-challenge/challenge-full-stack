
"use client";
import Login from './routes-login-sign-up/Login';
import { useState } from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 


const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
console.log(Login);
  const navigateTo = (path) => {
    router.push(path);
    setIsOpen(false); // Cierra el menú después de la navegación
  };

  return (
    <header className="bg-white text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => navigateTo('/')}>
          <img
            src="/friendinfloatsicon.png"
            alt="Friends in floats"
            className="h-16 w-auto cursor-pointer"
          />
        </div>
        <nav className="flex flex-grow justify-evenly space-x-8 text-gray-600 font-bold text-lg">
          <Link href="/properties" className="hover:text-gray-300 cursor-pointer">
            Flat Matches
          </Link>
          <Link href="/about" className="hover:text-gray-300 cursor-pointer">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-gray-300 cursor-pointer">
            Contact Us
          </Link>
          <Link href="/landlords" className="hover:text-gray-300 cursor-pointer">
            For Landlords
          </Link>
        </nav>
        <div className="flex items-center cursor-pointer">
          <img
            src="/unverifiedicon.png"
            className="h-12 w-10 cursor-pointer bg-slate-500 border-r-slate-400 box-border rounded-3xl"
            alt="Person Icon"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
          <Link href="/login"  className="block px-4 py-2 hover:bg-gray-200 cursor-pointer" >
          
            Login
          </Link>
          <Link href="/signup" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
            Sign up
          </Link>
          <Link href="/discover" className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
            Discover your match
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
