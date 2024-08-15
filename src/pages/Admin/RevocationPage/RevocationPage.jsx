import React, { useState } from "react";
import { RevocationForm } from "../../../components/Admin";
import "./RevocationPage.scss";

export const RevocationPage = () => {
  return (
    <>
      <div className="login-admin">
        <div className="wrapper">
          <h3>Secretaría de Administración y Finanzas</h3>
          <h3>Plataforma Ética de Participación Digital</h3>
          <RevocationForm />
        </div>

      </div>
    </>
  );
};
