"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Button from "./ui/Button";

export default function LocationForm({ onSubmit }) {
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const capNum = parseFloat(capacity);
    if (!capNum || capNum <= 0 || !location) {
      toast("Please enter valid capacity and select location.");
      return;
    }

    onSubmit(capNum, location);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Enter Your System Details
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            System Capacity (kW)
          </label>
          <input
            type="number"
            min="1"
            step="0.1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a city</option>
            <option value="Karachi, Pakistan">Karachi, Pakistan</option>
            <option value="Lahore, Pakistan">Lahore, Pakistan</option>
            <option value="Islamabad, Pakistan">Islamabad, Pakistan</option>
          </select>
        </div>
        <Button
          type="submit"
          className="w-full"
        >
          Calculate Solar Generation
        </Button>
      </div>
    </form>
  );
}