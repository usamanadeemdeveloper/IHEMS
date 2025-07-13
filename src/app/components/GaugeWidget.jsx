"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip);

export default function GaugeWidget({ label, unit, value, max }) {
  const percent = Math.min(value / max, 1);
  const displayValue = value.toFixed(1);

  const chartData = useMemo(
    () => ({
      labels: ["Used", "Remaining"],
      datasets: [
        {
          data: [percent * 100, 100 - percent * 100],
          backgroundColor: ["#4ADE80", "#E5E7EB"],
          borderWidth: 0,
          cutout: "75%",
          rotation: -90,
          circumference: 180,
        },
      ],
    }),
    [percent]
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow border flex flex-col items-center justify-center p-4">
      <div className="text-left w-full text-sm font-medium text-gray-800 mb-1">
        {label}
      </div>
      <div className="items-center w-full max-w-[180px]">
        <div className="relative w-full h-[100px] flex items-center justify-center">
          <Doughnut data={chartData} options={chartOptions} />

          {/* Center Value */}
          <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 font-semibold text-[18px] leading-none">
            {displayValue} <span className="text-sm">{unit}</span>
          </div>

          {/* Min/Max Values */}
          <div className="absolute bottom-[-10px] left-1 text-xs text-gray-500">
            0
          </div>
          <div className="absolute bottom-[-10px] right-1 text-xs text-gray-500">
            {max}
          </div>
        </div>
      </div>
    </div>
  );
}
