"use client";
import React from "react";
import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
);

const chartData = {
  pie: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [85, 44, 45],
        backgroundColor: ["#FF6384", "#36A2EB", "lightgreen"],
      },
    ],
  },
  bar: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Data",
        data: [30, 20, 45, 25, 30, 40, 55, 45, 60, 35, 55, 35],
        borderColor: "green",
        backgroundColor: "#8BFFB2",
      },
    ],
  },
};

const polarData = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [180, 200],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56"],
    },
  ],
};

// PolarArea chart options
const polarOptions = {
  scales: {
    r: {
      min: 0, // Set the minimum value for the radial scale
      max: 200, // Set the maximum value for the radial scale
      ticks: {
        stepSize: 5, // Increment for each tick
      },
    },
  },
  plugins: {
    legend: {
      display: false, // Disable legend
    },
  },
};

const chartOptions = {
  plugins: {
    legend: {
      display: false, // Disable legend
    },
  },
};

const Charts = () => {
  return (
    <div className="flex 2xl:flex-nowrap flex-wrap justify-center items-center">
      <div className="">
        <a href="/pages/home-consumption">
          <Doughnut data={chartData.pie} options={chartOptions} />
        </a>
      </div>

      <div className="lg:w-[48%] w-full flex justify-center items-center lg:my-0 my-10">
        <Bar data={chartData.bar} options={chartOptions} />
      </div>

      <div className="">
        <PolarArea data={polarData} options={polarOptions} />
      </div>
    </div>
  );
};

export default Charts;
