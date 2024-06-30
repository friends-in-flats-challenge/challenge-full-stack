"use client";

import { all } from "axios";
import { supabase } from "./Supabase";

export const createApartment = async (apartmentData) => {
  const { rooms, ...apartment } = apartmentData;

  try {
    // Insertar el apartamento primero
    const { data: insertedApartments, error: apartmentError } = await supabase
      .from('apartments')
      .insert([apartment])
      .select('*'); // Asegúrate de que retorne los datos insertados

    if (apartmentError) {
      throw new Error(apartmentError.message);
    }

    if (!insertedApartments || insertedApartments.length === 0) {
      throw new Error('No apartments were inserted');
    }

    const insertedApartment = insertedApartments[0]; // Obtener el primer apartamento insertado

    // Insertar las habitaciones asociadas al apartamento, si existen
    if (rooms && rooms.length > 0) {
      // Insertar cada habitación asociada al apartamento
      const roomInsertResults = await Promise.all(
        rooms.map(async (room) => {
          const { data: insertedRoom, error: roomError } = await supabase
            .from('rooms')
            .insert({
              ...room,
              apartment_id: insertedApartment.id, // Asignar el ID del apartamento
            });

          if (roomError) {
            throw new Error(roomError.message);
          }

          return insertedRoom;
        })
      );

      return { apartment: insertedApartment, rooms: roomInsertResults };
    } else {
      return { apartment: insertedApartment, rooms: [] }; // Retornar un arreglo vacío si no hay habitaciones
    }
  } catch (error) {
    console.error('Error creating apartment and rooms:', error.message);
    throw new Error('Failed to insert apartment and rooms');
  }
};

// Función para obtener todos los apartamentos
export const getApartments = async () => {
  const { data, error } = await supabase.from('apartments').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para obtener un apartamento por ID
export const getApartmentById = async (id) => {
  const { data, error } = await supabase.from('apartments').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para actualizar un apartamento por ID
export const updateApartment = async (id, updatedData) => {
  const { data, error } = await supabase.from('apartments').update(updatedData).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para eliminar un apartamento por ID
export const deleteApartment = async (id) => {
  const { data, error } = await supabase.from('apartments').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para crear una nueva habitación
export const createRoom = async (roomData) => {
  const { data, error } = await supabase.from('rooms').insert([roomData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para obtener todas las habitaciones de un apartamento
export const getRoomsByApartmentId = async (apartmentId) => {
  const { data, error } = await supabase.from('rooms').select('*').eq('apartment_id', apartmentId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para obtener una habitación por ID
export const getRoomById = async (id) => {
  const { data, error } = await supabase.from('rooms').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para actualizar una habitación por ID
export const updateRoom = async (id, updatedData) => {
  const { data, error } = await supabase.from('rooms').update(updatedData).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para eliminar una habitación por ID
export const deleteRoom = async (id) => {
  const { data, error } = await supabase.from('rooms').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

