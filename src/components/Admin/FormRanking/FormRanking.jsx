import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Icon, Dropdown } from "semantic-ui-react";
import { useStage } from "../../../hooks";
import "./FormRanking.scss";

export const FormRanking = ({ getVotesManual, stage_one, stage_two }) => {
  const { getStage } = useStage();
  useEffect(() => {
    getStage();
  }, []);

  /* SECCION DE FUNCIONALIDAD DEL FORMULARIO */
  const formik = useFormik({
    initialValues: {
      stageIdFK: "",
      rangeIdFK: "",
      period: "",
    },
    /* esquema de validaciones o restricciones de cada campo */
    validationSchema: Yup.object({
      stageIdFK: Yup.number().required("El campo Etapa es obligatorio"),
      rangeIdFK: Yup.number().required("El campo Rango es obligatorio"),
      period: Yup.string()
/*       .matches(/^\d{4}$/, "El campo Periodo debe ser un número de 4 dígitos")
      .required("El campo Periodo es obligatorio"), */
    }),
    /* es la accion a realizar cuando el usuario envia el formulario */
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //si hay un usuario actualizamos
        await getVotesManual(formValue); //llamamos a la api para crear el usuario con una solicitud post
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error}`);
      }
    },
  });

  return (
    <>
      <div className="header-page-admin-rankin">
        <h2>Consultar ranking de votos</h2>
      </div>

      <div className="add-edit-user-form-rankin">
        <Form
          className="add-edit-user-form-rankin"
          onSubmit={formik.handleSubmit}
        >
          {/* Dropdown de Etapas */}
          <Form.Field>
            <label>Etapa</label>
            <Dropdown
              selection
              name="stageIdFK"
              placeholder="Selecciona una etapa"
              options={[
                { key: "1", value: "1", text: "Nominaciones" },
                { key: "2", value: "2", text: "Selecciones" },
              ]}
              onChange={(e, { value }) =>
                formik.setFieldValue("stageIdFK", value)
              }
              value={formik.values.stageIdFK || null}
            />
          </Form.Field>
          {/* Dropdown de Rangos */}
          <Form.Field>
            <label>Rango</label>
            <Dropdown
              selection
              name="rangeIdFK"
              placeholder="Selecciona un rango"
              options={[
                { key: "1", value: "1", text: "Superior" },
                { key: "2", value: "2", text: "Medio" },
                { key: "3", value: "3", text: "Operativo" },
              ]}
              onChange={(e, { value }) =>
                formik.setFieldValue("rangeIdFK", value)
              }
              value={formik.values.rangeIdFK || null}
            />
          </Form.Field>

          <Form.Input
            name="period"
            label="Año"
            placeholder="Año"
            onChange={formik.handleChange}
            value={formik.values.period}
            error={formik.errors.period}
          />

          <Button type="submit" primary fluid>
            Buscar
            <Icon name="search" style={{ marginLeft: "5px" }} />
          </Button>
        </Form>

        <Button positive onClick={stage_one}>
          {" "}
          <Icon name="calendar" /> Periodo Etapa 1{" "}
        </Button>
        <Button positive onClick={stage_two}>
          {" "}
          <Icon name="calendar" /> Periodo Etapa 2{" "}
        </Button>
      </div>
      <br />
    </>
  );
};
