"use client";

import { createApartment } from '@/utils/database2';
import React from 'react';
import { useState } from 'react';
const Apartments = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    rooms: []
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoomChange = (index, e) => {
    const { name, value } = e.target;
    const newRooms = [...formData.rooms];
    newRooms[index] = { ...newRooms[index], [name]: value };
    setFormData({
      ...formData,
      rooms: newRooms
    });
  };

  const addRoom = () => {
    setFormData({
      ...formData,
      rooms: [...formData.rooms, { name: '', size: '', equipment: '', image_url: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData); 
  
    try {
      const data = await createApartment(formData);
      console.log('Apartment created:', data);
      setMessage('Apartment inserted successfully!');
    } catch (error) {
      console.error('Error creating apartment:', error.message);
      setMessage('Failed to insert apartment and rooms');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 md:mt-12 p-6 md:p-12 mb-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Apartment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Rooms</label>
          {formData.rooms.map((room, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <div className="mb-2">
                <label className="block text-gray-700">Room Name</label>
                <input
                  type="text"
                  name="name"
                  value={room.name}
                  onChange={(e) => handleRoomChange(index, e)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required 
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Size (sqm)</label>
                <input
                  type="number"
                  name="size"
                  value={room.size}
                  onChange={(e) => handleRoomChange(index, e)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required 
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Equipment</label>
                <input
                  type="text"
                  name="equipment"
                  value={room.equipment}
                  onChange={(e) => handleRoomChange(index, e)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required 
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  value={room.image_url}
                  onChange={(e) => handleRoomChange(index, e)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required 
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addRoom}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Add Room
          </button>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}

      <style jsx>{`
        @media (max-width: 768px) {
          .max-w-xl {
            max-width: 90%;
          }
          .p-6 {
            padding: 4rem;
          }
        }

        @media (max-width: 480px) {
          .p-6 {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Apartments;
