import { useEffect } from "react";
import { DonutChart, Legend } from "@tremor/react";
import "../../../../index.css";
import  "./DonutChart.scss";

export const DonutChartComponent = (props) => {
  const { title, votes, totalUsers } = props;

  const totalUsersRegister = [
    {
      name: "Usuarios que no han votado",
      users: totalUsers - votes,
    },
    {
      name: "Usuarios que votaron",
      users: votes,
    },
  ];

  return (
    <>
      <div className="full-widget">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <div className="flex items-center justify-center space-x-6">
          <DonutChart
            data={totalUsersRegister}
            category="users"
            index="name"
            colors={["gray", "emerald"]}
            className="w-40"
          />
          <Legend
            categories={["Usuarios que no han votado", "Usuarios que votaron"]}
            colors={["gray", "emerald"]}
            className="max-w-xs"
          />
        </div>
      </div>
    </>
  );
};
