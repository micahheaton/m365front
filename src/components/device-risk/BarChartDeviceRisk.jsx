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
import { Bar } from "react-chartjs-2";

export default function BarChartDeviceRisk({
  osPlatformData,
  managedByData,
  filterManagedBy,
  filteredByManaged,
  filterByOsPlatform,
  filteredByOsPlatform,
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

  const handleBarClickManaged = (event, item) => {
    const label = event.chart.data.labels[item[0].index];
    filterManagedBy(label);
  };
  const handleBarClickOsPlatform = (event, item) => {
    const label = event.chart.data.labels[item[0].index];
    filterByOsPlatform(label);
  };

  const barChartOptions = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // add this option

    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
        ticks: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const managedBybarChartData = {
    labels: managedByData.map((el) => el.name),
    datasets: [
      {
        data: managedByData.map((el) => el.count),
        borderColor: "#0000ff",
        backgroundColor: (element) => {
          return filteredByManaged
            ? managedByData[element.dataIndex].name !== filteredByManaged
              ? "#9fa6d7"
              : "#0000ff"
            : "#0000ff";
        },
      },
    ],
  };
  const osPlatformbarChartData = {
    labels: osPlatformData.map((el) => el.name),
    datasets: [
      {
        data: osPlatformData.map((el) => el.count),
        borderColor: "#0000ff",
        backgroundColor: (element) => {
          return filteredByOsPlatform
            ? osPlatformData[element.dataIndex].name !== filteredByOsPlatform
              ? "#9fa6d7"
              : "#0000ff"
            : "#0000ff";
        },
      },
    ],
  };

  return (
    <div className="flex-row gap-20 justify-center align-center">
      <div className="chart-wrapper">
        <p className="title">Managed By</p>
        <div>
          <Bar
            options={{ ...barChartOptions, onClick: handleBarClickManaged }}
            data={managedBybarChartData}
          />
        </div>
      </div>
      <div  className="chart-wrapper">
        <p className="title">Os Platform</p>
        <div style={{ height: `${osPlatformData.length>5?osPlatformData.length*20:osPlatformData.length*40}px`, width: '800px' }}>
          <Bar
            options={{ ...barChartOptions, onClick: handleBarClickOsPlatform }}
            data={osPlatformbarChartData}
          />
        </div>
      </div>
    </div>
  );
}
