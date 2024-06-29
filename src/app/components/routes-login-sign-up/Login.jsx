"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authprovider';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      if (password.length < 8) {
        throw new Error('Password is too short');
      }
      const user = await login(email, password);
      
      // Save user information in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Login successful, redirect to home page
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
 
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
      {error && (
        <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-200 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
