"use client";
import { useState, useEffect } from "react";
import { getUserByEmail } from "@/utils/database"; // Asegúrate de tener estas funciones en tu archivo de base de datos
import { useAuth } from "@/context/authprovider"; // Utilizar tu contexto de autenticación
import Consumo from "./components/Consumo";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { user,  authReady } = useAuth(); // Obtener el usuario y la función de logout del contexto de autenticación


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

      <div className="flex justify-center space-x-4 mb-8">
    
      </div>

     

     

      <Consumo />
    </main>
  );
}
