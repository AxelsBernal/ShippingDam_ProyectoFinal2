import axios from "axios";

export const getAllShippings = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}entregas`);
    console.log("<<AXIOS-SHIPPING>>:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los envíos:", error);
    throw error;
  }
};
