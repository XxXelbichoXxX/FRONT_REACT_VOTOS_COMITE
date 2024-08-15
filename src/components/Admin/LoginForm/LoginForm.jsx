import React, { useState } from "react";
//importaciones para el manejo de estilos
import { Icon } from "semantic-ui-react";
import "./LoginForm.scss";
//importaciones para el manejo de formularios
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
//importaciones para la comunicacion con el backend
import { loginApi } from "../../../api/user";
/*importaciones para el manejo provider (el contexto de nuestra aplicacion)*/
import { useAuth } from "../../../hooks";
import logo from "../../../assets/logo_nayarit.jpg";

export const LoginForm = () => {
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("Iniciar sesion");

  /* console.log(useAuth()); */
  const { login } = useAuth();

  const formik = useFormik({
    //son todos los valores de nuestro formulario
    initialValues: {
      username: "",
      password: "",
    },
    //es la accion a realizar cuando el usuario envia el formulario
    onSubmit: async (formValue) => {
      if (!formValue.username) {
        toast.error("Error al iniciar sesión, debes introducir tu usuario");
        return;
      } else if (!formValue.password) {
        toast.error("Error al iniciar sesión, debes introducir tu contraseña");
        return;
      }
      try {
        const response = await loginApi(formValue);
        const { access } = response;
        login(access);
      } catch (error) {
        toast.error("Error al iniciar sesión, usuario o contraseña es incorrecto, favor de revisar");
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
            "Bienvenido, será redireccionado al inicio de la plataforma"
          );
        } else {
          setMessage("Iniciar sesión");
        }

        formik.handleSubmit(e);
        setWorking(false);
      }, 1500);
    }, 1500);
  };

  return (
    <form
      className={`login ${working ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <p className="title">Iniciar sesión</p>
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
        onChange={formik.handleChange}
        autoComplete="off"
      />
      <i className="fa lock">
        <Icon name="lock" />
      </i>
      {formik.errors.password && (
        <div className="error-message">{formik.errors.password}</div>
      )}
      <a href="http://localhost:5173/admin/forgetPassword">¿Olvidaste tu contraseña?</a>
      <button type="submit">
        {working && <i className="spinner"></i>}
        <span className="state">
          {message} {working ? "" : <Icon name="arrow right" />}
        </span>
      </button>
    </form>
  );
};
