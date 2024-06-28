import supabase from './Supabase';


export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

   

    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    throw error;
  }
};


// Función para registrar un nuevo usuario
export const signUpUser = async (email, password, name) => {
  try {
    console.log('Intentando registrar usuario...');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error al registrarse con Supabase Auth:', error.message);
      throw error;
    }

    const user = data.user;
    console.log('Datos del usuario registrado:', user);

    if (!user || !user.id) {
      throw new Error('Usuario no registrado correctamente');
    }

    // Insertar el nombre del usuario en la base de datos
    const { data: insertData, error: insertError } = await supabase
      .from('Users')
      .insert([
        { id: user.id, email, name,password, created_at: new Date() },
      ]);

    if (insertError) {
      console.error('Error al insertar usuario en la base de datos:', insertError.message);
      throw insertError;
    }

    console.log('Usuario insertado correctamente:', insertData);
      console.log("contraseña registrasa exitosamente");
    return insertData;
  
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    throw error;


  }
};



// Función para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    throw error;
  }
};
export const sendOtp = async (email) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        type: 'email',
      },
    });

    if (error) {
      throw error;
    }

 
    return data; // Puedes devolver data si necesitas algún dato específico
  } catch (error) {
    console.error('Error al enviar el código de 6 dígitos:', error.message);
    throw error;
  }
};