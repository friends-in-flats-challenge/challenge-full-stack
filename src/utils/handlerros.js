import supabase from './Supabase'; // Asegúrate de que la ruta sea correcta

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Tiempo en milisegundos (1 segundo)

export const signInUser = async (email, password) => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return user;
    } catch (error) {
      if (error.status === 429) {
        console.warn('Rate limit alcanzado. Reintentando en unos segundos...');
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        retries++;
      } else {
        console.error('Error al iniciar sesión:', error.message);
        throw error;
      }
    }
  }
  throw new Error('Se alcanzó el número máximo de intentos sin éxito');
};
