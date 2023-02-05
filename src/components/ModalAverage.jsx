import React from "react";
import { Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
export default function ModalAverage({ weigtedResult, open, setOpen }) {
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
console.log(weigtedResult)
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
        label: "%",

        data: [weigtedResult*100, 100-(weigtedResult*100)],
        backgroundColor: ["#118dff", "#0000ff"],
        borderColor: ["#118dff", "#0000ff"],
        borderWidth: 0,
        radius: "100%",
        cutout: "65%",
      },
    ],
  };

  return (
    <>
      {open && (
      
        <div className="modal-container">
            <p style={{marginLeft:"auto",textAlign:"right",fontWeight:"bold"}} className="pointer" onClick={()=>setOpen(false)}>X</p>
          <Doughnut
            data={data}
            plugins={[backgroundCircle, doughnutLabelsLine]}
            options={{
              maintainAspectRatio: true,
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
      )}
    </>
  );
}
