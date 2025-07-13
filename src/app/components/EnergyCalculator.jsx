"use client";
import { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import toast from "react-hot-toast";
import Button from "./ui/Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function EnergyCalculator() {
  const chartRef = useRef();
  const [form, setForm] = useState({
    units: "",
    category: "protected",
    phase: "single",
    load: "",
    tvCount: "",
    incomeTax: "yes",
    billingCycle: "",
  });

  const [bill, setBill] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [predictions, setPredictions] = useState({ labels: [], data: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { units: u, category, load: l, tvCount: t, incomeTax } = form;

    const units = parseFloat(u);
    const load = parseFloat(l);
    const tvCount = parseInt(t);

    let rate = 0,
      fixedCharge = 0,
      variableCharges = 0,
      exciseDuty = 0,
      salesTax = 0,
      tvFee = 0,
      incomeTaxVal = 0;

    if (category === "protected" && load <= 5 && units <= 200) {
      rate = units <= 50 ? 3.95 : units <= 100 ? 7.74 : 13.01;
      fixedCharge = 75;
    } else if (category === "lifeline" && units <= 100) {
      rate = units <= 50 ? 3.95 : 7.74;
    } else if (category === "unprotected") {
      if (units <= 100) rate = 22.44;
      else if (units <= 200) rate = 28.91;
      else if (units <= 300) rate = 33.1;
      else if (units <= 400) [rate, fixedCharge] = [37.99, 200];
      else if (units <= 500) [rate, fixedCharge] = [40.2, 400];
      else if (units <= 600) [rate, fixedCharge] = [41.62, 600];
      else if (units <= 700) [rate, fixedCharge] = [42.76, 800];
      else [rate, fixedCharge] = [47.69, 1000];
    } else if (category === "ToU" && load > 5) {
      rate = 46.85;
      fixedCharge = 1000;
    } else if (category === "commercial") {
      rate = 30;
      fixedCharge = 150;
    } else if (category === "industrial") {
      rate = 40;
      fixedCharge = 400;
    } else {
      toast("Invalid input.");
      return;
    }

    variableCharges = units * rate;
    exciseDuty =
      variableCharges *
      (["protected", "lifeline"].includes(category) ? 0.015 : 0.02);
    tvFee =
      tvCount * (["commercial", "industrial"].includes(category) ? 60 : 35);
    salesTax = (variableCharges + fixedCharge + exciseDuty) * 0.17;

    const gross = variableCharges + fixedCharge + exciseDuty + salesTax + tvFee;
    if (category === "protected" && gross >= 25000 && incomeTax === "no") {
      incomeTaxVal = gross * 0.075;
    }

    const totalBill = gross - incomeTaxVal;

    setBill({
      "Units Consumed": `${units} kWh`,
      "Rate per Unit": `PKR ${rate.toFixed(2)}`,
      "Variable Charges": `PKR ${variableCharges.toFixed(2)}`,
      "Fixed Charges": `PKR ${fixedCharge}`,
      "Excise Duty": `PKR ${exciseDuty.toFixed(2)}`,
      "Sales Tax (17%)": `PKR ${salesTax.toFixed(2)}`,
      "TV License Fee": `PKR ${tvFee.toFixed(2)}`,
      "Gross Amount": `PKR ${gross.toFixed(2)}`,
      "Income Tax": `PKR ${incomeTaxVal.toFixed(2)}`,
      "Total Bill": `PKR ${totalBill.toFixed(2)}`,
    });

    const generateWeekly = (total) => {
      let remaining = total;
      const weeks = [];
      for (let i = 0; i < 4; i++) {
        let share =
          i < 3
            ? Math.floor(Math.random() * (remaining * 0.15) + remaining * 0.2)
            : remaining;
        weeks.push(share);
        remaining -= share;
      }
      return weeks;
    };

    setWeekly(generateWeekly(units));

    const predict = (base) => {
      const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const impacts = [0.12, 0.1, 0, -0.05, -0.1, -0.15];
      const labels = [months[0]];
      const data = [Math.round(base)];
      for (let i = 1; i < 6; i++) {
        const last = data[i - 1];
        const variation = Math.random() * 0.14 - 0.07 + impacts[i];
        const predicted = Math.max(50, last * (1 + variation));
        data.push(Math.round(predicted));
        labels.push(months[i]);
      }
      return { labels, data };
    };

    setPredictions(predict(units));
  };

  const chartData = {
    labels: predictions.labels,
    datasets: [
      {
        label: "Predicted Units (kWh)",
        data: predictions.data,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const inputFields = [
    { key: "units", label: "Units Consumed (kWh)", type: "number" },
    { key: "load", label: "Sanctioned Load (kW)", type: "number" },
    { key: "tvCount", label: "Number of TV Sets", type: "number" },
    { key: "billingCycle", label: "Billing Cycle Days", type: "number" },
  ];

  const selectFields = [
    {
      key: "category",
      label: "Connection Type",
      options: [
        "protected",
        "lifeline",
        "unprotected",
        "ToU",
        "commercial",
        "industrial",
      ],
    },
    {
      key: "phase",
      label: "Phase",
      options: ["single", "three"],
    },
    {
      key: "incomeTax",
      label: "Income Tax Registered?",
      options: ["yes", "no"],
    },
  ];

  return (
    <div className="max-w-[95%] mx-auto mb-3">
      <div className="bg-white shadow-xl rounded-xl p-7 my-5">
        <h1 className="text-3xl font-bold text-start text-emerald-700 mb-6">
          Home Energy Calculator
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {inputFields.map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-emerald-900 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={key}
                value={form[key]}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          ))}

          {selectFields.map(({ key, label, options }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-emerald-900 mb-1">
                {label}
              </label>
              <select
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="self-end mb-1">
            <Button
              type="submit"
              className="w-full py-3 text-white rounded-lg font-semibold"
            >
              Calculate Bill
            </Button>
          </div>
        </form>
      </div>

      {bill && (
        <div className="bg-white shadow-xl rounded-xl p-7">
          <div className="mt-10 space-y-6">
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-lg">
              <h2 className="text-lg font-bold text-emerald-700 mb-2">
                Bill Summary
              </h2>
              <ul className="space-y-1 text-emerald-900">
                {Object.entries(bill).map(([key, val]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {val}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-lg">
              <h2 className="text-lg font-semibold text-emerald-700 mb-2">
                Weekly Consumption
              </h2>
              <ul className="list-disc pl-6 text-emerald-900">
                {weekly.map((w, i) => (
                  <li key={i}>
                    Week {i + 1}: {w} kWh
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white mt-8 rounded-lg shadow-inner p-4">
              <h2 className="text-center text-lg font-semibold text-emerald-700 mb-4">
                Predicted Monthly Consumption
              </h2>
              <div className="relative w-full h-72">
                <Line
                  ref={chartRef}
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
