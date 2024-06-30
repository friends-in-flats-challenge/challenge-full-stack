"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/Supabase'; // Asegúrate de importar supabase correctamente

const Consumo = () => {
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);

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

  const fetchRooms = async (apartmentId) => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('apartment_id', apartmentId);
    if (error) {
      console.error('Error fetching rooms:', error);
      return [];
    }
    return data;
  };

  const handleViewDetails = async (apartment) => {
    const rooms = await fetchRooms(apartment.id);
    setSelectedApartment({ ...apartment, rooms });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mt-24"> {/* Ajuste del margin-top para alejar del header */}
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Apartments List</h1>
      {apartments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"> {/* Ajuste para filas de 4 en pantallas grandes */}
          {apartments.map((apartment) => (
            <div
              key={apartment.id}
              className="p-4 border rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl bg-white flex flex-col justify-between"
            >
              <div>
                <img
                  src={apartment.image_url || '/placeholder.jpg'} // Coloca un placeholder o una imagen por defecto si no hay URL
                  alt={apartment.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-gray-700">{apartment.name}</h2>
                <p className="mb-2 text-gray-600"><strong>Location:</strong> {apartment.location}</p>
                <p className="mb-2 text-gray-600"><strong>Price:</strong> ${apartment.price}</p>
                <p className="mb-2 text-gray-600"><strong>Description:</strong> {apartment.description}</p>
              </div>
              <button
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                onClick={() => handleViewDetails(apartment)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No apartments available.</p>
      )}

      {selectedApartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{selectedApartment.name}</h2>
            <p className="mb-2 text-gray-600"><strong>Location:</strong> {selectedApartment.location}</p>
            <p className="mb-2 text-gray-600"><strong>Price:</strong> ${selectedApartment.price}</p>
            <p className="mb-2 text-gray-600"><strong>Description:</strong> {selectedApartment.description}</p>
            <h3 className="text-xl font-semibold mb-2">Rooms</h3>
            {selectedApartment.rooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedApartment.rooms.map((room) => (
                  <div key={room.id} className="p-4 border rounded-lg bg-gray-100">
                    <h4 className="font-semibold mb-1">{room.name}</h4>
                    <p className="text-gray-600"><strong>Size:</strong> {room.size} sqm</p>
                    <p className="text-gray-600"><strong>Equipment:</strong> {room.equipment}</p>
                    <img
                      src={room.image_url || '/placeholder.jpg'}
                      alt={room.name}
                      className="w-full h-32 object-cover rounded-lg mt-2"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No rooms available.</p>
            )}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              onClick={() => setSelectedApartment(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consumo;
