import React, { useState } from "react";
//importaciones para el manejo de estilos
import { Icon, Checkbox } from "semantic-ui-react";
import "./RevocationForm.scss";
//importaciones para el manejo de formularios
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
//importaciones para la comunicacion con el backend
import { loginApi } from "../../../api/user";
/*importaciones para el manejo provider (el contexto de nuestra aplicacion)*/
import { useAuth, useVotes } from "../../../hooks";
import logo from "../../../assets/logo_nayarit.jpg";

export const RevocationForm = () => {
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("Realizar revocacion de votos");

  const { setRevocation } = useVotes();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      is_active: false,
    },
    onSubmit: async (formValue) => {
      if (!formValue.username) {
        toast.error("Error al revocar los votos, debes introducir tu usuario");
        return;
      } else if (!formValue.password) {
        toast.error("Error al revocar los votos, debes introducir tu contraseña");
        return;
      }
      try {
        const response = await setRevocation(formValue.username);
        if(response === undefined){
          toast.error("Error al revocar los votos, el usuario digitado no tiene votos, favor de revisar");
        }else{
          toast.success("Los votos han sido revocados correctamente");
          formik.resetForm();
        }
      } catch (error) {
        toast.error("Error al revocar los votos, usuario o contraseña es incorrecto, favor de revisar");
      }
    },
  });
  

  //para una animacion del formulario al autenticarte
  const handleSubmit = (e) => {
    e.preventDefault();
    if (working) return;
    setWorking(true);
    setTimeout(() => {
      setMessage("Autenticando el usuario, por favor espere");
      setTimeout(() => {
        if (working === true) {
          setMessage(
            "Los votos han sido revocados correctamente"
          );
        } else {
          setMessage("Realizar revocacion de votos");
        }

        formik.handleSubmit(e);
        setWorking(false);
      }, 1500);
    }, 1500);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value.toUpperCase(); // Convertir a mayúsculas
    formik.setFieldValue("password", newPassword);
  };

  return (
    <form
      className={`login ${working ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <p className="title">Formulario de revocación</p>
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
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={handlePasswordChange}
      />
      <i className="fa lock">
        <Icon name="lock" />
      </i>
      {formik.errors.password && (
        <div className="error-message">{formik.errors.password}</div>
      )}
      <div className="check">
        <Checkbox
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
        />{" "}
        ¿Desea revocar todos los votos?
      </div>
      <button type="submit" disabled={!formik.values.is_active}>
        {working && <i className="spinner"></i>}
        <span className="state">
          {message} {working ? "" : <Icon name="arrow right" />}
        </span>
      </button>
    </form>
  );
};
