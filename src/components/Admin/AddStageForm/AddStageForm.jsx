import "./AddStageForm.scss";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { Form, Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useAuth, useStage } from "../../../hooks";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;



export const AddStageForm = ({ stage, onCloseModal }) => {
  const { updateStage, getStage, stages } = useStage();
  const { auth } = useAuth();
  const startDateRef = useRef(null);

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
      startDate: Yup.date().required(
        "Debes seleccionar el rango de fechas de la etapa para poder actualizarlas"
      ),
    }),
    onSubmit: async (formValues) => {
      try {
        if (stage === "nominación") {
          if (formValues.startDate > stages[1].startDate) {
            toast.error(
              "La fecha de inicio de la etapa de nominación no puede ser mayor a la fecha de inicio de la etapa de votación"
            );
          } else {
            await updateStage(stages[0].stageId, formValues);
            toast.success(
              `Las fechas de la etapa de ${stage} fueron actualizadas exitosamente`
            );
          }
        } else if (stage === "votación") {
          if (formValues.startDate < stages[0].endDate) {
            toast.error(
              "La fecha de inicio de la etapa de votaciones no puede ser menor a la fecha limite de la etapa de nominaciones"
            );
          } else {
            await updateStage(stages[1].stageId, formValues);
            toast.success(
              `Las fechas de la etapa de ${stage} fueron actualizadas exitosamente`
            );
          }
        }
        onCloseModal();
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error}`);
      }
    },
  });
  if (formik.touched.startDate && formik.errors.startDate) {
    startDateRef.current.focus();
  }
  return (
    <>
      {stages && stages.length > 0 && stage === "nominación" && (
        <div className="container">
          <div className="title">
            <h4>Fechas establecidas para la nominación</h4>
          </div>
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
      {stages && stages.length > 0 && stage === "votación" && (
        <div className="container">
          <div className="title">
            <h4>Fechas establecidas para la votación</h4>
          </div>

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
        <div className="datePickerContainer">
          <h4>¿Desea cambiar las fechas de {stage}?</h4>
          <Space direction="vertical" size={12}>
            <RangePicker
              ref={startDateRef}
              className="datePicker"
              placeholder={["Fecha de inicio", "Fecha de fin"]}
              onChange={(dates, dateStrings) => {
                formik.setFieldValue("startDate", dateStrings[0]);
                formik.setFieldValue("endDate", dateStrings[1]);
              }}
            />
          </Space>

          {formik.errors.startDate && formik.touched.startDate && (
            <div className="error">{formik.errors.startDate}</div>
          )}

          <Button type="submit" primary fluid className="custom-button">
            Actualizar Fechas{" "}
            <Icon name="calendar" style={{ marginLeft: "5px" }} />
          </Button>
        </div>
      </Form>
      <br />
    </>
  );
};
