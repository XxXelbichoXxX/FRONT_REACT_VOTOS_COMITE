import axios from "axios";
import { BASE_API } from "../utils/constants";

export async function sendInformationApi(data) {
  try {
    const url = `${BASE_API}/api/forgetPasswordRequest/sendInfo/`;

    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(url, data, params);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function checkExistingCodeApi(code) {
  try {
      const url = `${BASE_API}/api/forgetPasswordRequest/checkExistingCode/`;
      const params = {
          params: {
              code: code,
          },
      };
      const response = await axios.get(url, params);
      return response.data;
  } catch (error) {
      throw error;
  }
}

export async function updateStatusCodeApi(data) {
  try {
      const url = `${BASE_API}/api/forgetPasswordRequest/updateStatusCode/`;
      // Use axios.patch for updating an existing resource
      const response = await axios.put(url, data);
      return response.data;
  } catch (error) {throw error;}
}





