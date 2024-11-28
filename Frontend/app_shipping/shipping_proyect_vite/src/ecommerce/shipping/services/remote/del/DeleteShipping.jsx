import axios from "axios";

export const deleteShipping = async (IdInstitutoOK) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/by-idinstituto/${IdInstitutoOK}`
    );
    return response.data; // Devuelve la respuesta del backend
  } catch (error) {
    console.error("Error al eliminar el envío:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
