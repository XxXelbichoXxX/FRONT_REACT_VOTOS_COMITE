import { BarChart } from "@tremor/react";
import "../../../../index.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./BarChart.scss";
import { useEffect, useState } from "react";

export const BarChartComponent = (props) => {
  const { votes, range, year, findUser, sendEmail, stages, stageKey } = props;

  const today = new Date().toISOString().split("T")[0];
  const todayFormat = new Date(today);
  const endDateFormat = new Date(stages[1].endDate);


  const chartdata = stageKey === '1'
  ? votes.slice(0, 5).map(vote => ({
      empCandidateIdFK: vote.empCandidateIdFK,
      name: vote.full_name,
      "Número de votos": vote.total,
      email: vote.email,
    }))
  : range === "superior" || range === "medio" 
  ? votes.slice(0, 2).map(vote => ({
      empCandidateIdFK: vote.empCandidateIdFK,
      name: vote.full_name,
      "Número de votos": vote.total,
      email: vote.email,
    })) :
    votes.slice(0, 3).map(vote => ({
      empCandidateIdFK: vote.empCandidateIdFK,
      name: vote.full_name,
      "Número de votos": vote.total,
      email: vote.email,
    }))
    ;

  const [emailsSent, setEmailsSent] = useState(false);

  useEffect(() => {
    if (stageKey === "2") {
      if (todayFormat > endDateFormat) {
        if (!emailsSent && chartdata.length > 0) {
          sendEmailToWinners();
        }
      }
    }
  }, [chartdata]);

  const sendEmailToWinners = async () => {
    try {
      for (let i = 0; i < chartdata.length; i++) {
        await sendEmail({
          to_email: chartdata[i].email,
          subject: "Anuncio de Resultados: Votación del Comité de Ética",
          message: `
Felicidades ${chartdata[i].name}, has sido elegido por tus compañeros para formar parte del Comité de Ética.

Queremos informarte que tu elección se basa en la confianza y el reconocimiento de tus habilidades y cualidades por parte de tus compañeros.

Si deseas revocar tu aceptación, por favor, visita http://localhost:5173/admin/vote/revocation.

¡Esperamos contar con tu participación en este importante comité!

`,
        });
        console.log(`Correo electrónico enviado a ${chartdata[i].email}`);
      }
      setEmailsSent(true);
    } catch (error) {
      console.error(
        "Error al enviar correos electrónicos a los ganadores:",
        error
      );
    }
  };

  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  const exportPDF = () => {
    const input = document.getElementById("chart-container");

    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 300;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(
        `Resultados por candidato del rango ${range} del año ${year}.pdf`
      );
    });
  };

  const handleBarClick = (data) => {
    findUser(data.empCandidateIdFK);
  };

  return (
    <>
      <div className="export-pdf">
        <button onClick={() => exportPDF()}>Exportar gráfico de barras</button>
      </div>
      <div id="chart-container" className="chart-container">
        <h1>
          Resultados por candidato del rango {range} del año {year}
        </h1>
        <BarChart
          className="barchart"
          data={chartdata}
          index="name"
          categories={["Número de votos"]}
          colors={["emerald"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
          yAxisLabel="Total de votos"
          xAxisLabel="Candidatos"
          noDataText="No hay votos registrados"
          onValueChange={handleBarClick}
        />
      </div>
    </>
  );
};
