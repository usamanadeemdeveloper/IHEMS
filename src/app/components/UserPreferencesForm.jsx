"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ToggleSwitch from "./ui/ToggleSwitch";
import Button from "./ui/Button";

export default function UserPreferencesForm() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    targetUnit: "",
    solarCapacity: "",
    recommendations: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("userPreferences");
    if (stored) {
      setForm(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userPreferences", JSON.stringify(form));
    toast.success("Preferences saved successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        User Preferences
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* User Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your user name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00796b] focus:border-[#00796b]"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00796b] focus:border-[#00796b]"
          >
            <option value="">Select a city</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Multan">Multan</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
          </select>
        </div>

        {/* Target Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Target Unit (kWh)
          </label>
          <input
            type="number"
            name="targetUnit"
            value={form.targetUnit}
            onChange={handleChange}
            placeholder="e.g. 300"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00796b] focus:border-[#00796b]"
          />
        </div>

        {/* Solar Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Solar Capacity (kW)
          </label>
          <input
            type="number"
            name="solarCapacity"
            value={form.solarCapacity}
            onChange={handleChange}
            placeholder="e.g. 5"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00796b] focus:border-[#00796b]"
          />
        </div>

        {/* Recommendations Toggle */}
        <div className="py-3">
          <label
            htmlFor="recommendations"
            className="text-gray-800 flex items-center justify-between"
          >
            Enable Recommendations
            <ToggleSwitch
              id="recommendations"
              checked={form.recommendations}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, recommendations: val }))
              }
            />
          </label>
        </div>

        {/* Submit */}
        <div className="text-center">
          <Button type="submit" className="w-full">
            Submit Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
