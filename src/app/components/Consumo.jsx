"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Consumo = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      const { data, error } = await supabase.from('apartments').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setApartments(data);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Apartments List</h1>
      {apartments.length > 0 ? (
        <ul className="space-y-4">
          {apartments.map((apartment) => (
            <li key={apartment.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{apartment.name}</h2>
              <p><strong>Location:</strong> {apartment.location}</p>
              <p><strong>Price:</strong> ${apartment.price}</p>
              <p><strong>Description:</strong> {apartment.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No apartments available.</p>
      )}
    </div>
  );
};

export default Consumo;
