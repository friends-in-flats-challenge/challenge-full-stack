"use client";
import "./globals.css"; // Importar estilos globales si es necesario
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getApartments } from "@/utils/database2"; // Asegúrate de tener esta función en tu archivo de base de datos

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [apartments, setApartments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchApartments = async () => {
      const data = await getApartments();
      setApartments(data);
    };

    fetchApartments();
  }, []);

  const handleClick = (apartmentId) => {
    setSelectedOption(apartmentId);
  };

  const handleAddApartment = () => {
    router.push('/apartments');
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-center text-blue-300 font-sans text-3xl mb-8">Select an option</h2>
      <div className="flex justify-center space-x-4">
        {apartments.map((apartment) => (
          <div
            key={apartment.id}
            className={`shape rounded-xl overflow-hidden w-40 h-40 relative bg-gray-200 transform transition duration-500 ease-in-out hover:scale-105 ${
              selectedOption === apartment.id && "shadow-lg"
            }`}
            onClick={() => handleClick(apartment.id)}
          >
            <img src={apartment.image_url || "/default-image.jpg"} alt={apartment.name} className="object-cover w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-black bg-opacity-50">
              <p className="text-white font-bold text-lg">{apartment.name}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedOption && (
        <div className="mt-8 flex justify-center space-x-4">
          {apartments.find((apt) => apt.id === selectedOption).cards.map((card) => (
            <div key={card.id} className="bg-white p-4 rounded-lg shadow-md w-64">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      )}
      <button 
        className="fixed bottom-10 right-10 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
        onClick={handleAddApartment}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </main>
  );
}
