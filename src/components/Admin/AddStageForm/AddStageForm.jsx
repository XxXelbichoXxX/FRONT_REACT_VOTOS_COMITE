import "./AddStageForm.scss";
import React from "react";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { Form, Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useAuth, useStage } from "../../../hooks";


export const AddStageForm = ({ stage, onCloseModal }) => {
  const { updateStage, getStage, stages } = useStage();
  const { auth } = useAuth();

  useEffect(() => {
    getStage();
  }, []);

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      dependencyIdFK: auth.me.dependencyIdFK,
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required("Este campo es obligatorio"),
      endDate: Yup.date().required("Este campo es obligatorio"),
    }),
    onSubmit: async (formValues) => {
      try {
        // Formatea las fechas antes de enviarlas
        await updateStage(stage, formValues);
        // Tu lógica para manejar el envío del formulario con las fechas formateadas
        onCloseModal();
        toast.success(`fechas de la etapa ${stage} actualizadas exitosamente`);
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error}`);
      }
    },
  });
  return (
    <>
      {stages && stages.length > 0 && stage === 1 && (
        <div className="container">
          <h4>Fechas cargadas</h4>
          <div className="editStage">
            <div className="start">
              <p>Fecha de inicio:</p>
              <span>{stages[0].startDate}</span>
            </div>
            <div className="end">
              <p>Fecha de fin:</p>
              <span>{stages[0].endDate}</span>
            </div>
          </div>
          <br />
        </div>
      )}
      {stages && stages.length > 1 && stage !== 1 && (
        <div className="container">
          <h4>Fechas cargadas</h4>
          <div className="editStage">
            <div className="start">
              <p>Fecha de inicio:</p>
              <span>{stages[1].startDate}</span>
            </div>
            <div className="end">
              <p>Fecha de fin:</p>
              <span>{stages[1].endDate}</span>
            </div>
          </div>
          <br />
        </div>
      )}
      <Form
        className="add-edit-stage-form-rankin"
        onSubmit={formik.handleSubmit}
      >
        <Form.Input
          type="date"
          label="Fecha de Inicio"
          name="startDate"
          onChange={formik.handleChange}
          value={formik.values.startDate}
        />
        {formik.errors.startDate && formik.touched.startDate && (
          <div className="error">{formik.errors.startDate}</div>
        )}

        <Form.Input
          type="date"
          label="Fecha de Fin"
          name="endDate"
          onChange={formik.handleChange}
          value={formik.values.endDate}
        />
        {formik.errors.endDate && formik.touched.endDate && (
          <div className="error">{formik.errors.endDate}</div>
        )}

        <Button type="submit" primary fluid className="custom-button">
          Actualizar Fechas{" "}
          <Icon name="calendar" style={{ marginLeft: "5px" }} />
        </Button>
      </Form>
      <br />
    </>
  );
};
