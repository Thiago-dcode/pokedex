import React from "react";
import { useEffect } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";


const RadarChart = ({ chartData, type,options }) => {
  useEffect(() => console.log({ chartData }), []);

  return (
    <Chart
      type={type}
      data={chartData}
      options={options}
    />
  );
};
export default RadarChart;
