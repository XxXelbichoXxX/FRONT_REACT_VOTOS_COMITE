import React, { useState } from "react";
//importaciones para el manejo de estilos
import { Icon } from "semantic-ui-react";
import "./forgetPasswordForm.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import logo from "../../../assets/logo_nayarit.jpg";
import { useForgetPasswordRequest, useUser, useEmails } from "../../../hooks";

export const ForgetPasswordForm = () => {
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("Enviar la información");

  const { sendInformation } = useForgetPasswordRequest();
  const { checkCredentials } = useUser();
  const { sendEmail } = useEmails();

  const generateCode = () => {
    var length = 6,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    retVal = retVal.toUpperCase();
    return retVal;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    onSubmit: async (formValue) => {
      if (!formValue.username) {
        toast.error(
          "Error al enviar la información, debes introducir tu usuario"
        );
        return;
      } else if (!formValue.email) {
        toast.error(
          "Error al enviar la información, debes introducir el correo asociado a tu usuario"
        );
        return;
      }
      try {
        const response = await checkCredentials(formValue);
        if (response) {
          try {
            const code = generateCode();
            const dataToSend = { ...formValue, code };
            const response = await sendInformation(dataToSend);
            if (response.success) {
              await sendEmail({
                to_email: formValue.email,
                subject:
                  "Confirmación de Solicitud de Cambio de Contraseña en la PEPD",
                message: `
      Buen día,

      Hemos recibido una solicitud para cambiar la contraseña de tu cuenta en la PEPD. Si realizaste esta solicitud, por favor sigue el enlace a continuación para restablecer tu contraseña:

      http://localhost:5173/admin/resetPassword
      
      Tu código de verificación es: ${code}, debera ser ingresado en la página de restablecer contraseña.

      Si no solicitaste este cambio, por favor ignora este correo. Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.

      Gracias,
      PEPD
      
      `,
              });
              toast.success(
                "Correo enviado, sigue las instrucciones enviadas por correo"
              );
              formik.resetForm();
            } else {
              toast.error(
                "Error al enviar la información, fallo al enviar el correo, favor de intentar de nuevo"
              );
            }
          } catch (error) {
            toast.error(
              "Error al enviar la información, algo no salio como se esperaba, favor de intentar de nuevo"
            );
          }
        } else {
          toast.error(
            "Error al enviar la información, usuario o correo es incorrecto, favor de revisar"
          );
        }
      } catch (error) {
        toast.error(
          "Error al enviar la información, no se pudo comprobar la información, favor de intentar de nuevo"
        );
      }
    },
  });

  //para una animacion del formulario al autenticarte
  const handleSubmit = (e) => {
    e.preventDefault();
    if (working) return;
    setWorking(true);
    setTimeout(() => {
      setMessage("Verificando la información, por favor espere");
      setTimeout(() => {
        if (working === true) {
          setMessage(
            "Correo enviado, sigue las instrucciones enviadas por correo"
          );
        } else {
          setMessage("Enviar la información");
        }

        formik.handleSubmit(e);
        setWorking(false);
      }, 1500);
    }, 1500);
  };

  return (
    <form
      className={`forget ${working ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <p className="title">
        Formulario de recuperación de recuperación de contraseñas
      </p>
      {}
      <img src={logo} alt="logo" />
      <input
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <i className="fa user">
        <Icon name="user" />
      </i>
      {formik.errors.username && (
        <div className="error-message">{formik.errors.username}</div>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email asociado al usuario"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <i className="fa envelope">
        <Icon name="envelope" />
      </i>
      {formik.errors.email && (
        <div className="error-message">{formik.errors.email}</div>
      )}
      <button type="submit">
        {working && <i className="spinner"></i>}
        <span className="state">
          {message} {working ? "" : <Icon name="arrow right" />}
        </span>
      </button>
    </form>
  );
};
