import React, { useState ,useEffect } from 'react'
import { useUser, useAuth } from '../../hooks';
import { Header, TableUsers, AddEditUserForm } from '../../components/Admin';
import { ModalBasic } from '../../components/common';
import { Loader } from 'semantic-ui-react';
import {Error404} from '../Error404/Error404';
export const UserAdmin = () => {
  const { users, loading, getUsers } = useUser();
  /* estados para el funcionamiento de la ventna modal */
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  //estado para refrescar la tabla por cada cambio
  const [refresh, setRefresh] = useState(false);

  const { auth } = useAuth();

  /*console.log('loading -->', loading);
  console.log('users -->', users);*/
  useEffect(() => {
    getUsers();    
  },[refresh]);

  /* FUNCIONES PARA LA FUNCIONALIDAD DE LAS VENTANAS */
  const openCloseModal = () => { setShowModal((prev) => !prev); }  // modificar el estado de la ventana (cerrado/abierto) 
  const onRefresh = () => { setRefresh((prev) => !prev);} // para refrescar la tabla


  /* funcion para crear nuestra ventana modal con su titulo y contenido*/
  /* basicamente en esta funcion modificas los estados que ser veran reflejados en el componente  ModalBasic*/
  const addUser = () => { 
    /* agregar titulo de la ventana */
    setTitleModal('Registrar a un nuevo empleado');
    //agregamos el componente del formulario que aparecera en la ventana modal
    setContentModal(<AddEditUserForm onCloseModal={openCloseModal} onRefresh={onRefresh}/>);
    /* es solo para abrir la ventana */
    openCloseModal();
 }

 const updateUser = (data) => {
    setTitleModal('Editar al empleado ' + data.first_name + ' ' + data.last_name);
    setContentModal(<AddEditUserForm onCloseModal={openCloseModal} onRefresh={onRefresh} user={data} isBlock={false}/>);
    openCloseModal();
 }
 
  //PARA SOLO PERMITIR EL ACCESO A ESTA PAGE A LOS ADMINISTRADORES
  if (!auth.me.isAdmin) {
    return <Error404 />;
  }

  return (
    <>
      <Header title="Panel de administracion de empleados" btnTitle="Nuevo usuario" btnClick={addUser} />
      {loading ? (<Loader active inline='centered'> Cargando...</Loader> ) 
      :  
      (
        <TableUsers users={users} updateUser={updateUser}/>
      
      )}
      {/* es el componente de una ventana modal que lo creaste en components/common */}
      <ModalBasic show={showModal} title={titleModal} onClose={openCloseModal} children={contentModal} size={'md'}/>
    </>    
  )
}
