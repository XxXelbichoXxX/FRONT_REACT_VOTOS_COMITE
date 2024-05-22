import axios from "axios";
import { BASE_API } from "../utils/constants";

export async function getDependenciesApi(token) {
  try {
    const url = `${BASE_API}/api/dependency/`;
    const params = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(url, params);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addDependencyApi(data, token) {
  try {
    const url = `${BASE_API}/api/dependency/`;
    // Crear un objeto FormData
    const formData = new FormData();
    // Agregar campos de texto al FormData
    Object.keys(data).forEach((key) => {
      if (key === "logo" && !data[key]) {
        return;
      }
      formData.append(key, data[key]);
    });
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      },
    };
    const response = await axios.post(url, formData, params);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateDependencyApi(dependencyId, data, token) {
  try {
      const url = `${BASE_API}/api/dependency/${dependencyId}/`;
      // Crear un objeto FormData
      const formData = new FormData();
      // Agregar campos de texto al FormData
      Object.keys(data).forEach(key => {
          if (key === 'logo' && !data[key]) { return; }
          formData.append(key, data[key]);
      });
      const params = {
          headers: { 
              Authorization: `Bearer ${token}`, 
              'Content-Type': 'multipart/form-data', // Cambiar el tipo de contenido a 'multipart/form-data'
          },
      };
      const response = await axios.patch(url, formData, params);
      return response.data;
  } catch (error) { throw error; }
} 

export async function deleteDependencyApi(dependencyId, token) {
  try {
    const url = `${BASE_API}/api/dependency/${dependencyId}/`;
    const params = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.delete(url, params);
    return response.data;
  } catch (error) {
    throw error;
  }
}
