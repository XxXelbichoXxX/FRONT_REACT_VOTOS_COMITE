import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//importaciones para el manejo de estilos
import { Icon } from "semantic-ui-react";
import "./ResetPassForm.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import logo from "../../../assets/logo_nayarit.jpg";
import { useForgetPasswordRequest, useUser, useEmails } from "../../../hooks";

export const ResetPasswordForm = () => {
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("Actualizar contraseña");

  const { checkExistingCode, updateStatusCode } = useForgetPasswordRequest();
  const { checkCredentials, editPassword } = useUser();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      code: "",
    },
    onSubmit: async (formValue) => {
      // Validación de campos
      if (!formValue.username) {
        toast.error("Error al enviar la información, debes introducir tu usuario");
        return;
      }
      if (!formValue.email) {
        toast.error("Error al enviar la información, debes introducir el correo asociado a tu usuario");
        return;
      }
      if (!formValue.password) {
        toast.error("Error al enviar la información, debes introducir tu contraseña");
        return;
      }
      if (!formValue.confirm_password) {
        toast.error("Error al enviar la información, debes confirmar tu contraseña");
        return;
      }
      if (formValue.password !== formValue.confirm_password) {
        toast.error("Error al enviar la información, las contraseñas no coinciden");
        return;
      }
      if (!formValue.code) {
        toast.error("Error al enviar la información, debes introducir el código enviado por correo");
        return;
      }
    
      try {
        // Comprobar las credenciales
        const credentialsValid = await checkCredentials(formValue);
        if (!credentialsValid) {
          toast.error("Error al actualizar la contraseña, el usuario o correo no coinciden con el registrado, favor de intentar de nuevo");
          return;
        }
    
        // Comprobar el código
        const codeValid = await checkExistingCode(formValue.code);
        if (!codeValid.exists) {
          toast.error("Error al actualizar la contraseña, el codigo no coincide con el que se envio por correo, favor de intentar de nuevo");
          return;
        }
        if(codeValid.useCode) {
          toast.error("Error al actualizar la contraseña, el codigo ha expirado, favor de intentar de nuevo");
          return;
        }



    
        // Actualizar la contraseña
        const data = {
          username: formValue.username,
          code : formValue.code,
          password: formValue.password
        }
        const response = await editPassword(data);
        if (response) {
          const updateInfo = {
            requestId: codeValid.requestId,
            useCode: true
          }
          updateStatusCode(updateInfo);
          toast.success("Cuenta actualizada correctamente, por favor inicia sesión");
          formik.resetForm();
          navigate("/admin");
        }
    
      } catch (error) {
        toast.error("Error al enviar la información, ocurrió un problema, favor de intentar de nuevo");
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
            "Contraseña actualizada correctamente, por favor inicia sesión"
          );
        } else {
          setMessage("Actualizar contraseña");
        }

        formik.handleSubmit(e);
        setWorking(false);
      }, 1500);
    }, 1500);
  };

  return (
    <form
      className={`reset ${working ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <p className="title">
        Formulario de restablecimiento de contraseña
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
      <input
        type="password"
        name="password"
        placeholder="Nueva contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <i className="fa lock">
        <Icon name="lock" />
      </i>
      {formik.errors.password && (
        <div className="error-message">{formik.errors.password}</div>
      )}
      <input
        type="password"
        name="confirm_password"
        placeholder="Repetir nueva contraseña"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
      />
      <i className="fa lock-two">
        <Icon name="lock" />
      </i>
      {formik.errors.confirm_password && (
        <div className="error-message">{formik.errors.confirm_password}</div>
      )}
      <input
        type="text"
        name="code"
        placeholder="Codigo enviado por correo electronico"
        value={formik.values.code}
        onChange={formik.handleChange}
      />
      <i className="fa keyboard">
        <Icon name="keyboard" />
      </i>
      {formik.errors.code && (
        <div className="error-message">{formik.errors.code}</div>
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
