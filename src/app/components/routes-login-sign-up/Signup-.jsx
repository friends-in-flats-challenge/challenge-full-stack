"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpUser } from '@/utils/database'; // Importa la función de signup

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signUpUser(email, password, name);
      setNotification('A confirmation email has been sent to your Gmail.');
      setIsSubmitting(false);
      // You can add logic here to ensure that the user has confirmed their email
      // before navigating to another page
       router.push('/login'); 
    } catch (error) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
      {notification && (
        <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-200 rounded">
          {notification}
        </div>
      )}
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
