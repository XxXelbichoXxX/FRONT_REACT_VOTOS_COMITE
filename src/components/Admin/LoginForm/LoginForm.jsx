import React, {useState} from 'react';
//importaciones para el manejo de estilos 
import {Icon} from 'semantic-ui-react';
import "./LoginForm.scss";
//importaciones para el manejo de formularios
import * as yup from 'yup';
import {useFormik} from 'formik';
import {toast} from 'react-toastify';
//importaciones para la comunicacion con el backend
import {loginApi} from '../../../api/user';
/*importaciones para el manejo provider (el contexto de nuestra aplicacion)*/
import {useAuth} from '../../../hooks';
import logo from "../../../assets/logo_nayarit.jpg";

export const LoginForm = () => {
   const [working, setWorking] = useState(false);
   const [message, setMessage] = useState('Iniciar sesion');

   /* console.log(useAuth()); */
   const {login} = useAuth();

   const formik = useFormik({
      //son todos los valores de nuestro formulario
      initialValues:{
         username:'',
         password:'',         
      },
      //validaciones del formulario
      validationSchema: yup.object({
         //basicamente dices que en este campo tiene que ser de tipo string, un email y que es requerido
         username: yup.string().required(true),
         password: yup.string().required(true),
      }),
      //es la accion a realizar cuando el usuario envia el formulario
      onSubmit: async (formValue) => {
         try {
            const response = await loginApi(formValue);
            //la api cuando responde nos regresa un token de acceso cuando el login es correcto
            const {access} = response;
            //llamamos al login de nuestro contexto
            login(access);
         } catch (error) {
            console.log(error);
            //para que salga el alerta chiquito animado en caso de error
            toast.error('ERROR EN LA SOLICITUD');
         }
      },
   });
 
   //para una animacion del formulario al autenticarte
   const handleSubmit = (e) => {
     e.preventDefault();
     if (working) return;
     setWorking(true);
     setTimeout(() => {
       setMessage('Authenticating!');
       setTimeout(() => {
         setMessage('Iniciar sesion');
         formik.handleSubmit(e);
         setWorking(false);
       },100 );
     },100 );
   };

   const handlePasswordChange = (e) => {
      const newPassword = e.target.value.toUpperCase(); // Convertir a mayúsculas
      formik.setFieldValue('password', newPassword);
   };


  return (
      <form className={`login ${working ? 'loading' : ''}`} onSubmit={handleSubmit}>
         <p className="title">Iniciar sesión</p>
         {}
         <img  src={logo} alt="logo"/>
         <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
         />
         <i className="fa user">
            <Icon name='user' />
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
            <Icon name='lock' />
         </i>
         {formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
         )}
         <a href="#">¿Olvidaste tu contraseña?</a>
         <button type='submit'>
            {working && <i className="spinner"></i>}
            <span className="state">{message} {working ? '' : <Icon name='arrow right' />}</span>
         </button>
      </form>     
  );
}
