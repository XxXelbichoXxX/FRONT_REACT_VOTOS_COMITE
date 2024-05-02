import axios from "axios";
import { BASE_API } from "../utils/constants";

export async function getStagesApi(token) {
  try {
    const url = `${BASE_API}/api/stage/`;
    const params = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(url, params);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateStageApi(token, stageId, data) {
  try {
    const url = `${BASE_API}/api/stage/${stageId}/`; // Ajusta la URL según tu endpoint
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido
      },
    };
    const response = await axios.patch(url, data, params);
    return response.data;
  } catch (error) {
    throw error;
  }
}
