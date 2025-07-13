"use client";

import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  MdBarChart,
  MdAddCircle,
  MdUpload,
  MdTrendingUp,
  MdDelete,
} from "react-icons/md";
import { useBills } from "@/app/hooks/useBills";
import { fetchPrediction, uploadBills } from "../services/predictionService";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import PredictedUsage from "./shared/PredictedUsage";
import Button from "./ui/Button";

export default function Prediction() {
  const { user } = useUser();
  const { bills, handleChange, addRow, deleteRow, addParsedRows, parseMonth } =
    useBills();
  const dropdownRef = useRef();
  const [prediction, setPrediction] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [parsingFile, setParsingFile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleUpload = async () => {
    try {
      setLoadingUpload(true);
      const formattedBills = bills.map((b) => ({
        ...b,
        units: parseFloat(b.units),
        cost: parseFloat(b.cost),
      }));

      if (!user) {
        toast("User not logged in");
        return;
      }

      await uploadBills(user.id, formattedBills);
      toast.success("Bills uploaded successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleFetchPrediction = async (months) => {
    try {
      setLoadingPrediction(true);
      const result = await fetchPrediction(months);
      setPrediction(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingPrediction(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingFile(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsed = XLSX.utils.sheet_to_json(sheet);

        const parsedRows = parsed
          .map(({ Cost, Month, Units }) => ({
            month: parseMonth(Month),
            units: parseFloat(Units),
            cost: parseFloat(Cost),
          }))
          .filter((row) => {
            return row.month && !isNaN(row.units) && !isNaN(row.cost);
          });

        if (parsedRows.length === 0) {
          return toast.error(
            "Invalid file format. Please use the sample CSV for reference."
          );
        }

        addParsedRows(parsedRows);
        toast.success("File imported successfully!");
      } catch (err) {
        toast.error("Error parsing file");
      } finally {
        setParsingFile(false);
      }
    };

    reader.onerror = (err) => {
      toast.error("Failed to read file: " + err.message);
      setParsingFile(false);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="max-w-[95%] mx-auto p-6 space-y-8 text-gray-800 mb-7">
      {/* Header */}
      <div className="flex justify-between border-b pb-2">
        <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <MdBarChart className="text-green-600 text-3xl" />
          Energy Bill Prediction
        </h1>
        <div className="flex flex-col items-end">
          <Button onClick={addRow} icon={<MdAddCircle size={18} />}>
            Add Row
          </Button>
          <div className="text-xs mt-1">
            <a
              href="/sample-bills.csv"
              className="text-blue-600 underline"
              download
            >
              Download sample CSV
            </a>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Upload Excel or CSV
        </label>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          disabled={parsingFile}
          className="mt-1 border px-3 py-2 rounded w-full disabled:opacity-50"
        />
        {parsingFile && (
          <div className="text-xs text-gray-500 mt-1">Parsing file...</div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-green-200">
        <table className="min-w-full divide-y divide-green-200 text-sm">
          <thead className="bg-green-100 text-green-800 font-medium">
            <tr>
              <th className="px-4 py-2 text-left">Month</th>
              <th className="px-4 py-2 text-left">Units</th>
              <th className="px-4 py-2 text-left">Cost (Rs)</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {bills.map((bill, i) => (
              <tr key={i} className="hover:bg-green-50 transition">
                <td className="px-4 py-2">
                  <input
                    type="month"
                    value={bill.month}
                    onChange={(e) => handleChange(i, "month", e.target.value)}
                    className="w-full border border-green-200 rounded px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={bill.units}
                    onChange={(e) => handleChange(i, "units", e.target.value)}
                    className="w-full border border-green-200 rounded px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={bill.cost}
                    onChange={(e) => handleChange(i, "cost", e.target.value)}
                    className="w-full border border-green-200 rounded px-2 py-1"
                  />
                </td>
                <td className="px-2 py-2 text-center">
                  <Button
                    onClick={() => deleteRow(i)}
                    disabled={bills.length === 1}
                    icon={<MdDelete size={20} />}
                    variant="danger"
                  ></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-green-200 space-y-2">
        <h2 className="text-md font-semibold text-green-700 flex items-center gap-2">
          Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={handleUpload}
            disabled={loadingUpload}
            icon={<MdUpload size={18} />}
          >
            {loadingUpload ? "Uploading..." : "Upload Bills"}
          </Button>
          <div ref={dropdownRef} className="relative inline-block text-left">
            <div>
              <Button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => setDropdownOpen((prev) => !prev)}
                icon={<MdTrendingUp size={18} />}
              >
                {loadingPrediction ? "Predicting..." : "Predict"}
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.08 1.04l-4.24 4.25a.75.75 0 01-1.08 0l-4.24-4.25a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>

            {dropdownOpen && (
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className="absolute -right-3 z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
              >
                <div className="py-1" role="none">
                  <Button
                    onClick={() => handleFetchPrediction(1)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-100 w-full text-left"
                    variant="ghost"
                    role="menuitem"
                  >
                    Predict 1 Month
                  </Button>
                  <Button
                    onClick={() => handleFetchPrediction(6)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-100 w-full text-left"
                    variant="ghost"
                    role="menuitem"
                  >
                    Predict 6 Months
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prediction Output */}
      {prediction && <PredictedUsage prediction={prediction} loading={loadingPrediction}/>}
    </div>
  );
}
