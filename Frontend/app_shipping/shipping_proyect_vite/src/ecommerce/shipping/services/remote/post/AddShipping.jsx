import axios from "axios";

export const addShipping = async (shippingData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/`, // URL base + endpoint
      shippingData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Devuelve los datos del nuevo envío agregado
  } catch (error) {
    console.error("Error al agregar el nuevo envío:", error);
    throw error; // Lanza el error para manejarlo en la tabla
  }
};
