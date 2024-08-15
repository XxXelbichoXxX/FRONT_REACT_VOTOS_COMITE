import React, { useState } from "react";
import { ResetPasswordForm } from "../../../components/Admin";
import "./ResetPasswordPage.scss";

export const ResetPasswordPage = () => {
  return (
    <>
      <div className="login-admin">
        <div className="wrapper">
          <h3>Secretaría de Administración y Finanzas</h3>
          <h3>Plataforma Ética de Participación Digital</h3>
          <ResetPasswordForm />
        </div>

      </div>
    </>
  );
};
