import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para crear un nuevo apartamento
export const createApartment = async (apartmentData) => {
  const { data, error } = await supabase
    .from('apartments')
    .insert([apartmentData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para obtener todos los apartamentos
export const getApartments = async () => {
  const { data, error } = await supabase
    .from('apartments')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para obtener un apartamento por ID
export const getApartmentById = async (id) => {
  const { data, error } = await supabase
    .from('apartments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para actualizar un apartamento por ID
export const updateApartment = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('apartments')
    .update(updatedData)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para eliminar un apartamento por ID
export const deleteApartment = async (id) => {
  const { data, error } = await supabase
    .from('apartments')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para crear una nueva habitación
export const createRoom = async (roomData) => {
  const { data, error } = await supabase
    .from('rooms')
    .insert([roomData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para obtener todas las habitaciones de un apartamento
export const getRoomsByApartmentId = async (apartmentId) => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('apartment_id', apartmentId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para obtener una habitación por ID
export const getRoomById = async (id) => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para actualizar una habitación por ID
export const updateRoom = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('rooms')
    .update(updatedData)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Función para eliminar una habitación por ID
export const deleteRoom = async (id) => {
  const { data, error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
