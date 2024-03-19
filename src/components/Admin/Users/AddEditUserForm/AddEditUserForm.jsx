import React, {useCallback, useState} from 'react';
import {Form, Button, Checkbox, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useUser} from '../../../../hooks';
import './AddEditUserForm.scss';    
import { toast } from 'react-toastify';
//para imagenes
import {useDropzone} from 'react-dropzone';

export const AddEditUserForm = ({onCloseModal, onRefresh, user, isBlock}) => {
    const { addUser, updateUser } = useUser();
    //Estado para el manejo de imagenes
    const [previewImage, setPreviewImage] = useState(user?.image || null);
    //para el manejo de imagenes
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        await formik.setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));
        //console.log('acceptedFiles', acceptedFiles);        
    }, []);
    //para el manejo de imagenes
    const {getInputProps, getRootProps} = useDropzone({
      accept: 'image/jpeg, image/png',
      noKeyboard: true,
      multiple: false,
      onDrop
    })

    const formik = useFormik({
        initialValues:{
            username:user?.username || '',
            first_name:user?.first_name || '',
            last_name: user?.last_name || '',
            workstation: user?.workstation || '',
            dependency: user?.dependency || '',
            id_rank_fk: user?.id_rank_fk || '',
            antiquity: user?.antiquity || '',
            //password: '',
            //image: user?.image || '',
            admin:user?.admin ? true : false,
            is_staff:true,
            is_active:user?.is_active ? true : false 
        },
        /* esquema de validaciones o restricciones de cada campo */
        validationSchema: Yup.object({
            username: Yup.string().required('El numero de empleado es obligatorio'), 
            first_name: Yup.string().required('El nombre es obligatorio'),
            last_name: Yup.string().required('El apellido es obligatorio'),
            workstation: Yup.string().required('La workstation es obligatoria'),
            dependency: Yup.string().required('La dependency es obligatoria'),
            id_rank_fk: Yup.number().required('El rango es obligatorio'),
            antiquity: Yup.number(),
            password: (user?.password) ? Yup.string() : Yup.string().required('La contraseña es obligatoria'),//si se envio el user significa que se va a actualizar asi que la contraseña ya es opcional
            image: Yup.string(),
            is_staff: Yup.boolean().required('El rol es obligatorio'),
            is_active: Yup.boolean().required('El estado es obligatorio')   
        }),
        /* es la accion a realizar cuando el usuario envia el formulario */
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                console.log('formValue', formValue);
                const action = user ? 'Actualizado' : 'Creado';
                if(user) {  await updateUser(user.id, formValue); } //si hay un usuario actualizamos
                else {  await addUser(formValue);} //llamamos a la api para crear el usuario con una solicitud post  
                onRefresh();//si no hay errores refrescamos la tabla
                onCloseModal(); //cerramos la ventana modal             
                toast.success(`Usuario ${action} exitosamente`); //mostramos una notificacion
            }catch (error) {
                console.error(error);
                toast.error(`Error: ${error}`);
            } 
        }
    })

  // Opciones para el dropdown
  const rankOptions = [
    { key: '1', value: '1', text: 'Superior' },
    { key: '2', value: '2', text: 'Medio' },
    { key: '3', value: '3', text: 'Operativo' },
  ];


  //Converitir el password siempre a mayusculas
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value.toUpperCase(); // Convertir a mayúsculas
    formik.setFieldValue('password', newPassword);
 };


  return (
    <Form className='add-edit-user-form' onSubmit={formik.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input name='username' placeholder='num_empleado' onChange={formik.handleChange} value={formik.values.username} error={formik.errors.username} readOnly={user ? true : false} />
        </Form.Group>

        <Form.Group widths='equal'>
           <Form.Input name='dependency' placeholder='Dependencia' onChange={formik.handleChange} value={formik.values.dependency} error={formik.errors.dependency} readOnly={isBlock ? true : false}/>
        </Form.Group>

        <Form.Group widths='equal'>
           <Form.Input name='workstation' placeholder='Puesto' onChange={formik.handleChange} value={formik.values.workstation} error={formik.errors.workstation} readOnly={isBlock ? true : false}/>
        </Form.Group>

        <Form.Group widths='equal'>
           <Form.Input name='first_name' placeholder='Nombre(s)' onChange={formik.handleChange} value={formik.values.first_name} error={formik.errors.first_name} readOnly={isBlock ? true : false}/>
           <Form.Input name='last_name' placeholder='Apellidos' onChange={formik.handleChange} value={formik.values.last_name} error={formik.errors.last_name} readOnly={isBlock ? true : false}/>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Dropdown
              name='id_rank_fk'
              placeholder='Rango'
              fluid
              selection
              options={rankOptions}
              onChange={(e, { value }) => formik.setFieldValue('id_rank_fk', value)}
              value={formik.values.id_rank_fk}
              error={formik.errors.id_rank_fk}
              disabled={isBlock ? true : false}
            />
            <Form.Input name='antiquity' placeholder='antiguedad' onChange={formik.handleChange} value={formik.values.antiquity} error={formik.errors.antiquity} readOnly={isBlock ? true : false}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='password' type='password' placeholder='Password' onChange={handlePasswordChange} value={formik.values.password} error={formik.errors.password} readOnly={isBlock ? true : false}/>
        </Form.Group>
        
        {/* BOTON PARA SUBIR IMAGEN */}
        <Form.Group widths='equal'>
          <Button type='button' fluid {...getRootProps()}>Subir imagen</Button>
          <input {...getInputProps()} />
        </Form.Group>
        {/* el campo donde se muestra la imagen a subir */}
        <Form.Group widths='equal'>          
         <Image src={previewImage} fluid/>
        </Form.Group>

        <div className='add-edit-user-form__active'>
           <Checkbox toggle checked={formik.values.is_active} onChange={(_, data) => formik.setFieldValue('is_active', data.checked)} readOnly={isBlock ? true : false} /> Usuario Activo
        </div>
        <br />
        <div className='add-edit-user-form__admin'>
           <Checkbox toggle checked={formik.values.admin} onChange={(_, data) => formik.setFieldValue('admin', data.checked)} readOnly={isBlock ? true : false} /> Usuario Administrador
        </div>
         <br />
        <Button className="custom-button" type='submit' primary fluid content={user ? 'Actualizar' : 'Guardar'} />
    </Form>
  )
}
