"use client";

import { useRef, useState } from "react";
import Chart from "chart.js/auto";
import Button from "./ui/Button";

const fallbackData = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  consumption: [6.5, 8, 5, 7, 7.2, 6.8, 9],
};

export default function ElectricityPredictor() {
  const chartRef = useRef(null);
  const [resultHTML, setResultHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPredictionFor, setLoadingPredictionFor] = useState(null);

  async function getPrevWeekData() {
    try {
      setLoading(true);
      const res = await fetch("https://yourdashboard.com/api/consumption", {
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const json = await res.json();
      if (!json.days || !json.consumption || json.days.length !== 7)
        throw new Error("Invalid format");
      return json;
    } catch {
      return fallbackData;
    } finally {
      setLoading(false);
    }
  }

  const handlePredict = async (daysCount, label) => {
    setLoadingPredictionFor(daysCount);
    const data = await getPrevWeekData();

    if (daysCount === 7) {
      predictConsumption(data.days, data.consumption);
    } else {
      predictExtendedPeriod(data.days, data.consumption, daysCount, label);
    }
    setLoadingPredictionFor(null);
  };

  const predictConsumption = (days, consumption) => {
    const predicted = consumption.map((unit) =>
      Math.max(unit * (1 + (Math.random() * 0.2 - 0.1)), 0)
    );
    const total = predicted.reduce((a, b) => a + b, 0);
    renderChart(days, predicted);
    displayResult(days, predicted, total, "Week");
  };

  const predictExtendedPeriod = (days, consumption, numDays, periodLabel) => {
    const avg = consumption.reduce((a, b) => a + b, 0) / 7;
    const predicted = Array.from({ length: numDays }, (_, i) => {
      const factor = Math.random() * 0.2 - 0.1;
      return Math.max(avg * (1 + factor), 0);
    });

    const dayLabels = Array.from(
      { length: numDays },
      (_, i) => `${days[i % 7]} (Day ${i + 1})`
    );
    const total = predicted.reduce((a, b) => a + b, 0);
    renderChart(dayLabels, predicted);
    displayResult(dayLabels, predicted, total, periodLabel);
  };

  const renderChart = (labels, data) => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    if (Chart.getChart(chartRef.current)) {
      Chart.getChart(chartRef.current)?.destroy();
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Predicted Units",
            data: data.map((v) => parseFloat(v.toFixed(2))),
            backgroundColor: "#3cb371",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Units" },
          },
        },
      },
    });
  };

  const displayResult = (days, predicted, total, label) => {
    let html = `<h2 class="font-semibold text-lg mb-2">Prediction for ${label}:</h2>`;
    days.forEach((day, i) => {
      html += `<p>${day}: ${predicted[i].toFixed(2)} units</p>`;
    });

    html += `<p class="font-bold mt-2">Total: ${total.toFixed(2)} units</p>
             <button onclick="window.calculateBill(${total.toFixed(
               2
             )}, '${label}')" 
             class="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
               Generate Bill
             </button>`;

    setResultHTML(html);
    // Attach global bill function
    window.calculateBill = calculateBill;
  };

  const calculateBill = (units, label) => {
    let bill = 0;
    let tdsRelief = 0;
    let quarterlyAdj = 0;

    if (units <= 100 || units <= 200) {
      bill = units * 11.69;
      tdsRelief = units * -1.71;
      quarterlyAdj = units * -3.4542;
    } else if (units <= 300) {
      bill = 100 * 11.69 + (units - 100) * 14.16;
    } else {
      bill = 100 * 11.69 + 100 * 14.16 + (units - 200) * 24.34;
    }

    const surcharge = units * 0.43;
    const duty = 20.14;
    const tax = 245.26;
    const tvlFee = 35;
    const otherTaxes = 300.4;

    const total =
      bill +
      surcharge +
      duty +
      tax +
      tvlFee +
      otherTaxes +
      tdsRelief +
      quarterlyAdj;

    const breakdown = `
      <div class="mt-6 p-4 bg-green-50 border border-green-400 rounded text-sm">
        <h3 class="text-lg font-semibold mb-2">Bill for ${label}</h3>
        <p>Total Units: ${units.toFixed(2)}</p>
        <p class="font-bold">Total Amount: ${total.toFixed(2)} PKR</p>
        <ul class="list-disc ml-5 mt-2 space-y-1">
          ${
            units <= 200
              ? `<li>TDS Relief: ${tdsRelief.toFixed(2)} PKR</li>`
              : ""
          }
          ${
            units <= 200
              ? `<li>Quarterly Adjustment: ${quarterlyAdj.toFixed(2)} PKR</li>`
              : ""
          }
          <li>Base Bill: ${bill.toFixed(2)} PKR</li>
          <li>Additional Surcharge: ${surcharge.toFixed(2)} PKR</li>
          <li>Electricity Duty: ${duty.toFixed(2)} PKR</li>
          <li>Sales Tax: ${tax.toFixed(2)} PKR</li>
          <li>TVL Fee: ${tvlFee.toFixed(2)} PKR</li>
          <li>Other Taxes: ${otherTaxes.toFixed(2)} PKR</li>
        </ul>
      </div>
    `;

    setResultHTML((prev) => prev + breakdown);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg text-[#004d40]">
      <h1 className="text-2xl font-bold text-center text-[#00796b] mb-3">
        Electricity Consumption Predictor
      </h1>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Predict future electricity usage and estimate your bill.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {[7, 14, 21, 28].map((days) => (
          <Button
            key={days}
            onClick={() =>
              handlePredict(days, days === 28 ? "1 Month" : `${days / 7} Weeks`)
            }
            loading={loadingPredictionFor === days}
          >
            Predict {days === 28 ? "1 Month" : `${days / 7} Weeks`}
          </Button>
        ))}
      </div>

      {/* Result Section */}
      {resultHTML && (
        <div
          id="result"
          className="bg-[#f0f4f4] rounded p-4 text-sm text-gray-800 mb-6"
          dangerouslySetInnerHTML={{ __html: resultHTML }}
        />
      )}

      {/* Chart */}
      <div className="h-[300px]">
        {loading && <h4 className="text-center mt-11">Loading...</h4>}
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
