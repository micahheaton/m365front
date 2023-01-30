import React, { useEffect, useState } from "react";
import { MultiSelect } from "./MultiSelect";
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
import { Doughnut, Bar } from "react-chartjs-2";
import { ModelData } from "../utils/ModelData";

export default function RcmdActions({ fuld }) {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [selectedRcmdActions, setSelectedRcmdActions] = useState([]);

  const [fullData, setFullData] = useState(fuld);
  const [results, setResults] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [toAddressData, setToAddress] = useState(null);

  function calculateCategoryResults(arr) {
    const res = ModelData(arr);
    return res;
  }

  function calculateResults(arr) {
    const res = ModelData(arr);
    console.log(res);
    setResults(res);
  }

  const selectOptions = fullData.map((el) => {
    return { value: el, label: el["Recommended action"] };
  });

  function calculateCategoryResults(arr) {
    const res = ModelData(arr);
    return res;
  }

  function filterByCategory(category) {
    if (filteredData.length > 0) {
      let newArr = [...filteredData].filter((el) => el["Category"] == category);
      setCategoryData({
        category: category,
        data: calculateCategoryResults(newArr),
      });
      setToAddress(null);
    } else {
      let newArr = [...fullData].filter((el) => el["Category"] == category);
      setCategoryData({
        category: category,
        data: calculateCategoryResults(newArr),
      });
      setToAddress(null);
    }
  }
  function filterByToAddress(toAd) {
    if (filteredData.length > 0) {
      let newArr = [...filteredData].filter((el) => el["Status"] == toAd);
      setToAddress({
        toAddress: toAd,
        data: calculateCategoryResults(newArr),
      });
      setCategoryData(null);
    } else {
      let newArr = [...fullData].filter((el) => el["Status"] == toAd);
      setToAddress({
        toAddress: toAd,
        data: calculateCategoryResults(newArr),
      });
      setCategoryData(null);
    }
  }

  useEffect(() => {
    const res = ModelData(fuld);
    setResults(res);
  }, []);

  useEffect(() => {
    filteredData.length != 0
      ? calculateResults(filteredData)
      : calculateResults(fullData);
  }, [filteredData]);

  if (!results) {
    return <p>Loading</p>;
  }

  const dataHalfDonut = {
    labels: [],
    datasets: [
      {
        label: "Points achieved",
        data: [
          categoryData
            ? categoryData.data.points.achieved
            : toAddressData
            ? toAddressData.data.points.achieved
            : results.points.achieved,
          categoryData
            ? categoryData.data.points.total - categoryData.data.points.achieved
            : toAddressData
            ? toAddressData.data.points.total -
              toAddressData.data.points.achieved
            : results.points.total - results.points.achieved,
        ],
        backgroundColor: ["#0000ff", "#cccccc"],
        borderColor: ["#0000ff", "#cccccc"],
        borderWidth: 0,
        radius: "100%",
        cutout: "70%",
        rotation: 270,
        circumference: 180,
        maintainAspectRatio: false,
        responsive: true,
      },
    ],
  };

  const gaugeChartText = {
    id: "gaugeChartText",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        data,
        chartArea: { top, bottom, left, right, width, height },
        scales: { r },
      } = chart;

      ctx.save();

      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;

      ctx.font = "600 16px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textBaseline = "top";

      ctx.textAlign = "left";
      ctx.fillText("0", left, yCoor + 4);

      const total = data.datasets[0].data[0] + data.datasets[0].data[1];
      ctx.textAlign = "right";
      ctx.fillText(total, right, yCoor + 4);

      ctx.font = "500 28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(data.datasets[0].data[0].toFixed(1), xCoor, yCoor - 24);
    },
  };

  const backgroundHalfCircle = {
    id: "backgroundHalfCircle",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      ctx.save();

      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
      const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
      const width = outerRadius - innerRadius;
      const angle = Math.PI / 100;
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = "#cccccc";
      ctx.arc(xCoor, yCoor, outerRadius - width / 2, angle * 100, 0, false);
      ctx.stroke();
    },
  };

  const doughnutLabelsLine = {
    id: "doughnutLabelsLine",
    afterDatasetsDraw(chart, args, options) {
      const {
        ctx,
        data,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;

      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition();
          // ctx.fillStyle = "#ccc";
          // ctx.fill();
          // ctx.fillRect(x, y, 10, 10);

          // draw line
          const halfwidth = width / 2;
          const halfheight = height / 2;

          const xLine = x >= halfwidth ? x + 15 : x - 15;
          const yLine = y >= halfheight ? y + 15 : y - 15;
          const extraLine = x >= halfwidth ? 15 : -15;
          // line
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(xLine, yLine);
          ctx.lineTo(xLine + extraLine, yLine);
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#ccc";
          ctx.stroke();
          //text
          const textWidth = ctx.measureText(chart.data.labels[index]).width;
          ctx.font = "700 14px sans-serif";

          //control the position
          ctx.textAlign = x >= halfwidth ? "left" : "right";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#605e5c";
          ctx.fillText(
            " " + chart.data.labels[index] + " ",
            xLine + extraLine,
            yLine
          );
        });
      });
    },
  };

  const backgroundCircle = {
    id: "backgroundCircle",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      ctx.save();

      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
      const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
      const width = outerRadius - innerRadius;
      const angle = Math.PI / 100;
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = "#0000ff";
      ctx.arc(xCoor, yCoor, outerRadius - width / 2, 0, angle * 360, false);
      ctx.stroke();
    },
  };

  const data = {
    labels: ["To address", "Completed"],
    datasets: [
      {
        label: "Count of recommended actions %",
        data: [
          categoryData
            ? (
                (categoryData.data.status.toAddress * 100) /
                (categoryData.data.status.toAddress +
                  categoryData.data.status.completed)
              ).toFixed(1)
            : (
                (results.status.toAddress * 100) /
                (results.status.toAddress + results.status.completed)
              ).toFixed(1),
          categoryData
            ? (
                (categoryData.data.status.completed * 100) /
                (categoryData.data.status.completed +
                  categoryData.data.status.toAddress)
              ).toFixed(1)
            : (
                (results.status.completed * 100) /
                (results.status.completed + results.status.toAddress)
              ).toFixed(1),
        ],
        backgroundColor: ["#118dff", "#0000ff"],
        borderColor: ["#118dff", "#0000ff"],
        borderWidth: 0,
        radius: "100%",
        cutout: "65%",
      },
    ],
  };

  const barChartOptions = {
    onClick: (evt, item) => {
      if (item.length > 0) {
        filterByCategory(
          item[0].index == 0
            ? "Device"
            : item[0].index == 1
            ? "Apps"
            : "Identity"
        );
      }
    },
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
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

  const barChartData = {
    labels: ["Device", "Apps", "Identity"],
    datasets: [
      {
        label: "Points achieved",
        data: [
          results.devices.completed.toFixed(1),

          results.apps.completed.toFixed(1),

          results.identitys.completed.toFixed(1),
        ],
        borderColor: categoryData
          ? [
              categoryData.category === "Device" ? "#118dff" : "#9dcdfa",
              categoryData.category === "Apps" ? "#118dff" : "#9dcdfa",
              categoryData.category === "Identity" ? "#118dff" : "#9dcdfa",
            ]
          : "#118dff",
        backgroundColor: categoryData
          ? [
              categoryData.category === "Device" ? "#118dff" : "#9dcdfa",
              categoryData.category === "Apps" ? "#118dff" : "#9dcdfa",
              categoryData.category === "Identity" ? "#118dff" : "#9dcdfa",
            ]
          : "#118dff",
      },
      {
        label: "Target",
        data: [
          results.devices.toAddress.toFixed(1),

          results.apps.toAddress.toFixed(1),

          results.identitys.toAddress.toFixed(1),
        ],
        borderColor: categoryData
          ? [
              categoryData.category === "Device" ? "#0000ff" : "#9da4d4",
              categoryData.category === "Apps" ? "#0000ff" : "#9da4d4",
              categoryData.category === "Identity" ? "#0000ff" : "#9da4d4",
            ]
          : "#0000ff",
        backgroundColor: categoryData
          ? [
              categoryData.category === "Device" ? "#0000ff" : "#9da4d4",
              categoryData.category === "Apps" ? "#0000ff" : "#9da4d4",
              categoryData.category === "Identity" ? "#0000ff" : "#9da4d4",
            ]
          : "#0000ff",
      },
    ],
  };

  return (
    <div className="recom-action">
      <p className="recom-action-title">Recommended Actions</p>
      <div className="input-select">
        <MultiSelect
          options={selectOptions}
          value={selectedRcmdActions}
          onChange={(e) => {
            setCategoryData(null);
            setToAddress(null);
            setFilteredData(e.map((el) => el.value));
            setSelectedRcmdActions(e);
          }}
        />
      </div>
      <div className="recom-action-content">
        <div className="chart-wrapper">
          <p className="title">Points achieved Vs. Target</p>
          <div>
            <Doughnut
              data={dataHalfDonut}
              plugins={[gaugeChartText, backgroundHalfCircle]}
              options={{
                maintainAspectRatio: true,
                responsive: true,
                aspectRatio: 1.8,
                layout: {
                  padding: 20,
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    filter: (tooltipItem) => {
                      return tooltipItem.dataIndex === 0;
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="chart-wrapper">
          <p className="title">Category</p>
          <div className="legend-wrapper">
            <div className="legend">
              <span className="dot-progress"></span>
              <p className="dot-label">&nbsp;Points achieved</p>
            </div>
            <div className="legend">
              <span className="dot-done"></span>
              <p className="dot-label">&nbsp;Target</p>
            </div>
          </div>
          <div>
            <Bar
              key={categoryData?.category}
              options={barChartOptions}
              data={barChartData}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "24px" }} className="chart-wrapper">
        <div className="legend-wrapper">
          <p className="legend-label">Status</p>
          <div className="legend">
            <span className="dot-progress"></span>
            <p className="dot-label">To address</p>
          </div>
          <div className="legend">
            <span className="dot-done"></span>
            <p className="dot-label">Completed</p>
          </div>
        </div>
        <div style={{ width: "100%" }} className="status-chart">
          <Doughnut
            data={data}
            plugins={[backgroundCircle, doughnutLabelsLine]}
            options={{
              maintainAspectRatio: true,
              aspectRatio: 2.8,
              onClick: (evt, item) => {
                if (item.length > 0) {
                  filterByToAddress(
                    item[0].index == 0 ? "To address" : "Completed"
                  );
                }
              },
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
    </div>
  );
}
