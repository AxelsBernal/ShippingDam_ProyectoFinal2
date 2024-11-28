import axios from "axios";

const API_BASE_URL = "http://localhost:3020/api/v1"; 

export const addEnvios = async (IdInstitutoOK, envioData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/entregas/envios/${IdInstitutoOK}`,
        envioData
      );
      return response.data;
    } catch (error) {
      console.error("Error al agregar envío:", error);
      throw error.response?.data || error;
    }
  };
  