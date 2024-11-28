import axios from "axios";

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/productos`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw error;
  }
};
