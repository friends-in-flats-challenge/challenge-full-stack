import supabase from './Supabase'; // Asegúrate de importar tu instancia de Supabase adecuadamente

export const verifyCode = async (tokenHash) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: 'email',
    });

    if (error) {
      throw error;
    }

    console.log('Código de verificación verificado correctamente.');
    return data; 
  } catch (error) {
    console.error('Error al verificar el código de verificación:', error.message);
    throw error;
  }
};
