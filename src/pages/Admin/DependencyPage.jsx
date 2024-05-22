import React, { useState ,useEffect } from 'react'
import { useDependency, useAuth } from '../../hooks';
import { Header, DependenciesList, AddEditDependencyForm } from '../../components/Admin';
import { ModalBasic } from '../../components/common';
import { Loader } from 'semantic-ui-react';
import {Error404} from '../Error404/Error404';
export const DependencyPage = () => {
  const { dependencies, loadingDependency, getDependencies } = useDependency();
  /* estados para el funcionamiento de la ventna modal */
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  //estado para refrescar la tabla por cada cambio
  const [refresh, setRefresh] = useState(false);

  const { auth } = useAuth();

  /*console.log('loading -->', loading);
  console.log('dependencies -->', dependencies);*/
  useEffect(() => {
    getDependencies();    
  },[refresh]);

  /* FUNCIONES PARA LA FUNCIONALIDAD DE LAS VENTANAS */
  const openCloseModal = () => { setShowModal((prev) => !prev); }  // modificar el estado de la ventana (cerrado/abierto) 
  const onRefresh = () => { setRefresh((prev) => !prev);} // para refrescar la tabla


  /* funcion para crear nuestra ventana modal con su titulo y contenido*/
  /* basicamente en esta funcion modificas los estados que ser veran reflejados en el componente  ModalBasic*/
  const addDependency = () => { 
    /* agregar titulo de la ventana */
    setTitleModal('Registrar una nueva dependencia');
    //agregamos el componente del formulario que aparecera en la ventana modal
    setContentModal(<AddEditDependencyForm onCloseModal={openCloseModal} onRefresh={onRefresh}/>);
    /* es solo para abrir la ventana */
    openCloseModal();
 }

 const updateDependency = (data) => {
    setTitleModal('Editar dependencia');
    setContentModal(<AddEditDependencyForm onCloseModal={openCloseModal} onRefresh={onRefresh} dependency={data} isBlock={false}/>);
    openCloseModal();
 }
 
  //PARA SOLO PERMITIR EL ACCESO A ESTA PAGE A LOS ADMINISTRADORES
  if (!auth.me.isAdmin) {
    return <Error404 />;
  }

  return (
    <>
      <Header title="Directorio de dependencias" btnTitle="Registrar nueva dependencia" btnClick={addDependency} />
      {loadingDependency ? (<Loader active inline='centered'> Cargando...</Loader> ) 
      :  
      (
        <DependenciesList dependencies={dependencies} updateDependency={updateDependency} onRefresh={onRefresh}/>
      
      )}
      {/* es el componente de una ventana modal que lo creaste en components/common */}
      <ModalBasic show={showModal} title={titleModal} onClose={openCloseModal} children={contentModal} size={'md'}/>
    </>    
  )
}
