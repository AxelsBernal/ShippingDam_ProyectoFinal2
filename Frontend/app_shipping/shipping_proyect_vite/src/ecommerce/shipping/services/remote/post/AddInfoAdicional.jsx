import axios from "axios";

const API_BASE_URL = "http://localhost:3020/api/v1"; 

export const addInfoAdicional = async (IdInstitutoOK, infoAdicionalData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/entregas/info-adicional/${IdInstitutoOK}`,
      infoAdicionalData
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar información adicional:", error);
    throw error.response?.data || error;
  }
};
