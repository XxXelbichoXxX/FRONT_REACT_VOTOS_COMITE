import { useState } from "react";
import { checkExistingCodeApi, sendInformationApi, updateStatusCodeApi } from "../api/forgetPasswordRequest";
export function useForgetPasswordRequest() {
  const [loadingInformation, setLoadingInformation] = useState(true);
  const [errorInformation, setErrorInformation] = useState(null);
  const [information, setInformation] = useState(null);

  const sendInformation = async (data) => {
    try {
      setLoadingInformation(true);
      const response = await sendInformationApi(data);
      setLoadingInformation(false);
      return response;
    } catch (errorVote) {
      setLoadingInformation(false);
      setErrorInformation(errorVote);
    }
  };

  const checkExistingCode = async (data) => {
    try {
      setLoadingInformation(true);
      const response = await checkExistingCodeApi(data);
      setLoadingInformation(false);
      return response;
    } catch (errorUser) {
      setLoadingInformation(false);
      setErrorInformation(errorUser);
    }
  };

  const updateStatusCode = async (data) => {
    try {
      setLoadingInformation(true);
      await updateStatusCodeApi(data);
      setLoadingInformation(false);
    } catch (errorUser) {
      setLoadingInformation(false);
      setErrorInformation(errorUser);
    }
  };


  return {
    //estados
    loadingInformation,
    errorInformation,
    information,
    //metodos
    sendInformation,
    checkExistingCode,
    updateStatusCode,
  };
}
