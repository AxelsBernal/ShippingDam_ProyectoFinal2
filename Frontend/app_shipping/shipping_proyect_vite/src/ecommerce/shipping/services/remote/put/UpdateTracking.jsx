import axios from "axios";

export const updateTracking = async (IdInstitutoOK, NumeroGuia, updatedData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/rastreos/${IdInstitutoOK}/${NumeroGuia}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el rastreo:", error.response?.data || error.message);
    throw error;
  }
};
