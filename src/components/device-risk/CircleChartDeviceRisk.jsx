import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  backgroundCircle,
  doughnutLabelsLine,
} from "../../utils/ChartsHelpers";

export default function CircleChartDeviceRisk({
  healthData,
  statusData,
  filteredByHealthStatus,
  filterByHealthStatus,
  filterByAntiVirus,
  filteredByAntiVirus,
}) {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  function calculatePercentageHealth() {
    let sum = 0;
    healthData.forEach((el) => {
      sum = el.count + sum;
    });

    const percentageData = healthData.map((el) => {
      return { ...el, count: (el.count / sum) * 100 };
    });
    return percentageData;
  }
  function calculatePercentageAntiVirus() {
    let sum = 0;
    statusData.forEach((el) => {
      sum = el.count + sum;
    });

    const percentageData = statusData.map((el) => {
      return { ...el, count: (el.count / sum) * 100 };
    });
    return percentageData;
  }
  const HealthdoughnutData = {
    labels: healthData.map((el) => el.name),
    datasets: [
      {
        label: "Count of Health status %",
        data: calculatePercentageHealth().map((el) => el.count.toFixed(1)),
        backgroundColor: [
          "#118dff",
          "#0000ff",
          "#7dcfb6",
          "#fbd1a2",
          "#f79256",
        ],
        borderColor: ["#f79256"],
        borderWidth: (element) => {
          return healthData[element.dataIndex].name == filteredByHealthStatus
            ? 3
            : 0;
        },
        radius: "100%",
        cutout: "65%",
      },
    ],
  };
  const StatusdoughnutData = {
    labels: statusData.map((el) => el.name),
    datasets: [
      {
        label: "Count of Antivirus status %",
        data: calculatePercentageAntiVirus().map((el) => el.count.toFixed(1)),
        backgroundColor: [
          "#118dff",
          "#0000ff",
          "#7dcfb6",
          "#fbd1a2",
          "#f79256",
        ],
        borderColor: ["#f79256"],
        borderWidth: (element) => {
          return statusData[element.dataIndex].name == filteredByAntiVirus
            ? 3
            : 0;
        },        radius: "100%",
        cutout: "65%",
      },
    ],
  };

  return (
    <div className="flex-row align-center justify-center">
      <div className="chart-wrapper">
        <p className="title">Health Status</p>
        <Doughnut
          data={HealthdoughnutData}
          plugins={[backgroundCircle]}
          options={{
            onClick: (event, element) => {
              filterByHealthStatus(healthData[element[0].index].name);
            },
            maintainAspectRatio: true,
            aspectRatio: 2.8,
            responsive: true,
            layout: {
              padding: 20,
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      <div className="chart-wrapper">
        <p className="title">Anti-Virus Update</p>
        <Doughnut
          data={StatusdoughnutData}
          plugins={[backgroundCircle]}
          options={{
            onClick: (event, element) => {
              filterByAntiVirus(statusData[element[0].index].name);
            },
            maintainAspectRatio: true,
            aspectRatio: 2.8,
            responsive: true,
            layout: {
              padding: 20,
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
