import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Icon, Dropdown } from "semantic-ui-react";
import { useStage } from "../../../hooks";
import "./FormRanking.scss";
import { toast } from "react-toastify";

export const FormRanking = ({
  getVotesManual,
  countUsersRange,
  countVotesByFilters,
  countVotesByPeriod,
  sendEmail,
  stage_one,
  stage_two,
  setLoading,
  setFormData,
}) => {
  const { getStage, stages } = useStage();
  useEffect(() => {
    if (!stages) {
      getStage();
    }
  }, [stages]);

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
        .matches(/^\d{4}$/, "El año debe ser un número de 4 dígitos")
        .required("Es necesario escribir un año"),
    }),
    /* es la accion a realizar cuando el usuario envia el formulario */
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (
        formValue.stageIdFK != "" &&
        formValue.rangeIdFK != "" &&
        formValue.period != ""
      ) {
        try {
          //si hay un usuario actualizamos
          setLoading(true);
          setFormData(formValue);
          await getVotesManual(formValue);
          await countUsersRange(formValue.rangeIdFK);
          await countVotesByFilters(formValue);
          await countVotesByPeriod(formValue.period);
        } catch (error) {
          console.error(error);
          toast.error(`Error: ${error}`);
        } finally {
          setLoading(false);
        }
      }
    },
  });

  return (
    <>
      <div className="form-container">
        <div className="header-page-admin-ranking">
          <h2>Información acerca de las votaciones</h2>
        </div>

        <div className="add-edit-user-form-ranking">
          <div className="container-form-ranking">
            <Form
              className="add-edit-user-form-ranking"
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
                    {
                      key: "1",
                      value: stages && stages[0].stageId,
                      text: "Nominaciones",
                    },
                    {
                      key: "2",
                      value: stages && stages[1].stageId,
                      text: "Votaciones",
                    },
                  ]}
                  onChange={(e, { value, options }) => {
                    const option = options.find((opt) => opt.value === value);
                    formik.setFieldValue("stageIdFK", value);
                    formik.setFieldValue("stageKey", option ? option.key : "");
                  }}
                  value={formik.values.stageIdFK || null}
                  error={formik.errors.stageIdFK}
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
                  error={formik.errors.rangeIdFK}
                />
              </Form.Field>

              <Form.Input
                className="input-ranking"
                name="period"
                label="Año"
                placeholder="Año"
                onChange={formik.handleChange}
                value={formik.values.period}
                error={formik.errors.period}
              />

              <Button type="submit" className="custom-button">
                <Icon name="search" style={{ marginLeft: "5px" }} />
              </Button>
            </Form>
          </div>

          <div className="stages-options">
            <p>Actualización de fechas</p>
            <Button positive onClick={stage_one}>
              {" "}
              <Icon name="calendar" /> Periodo de nominación{" "}
            </Button>
            <Button positive onClick={stage_two}>
              {" "}
              <Icon name="calendar" /> Periodo de votación{" "}
            </Button>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};
