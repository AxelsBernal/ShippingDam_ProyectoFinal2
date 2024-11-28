import axios from "axios";

export const editShipping = async (shippingId, updatedData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/FIC/${shippingId}`, // URL corregida con el '/' antes de shippingId
      updatedData,
      {
        headers: {
          "Content-Type": "application/json", // Correcto para enviar datos JSON
        },
      }
    );
    return response.data; // Devuelve los datos actualizados del envío
  } catch (error) {
    console.error("Error al actualizar el envío:", error);
    throw error; // Lanza el error para manejarlo en la tabla
  }
};