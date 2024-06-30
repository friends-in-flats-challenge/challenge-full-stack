"use client";
import { supabase } from "./Supabase";

export const createApartment = async (apartmentData) => {
  const { rooms, ...apartment } = apartmentData;

  try {
  
    const { data: insertedApartments, error: apartmentError } = await supabase
      .from('apartments')
      .insert([apartment])
      .select('*');

    if (apartmentError) {
      throw new Error(apartmentError.message);
    }

    if (!insertedApartments || insertedApartments.length === 0) {
      throw new Error('No apartments were inserted');
    }

    const insertedApartment = insertedApartments[0]; 

    if (rooms && rooms.length > 0) {
   
      const roomInsertResults = await Promise.all(
        rooms.map(async (room) => {
          const { data: insertedRoom, error: roomError } = await supabase
            .from('rooms')
            .insert({
              ...room,
              apartment_id: insertedApartment.id, 
            });

          if (roomError) {
            throw new Error(roomError.message);
          }

          return insertedRoom;
        })
      );

      return { apartment: insertedApartment, rooms: roomInsertResults };
    } else {
      return { apartment: insertedApartment, rooms: [] }; 
    }
  } catch (error) {
    console.error('Error creating apartment and rooms:', error.message);
    throw new Error('Failed to insert apartment and rooms');
  }
};


export const getApartments = async () => {
  const { data, error } = await supabase.from('apartments').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const getApartmentById = async (id) => {
  const { data, error } = await supabase.from('apartments').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const updateApartment = async (id, updatedData) => {
  const { data, error } = await supabase.from('apartments').update(updatedData).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const deleteApartment = async (id) => {
  const { data, error } = await supabase.from('apartments').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const createRoom = async (roomData) => {
  const { data, error } = await supabase.from('rooms').insert([roomData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const getRoomsByApartmentId = async (apartmentId) => {
  const { data, error } = await supabase.from('rooms').select('*').eq('apartment_id', apartmentId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const getRoomById = async (id) => {
  const { data, error } = await supabase.from('rooms').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const updateRoom = async (id, updatedData) => {
  const { data, error } = await supabase.from('rooms').update(updatedData).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteRoom = async (id) => {
  const { data, error } = await supabase.from('rooms').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};




export const deleteApartmentsAndRooms = async () => {
  try {
 
    const { error: apartmentsError } = await supabase
      .rpc('truncate_table', { table_name: 'apartments' });

    if (apartmentsError) {
      throw new Error(apartmentsError.message);
    }

    console.log('All apartments have been truncated successfully.');

  
    const { error: roomsError } = await supabase
      .rpc('truncate_table', { table_name: 'rooms' });

    if (roomsError) {
      throw new Error(roomsError.message);
    }

    console.log('All rooms have been truncated successfully.');
  } catch (error) {
    console.error('Error truncating apartments and rooms:', error.message);
    throw new Error('Failed to truncate apartments and rooms');
  }
};
