import axios from "axios";

const API_BASE_URL = "http://localhost:3020/api/v1";

export const addProduct = async (IdInstitutoOK, productData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/entregas/productos/${IdInstitutoOK}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw error.response?.data || error;
  }
};
