import React, { useState } from "react";
import { ForgetPasswordForm } from "../../../components/Admin";
import "./forgetPasswordPage.scss";

export const forgetPasswordPage = () => {
  return (
    <>
      <div className="login-admin">
        <div className="wrapper">
          <h3>Secretaría de Administración y Finanzas</h3>
          <h3>Plataforma Ética de Participación Digital</h3>
          <ForgetPasswordForm />
        </div>

      </div>
    </>
  );
};
