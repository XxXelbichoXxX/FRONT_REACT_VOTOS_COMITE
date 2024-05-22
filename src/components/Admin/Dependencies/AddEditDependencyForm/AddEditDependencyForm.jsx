import React, { useCallback, useState, useEffect } from "react";
import { Form, Button, Checkbox, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDependency } from "../../../../hooks";
import "./AddEditDependencyForm.scss";
import { toast } from "react-toastify";
//para imagenes
import { useDropzone } from "react-dropzone";
import { add } from "lodash";

export const AddEditDependencyForm = ({
  onCloseModal,
  onRefresh,
  dependency,
  isBlock,
}) => {
  const { addDependency, updateDependency } = useDependency();
  const [previewImage, setPreviewImage] = useState(dependency?.logo || null);
  //para el manejo de imagenes
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    await formik.setFieldValue("logo", file);
    setPreviewImage(URL.createObjectURL(file));
    //console.log('acceptedFiles', acceptedFiles);
  }, []);
  //para el manejo de imagenes
  const { getInputProps, getRootProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const formik = useFormik({
    initialValues: {
      dependencyName: dependency?.dependencyName || "",
      owner: dependency?.owner || "",
      address: dependency?.address || "",
      phone: dependency?.phone || "",
      page: dependency?.page || "",
    },
    /* esquema de validaciones o restricciones de cada campo */
    validationSchema: Yup.object({
      dependencyName: Yup.string().required(
        "El nombre de la dependencia es obligatorio"
      ),
      owner: Yup.string().required("El nombre del titular es obligatorio"),
      address: Yup.string().required(
        "La dirección de la dependencia es obligatoria"
      ),
      phone: Yup.string().required("El número de contacto es obligatorio"),
      page: Yup.string().required("La pagina de la dependencia es obligatoria"),
    }),
    /* es la accion a realizar cuando el usuario envia el formulario */
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log("formValue", formValue);
        const action = dependency ? "actualizada" : "creada";
        if (dependency) {
          await updateDependency(dependency.dependencyId, formValue);
        } //si hay un usuario actualizamos
        else {
          await addDependency(formValue);
        } //llamamos a la api para crear el usuario con una solicitud post
        onRefresh(); //si no hay errores refrescamos la tabla
        onCloseModal(); //cerramos la ventana modal
        toast.success(`Dependencia ${action} exitosamente`); //mostramos una notificacion
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error}`);
      }
    },
  });

  return (
    <Form className="add-edit-dependency-form" onSubmit={formik.handleSubmit}>
      {/* Información de identificación */}
      <Form.Group widths="equal">
        <Form.Input
          label="Ingresa el nombre de la dependencia"
          name="dependencyName"
          placeholder="Nombre de la dependencia"
          onChange={formik.handleChange}
          value={formik.values.dependencyName}
          error={formik.errors.dependencyName}
          readOnly={isBlock ? true : false}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          label="Ingresa el nombre del titular de la dependencia"
          name="owner"
          placeholder="Titular de la dependencia"
          onChange={formik.handleChange}
          value={formik.values.owner}
          error={formik.errors.owner}
          readOnly={isBlock ? true : false}
        />
      </Form.Group>


      {/* Información de la dependencia */}
      <Form.Group widths="equal">
        <Form.Input
          label="Ingresa la dirección de la dependencia"
          name="address"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
          readOnly={isBlock ? true : false}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          label="Ingresa el teléfono de la dependencia"
          name="phone"
          placeholder="Teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
          readOnly={isBlock ? true : false}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          label="Ingresa la página de la dependencia"
          name="page"
          placeholder="URL de la dependencia"
          onChange={formik.handleChange}
          value={formik.values.page}
          error={formik.errors.page}
          readOnly={isBlock ? true : false}
        />
      </Form.Group>

      {/* Imagen */}
      <Form.Group widths="equal">
        <Button type="button" fluid {...getRootProps()}>
          {dependency
            ? "Actualizar logotipo de la dependencia"
            : "Subir logotipo de la dependencia"}
        </Button>
        <input {...getInputProps()} />
      </Form.Group>
      <br />
      <Form.Group widths="equal">
        <Image src={previewImage} fluid />
      </Form.Group>
      {/* Estado de usuario */}

      {/* Botón de enviar */}
      <Button
        className="custom-button"
        type="submit"
        primary
        fluid
        content={
          dependency
            ? "Actualizar la dependecia"
            : "Registrar nueva dependencia"
        }
      />
    </Form>
  );
};
