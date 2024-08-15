import React, { useState } from "react";
import { LoginForm } from "../../../components/Admin";
import "./LoginAdmin.scss";

export const LoginAdmin = () => {

  const tutorialNominaciones = () => {
    window.open("https://youtu.be/JvOZoBlgx7I", "_blank");
  };
  const tutorialVotaciones = () => {
    window.open("https://youtu.be/5_RtQbdQUnc", "_blank");
  };

  return (
    <>
      <div className="login-admin">
        <div className="wrapper">
          <h3>Secretaría de Administración y Finanzas</h3>
          <h3>Plataforma Ética de Participación Digital</h3>
          <LoginForm />
        </div>
        <div className="floating-buttons">
          <button className="floating-button" onClick={tutorialNominaciones}>
            Tutorial de <br />
            Nominaciones
          </button>
          <button className="floating-button" onClick={tutorialVotaciones}>
            Tutorial de <br />
            Votaciones
          </button>
        </div>
      </div>
    </>
  );
};
