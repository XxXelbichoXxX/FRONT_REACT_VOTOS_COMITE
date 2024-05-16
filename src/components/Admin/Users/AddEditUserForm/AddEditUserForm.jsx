import React, { useCallback, useState, useEffect } from "react";
import { Form, Button, Checkbox, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser, useDependency } from "../../../../hooks/";
import "./AddEditUserForm.scss";
import { toast } from "react-toastify";
//para imagenes
import { useDropzone } from "react-dropzone";

export const AddEditUserForm = ({
  onCloseModal,
  onRefresh,
  user,
  isBlock,
  fTime,
}) => {
  const { addUser, updateUser } = useUser();
  const [depOptions, setDepOptions] = useState([]);
  const { dependencies, getDependencies } = useDependency();
  useEffect(() => {
    if (!dependencies) {
      getDependencies();
    } else {
      const options = dependencies.map((dep) => ({
        key: dep.dependencyId,
        text: dep.dependencyName,
        value: dep.dependencyId,
      }));
      setDepOptions(options);
    }
  }, [dependencies]);
  //Estado para el manejo de imagenes
  const [previewImage, setPreviewImage] = useState(user?.image || null);
  //para el manejo de imagenes
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    await formik.setFieldValue("image", file);
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
      username: user?.username || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      workstation: user?.workstation || "",
      dependencyIdFK: user?.dependencyIdFK || "",
      rangeIdFK: user?.rangeIdFK || 0,
      antiquity: user?.antiquity || 0,
      isAdmin: user?.isAdmin ? true : false,
      is_staff: true,
      is_active: user?.is_active ? true : false,
    },
    /* esquema de validaciones o restricciones de cada campo */
    validationSchema: Yup.object({
      username: Yup.string().required("El numero de empleado es obligatorio"),
      first_name: Yup.string().required("El nombre es obligatorio"),
      last_name: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string()
        .email("Email invalido")
        .required("El email es obligatorio"),
      workstation: Yup.string().required("La workstation es obligatoria"),
      dependencyIdFK: Yup.string().required("La dependency es obligatoria"),
      rangeIdFK: Yup.number().required("El rango es obligatorio"),
      antiquity: Yup.number().required(
        "Los años de antiguedad son obligatorios"
      ),
      password: user?.password
        ? Yup.string()
        : Yup.string().required("La contraseña es obligatoria"), //si se envio el user significa que se va a actualizar asi que la contraseña ya es opcional
      image: Yup.string(),
      is_staff: Yup.boolean().required("El rol es obligatorio"),
      is_active: Yup.boolean().required("El estado es obligatorio"),
    }),
    /* es la accion a realizar cuando el usuario envia el formulario */
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log("formValue", formValue);
        const action = user ? "actualizado" : "creado";
        if (user) {
          await updateUser(user.username, formValue);
        } //si hay un usuario actualizamos
        else {
          await addUser(formValue);
        } //llamamos a la api para crear el usuario con una solicitud post
        onRefresh(); //si no hay errores refrescamos la tabla
        onCloseModal(); //cerramos la ventana modal
        toast.success(`Usuario ${action} exitosamente`); //mostramos una notificacion
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error}`);
      }
    },
  });

  // Opciones para el dropdown
  const rankOptions = [
    { key: 1, value: 1, text: "Superior" },
    { key: 2, value: 2, text: "Medio" },
    { key: 3, value: 3, text: "Operativo" },
  ];
  //Converitir el password siempre a mayusculas
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value.toUpperCase(); // Convertir a mayúsculas
    formik.setFieldValue("password", newPassword);
  };

  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      {/* Información de identificación */}
      <Form.Group widths="equal">
        <Form.Input
          label="Ingresa el número de empleado"
          name="username"
          placeholder="Número de empleado"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
          readOnly={isBlock ? true : false}
        />
        <Form.Input
          label="Ingresa el correo electrónico"
          name="email"
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          readOnly={isBlock ? true : false}
        />
      </Form.Group>
      {/* Información de la cuenta */}
      {fTime === true && (
        <>
          <Form.Group widths="equal">
            <Form.Input
              label="Escribe la contraseña del empleado"
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={handlePasswordChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
          </Form.Group>
        </>
      )}

      {/* Información personal */}
      <div className="input-label">
        <label>Información personal</label>
        <Form.Group widths="equal">
          <Form.Input
            name="first_name"
            placeholder="Nombre(s)"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            error={formik.errors.first_name}
            readOnly={isBlock ? true : false}
          />
          <Form.Input
            name="last_name"
            placeholder="Apellidos"
            onChange={formik.handleChange}
            value={formik.values.last_name}
            error={formik.errors.last_name}
            readOnly={isBlock ? true : false}
          />
        </Form.Group>
      </div>
      {/* Información de la dependencia */}
      <Form.Group widths="equal">
        <Form.Dropdown
          label="Dependencia a la que pertenece el empleado"
          name="dependencyIdFK"
          placeholder="Nombre de la dependencia"
          fluid
          selection
          options={depOptions}
          onChange={(e, { value }) =>
            formik.setFieldValue("dependencyIdFK", value)
          }
          value={formik.values.dependencyIdFK}
          error={formik.errors.dependencyIdFK}
          disabled={isBlock ? true : false}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          label="Puesto que desempeña el empleado en la dependencia"
          name="workstation"
          placeholder="Puesto"
          onChange={formik.handleChange}
          value={formik.values.workstation}
          error={formik.errors.workstation}
          readOnly={isBlock ? true : false}
        />
      </Form.Group>
      {/* Información laboral */}
      <Form.Group widths="equal">
        <Form.Dropdown
          label="Rango"
          name="rangeIdFK"
          placeholder="Rango"
          fluid
          selection
          options={rankOptions}
          onChange={(e, { value }) => formik.setFieldValue("rangeIdFK", value)}
          value={formik.values.rangeIdFK}
          error={formik.errors.rangeIdFK}
          disabled={isBlock ? true : false}
        />
        <Form.Input
          label="Años de antigüedad"
          name="antiquity"
          placeholder="Antigüedad"
          onChange={formik.handleChange}
          value={formik.values.antiquity}
          error={formik.errors.antiquity}
          type="number"
          readOnly={isBlock ? true : false}
        />
      </Form.Group>

      {fTime === false || isBlock === true && (
        <>
          {/* Imagen */}
          <Form.Group widths="equal">
            <Button type="button" fluid {...getRootProps()}>
              Subir imagen
            </Button>
            <input {...getInputProps()} />
          </Form.Group>
          <Form.Group widths="equal">
            <Image src={previewImage} fluid />
          </Form.Group>
        </>
      )}
      {/* Estado de usuario */}
      <div className="add-edit-user-form__active">
        <Checkbox
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
          readOnly={isBlock ? true : false}
        />{" "}
        Usuario Activo
      </div>
      <br />
      <div className="add-edit-user-form__admin">
        <Checkbox
          toggle
          checked={formik.values.isAdmin}
          onChange={(_, data) => formik.setFieldValue("isAdmin", data.checked)}
          readOnly={isBlock ? true : false}
        />{" "}
        Usuario Administrador
      </div>
      <br />

      {/* Botón de enviar */}
      <Button
        className="custom-button"
        type="submit"
        primary
        fluid
        content={user ? "Actualizar el empleado" : "Registrar nuevo empleado"}
      />
    </Form>
  );
};
