import { useState } from "react";
import { sendEmailApi } from "../api/emails";
import { useAuth } from "./useAuth";
export function useEmails() {
  const { auth } = useAuth();
  const [loadingSend, setLoadingSend] = useState(true);
  const [errorSend, setErrorSend] = useState(null);

  //para crear un nuevo usuario cuando no hay imagen o para actualizar un usuario cuando hay imagen
  const sendEmail = async (data) => {
    try {
      setLoadingSend(true);
      //consultas si existe imagen en el formulario para ejecutar una peticion especifica para imagenes o no
      await sendEmailApi(data);
      setLoadingSend(false);
    } catch (errorSend) {
      setLoadingSend(false), setErrorSend(errorSend);
    }
  };

  return {
    //estados
    loadingSend,
    errorSend,
    auth,
    //metodos
    sendEmail,
  };
}
