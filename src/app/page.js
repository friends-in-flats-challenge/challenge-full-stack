"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getUserByEmail } from "@/utils/database"; // Asegúrate de tener estas funciones en tu archivo de base de datos
import { useAuth } from "@/context/authprovider"; // Utilizar tu contexto de autenticación
import Consumo from "./components/Consumo";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const { user,  authReady } = useAuth(); // Obtener el usuario y la función de logout del contexto de autenticación
  const router = useRouter();

  useEffect(() => {
    if (authReady && user) {
      const checkVerification = async () => {
        const userData = await getUserByEmail(user.email); // Supón que esta función retorna el usuario
        if (userData && userData.name) {
          setIsVerified(true);
        }
      };

      checkVerification();
    }
  }, [authReady, user]);

  const handleAddApartment = () => {
    router.push('/add-apartament');
  };

  return (
    <main
      className="flex flex-col items-center justify-center"
      style={{
        minHeight: "100vh",
        paddingTop: "16px",
        '@media (minWidth: 768px)': {
          paddingTop: "32px",
        },
        '@media (minWidth: 1024px)': {
          paddingTop: "48px",
        },
        '@media (minWidth: 1440px)': {
          paddingTop: "64px",
        },
        '@media (minWidth: 1600px)': {
          paddingTop: "80px",
        },
      }}
    >
      <h2 className="text-center text-blue-300 font-sans text-3xl mb-8">Apartments</h2>
      <div className="flex justify-center space-x-4 mb-8">
        {/* Opciones de apartamentos */}
      </div>

      {authReady && user && isVerified && (
        <div className="fixed top-10 right-10 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center"></div>
      )}

      {!user && (
        <div className="fixed top-10 right-10 hidden"></div>
      )}

      <button 
        className="fixed bottom-10 right-10 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
        onClick={handleAddApartment}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>

      <Consumo />
    </main>
  );
}
