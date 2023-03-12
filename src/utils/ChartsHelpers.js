export const gaugeChartText = {
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

export const backgroundHalfCircle = {
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

export const doughnutLabelsLine = {
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

export const backgroundCircle = {
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
