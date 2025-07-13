"use client";

import Layout from "@/app/components/ui/Layout";
import { useState } from "react";

export default function TariffsAndTaxes() {
  const [selectedProvince, setSelectedProvince] = useState("Sindh");
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [userUnits, setUserUnits] = useState(undefined);

  const provinceValues = {
    Punjab: {
      gst: 0,
      salesTax: 0,
      surcharges: 0,
      fuelPriceAdjustment: 0,
      incomeTax: 0,
      exciseDuty: 0,
      PHLSurcharge: 0,
      TVLicense: 0,
      cities: ["Lahore", "Faisalabad", "Rawalpindi"],
    },
    Sindh: {
      gst: 17,
      salesTax: 15,
      surcharges: 4.5,
      fuelPriceAdjustment: 0.27,
      incomeTax: 7.5,
      exciseDuty: 1.2,
      PHLSurcharge: 9,
      TVLicense: 35,
      cities: ["Karachi"],
    },
    "Khyber Pakhtunkhwa": {
      gst: 0,
      salesTax: 0,
      surcharges: 0,
      fuelPriceAdjustment: 0,
      incomeTax: 0,
      exciseDuty: 0,
      PHLSurcharge: 0,
      TVLicense: 0,
      cities: ["Peshawar", "Abbottabad", "Mardan"],
    },
    Balochistan: {
      gst: 0,
      salesTax: 0,
      surcharges: 0,
      fuelPriceAdjustment: 0,
      incomeTax: 0,
      exciseDuty: 0,
      PHLSurcharge: 0,
      TVLicense: 0,
      cities: ["Quetta", "Gwadar", "Turbat"],
    },
    "Gilgit Baltistan": {
      gst: 0,
      salesTax: 0,
      surcharges: 0,
      fuelPriceAdjustment: 0,
      incomeTax: 0,
      exciseDuty: 0,
      PHLSurcharge: 0,
      TVLicense: 0,
      cities: ["Gilgit", "Skardu", "Hunza"],
    },
    "Azad Jammu and Kashmir": {
      gst: 0,
      salesTax: 0,
      surcharges: 0,
      fuelPriceAdjustment: 0,
      incomeTax: 0,
      exciseDuty: 0,
      PHLSurcharge: 0,
      TVLicense: 0,
      cities: ["Muzaffarabad", "Mirpur", "Kotli"],
    },
  };

  // Calculate Base Value and Taxes
  const calculateValues = () => {
    const baseValue = 23 * userUnits; // base value = 23 * user input units

    const taxes = {
      gst: (provinceValues[selectedProvince].gst / 100) * baseValue,
      salesTax: (provinceValues[selectedProvince].salesTax / 100) * baseValue,
      surcharges:
        (provinceValues[selectedProvince].surcharges / 100) * baseValue,
      fuelPriceAdjustment:
        (provinceValues[selectedProvince].fuelPriceAdjustment / 100) *
        baseValue,
      PHLSurcharge:
        (provinceValues[selectedProvince].PHLSurcharge / 100) * baseValue,
      TVLicense: (provinceValues[selectedProvince].TVLicense / 100) * baseValue,
      exciseDuty:
        (provinceValues[selectedProvince].exciseDuty / 100) * baseValue,
      incomeTax: (provinceValues[selectedProvince].incomeTax / 100) * baseValue,
    };

    return { baseValue, taxes };
  };

  const { baseValue, taxes } = calculateValues();

  return (
    <>
      <div className="min-h-screen rounded-2xl">
        <main className="w-[80%] mx-auto py-8 px-4 bg-white shadow-md mt-6">
          <h2 className="text-2xl font-semibold mb-6">Tariffs and Taxes</h2>

          {/* User input for units */}
          <section className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Please enter the units
            </label>
            <input
              type="number"
              value={userUnits}
              onChange={(e) => setUserUnits(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
            />
          </section>

          {/* Taxes & Surcharges */}
          <section className="mb-6">
            <h3 className="text-lg font-medium mb-2">Taxes & Surcharges</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">GST %</label>
                <input
                  type="text"
                  // value={taxes.gst}
                  value={provinceValues.Sindh.gst}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Sales Tax %
                </label>
                <input
                  type="text"
                  // value={taxes.salesTax}
                  value={provinceValues.Sindh.salesTax}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Surcharges %
                </label>
                <input
                  type="text"
                  // value={taxes.surcharges}
                  value={provinceValues.Sindh.surcharges}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fuel Price Adjustment (PKR)
                </label>
                <input
                  type="text"
                  // value={taxes.fuelPriceAdjustment}
                  value={provinceValues.Sindh.fuelPriceAdjustment}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  PHL Surcharge %
                </label>
                <input
                  type="text"
                  // value={taxes.PHLSurcharge}
                  value={provinceValues.Sindh.PHLSurcharge}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  TV License (PKR)
                </label>
                <input
                  type="text"
                  // value={taxes.TVLicense}
                  value={provinceValues.Sindh.TVLicense}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Excise Duty
                </label>
                <input
                  type="text"
                  // value={taxes.TVLicense}
                  value={provinceValues.Sindh.exciseDuty}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Income Tax %
                </label>
                <input
                  type="text"
                  // value={taxes.TVLicense}
                  value={provinceValues.Sindh.incomeTax}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                  readOnly
                />
              </div>
            </div>
          </section>

          {/* Base Value Section */}
          <section className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Base Value After Multiply
            </h3>
            <input
              type="text"
              value={baseValue}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              readOnly
            />
          </section>

          {/* Province Selection */}
          <section className="mb-6 flex justify-between items-center">
            <div className="w-1/2  border-r-2">
              <h3 className="text-lg font-medium mb-2">Select Province</h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.keys(provinceValues).map((province) => (
                  <div key={province} className="flex items-center">
                    <input
                      type="radio"
                      name="province"
                      id={province}
                      value={province}
                      checked={selectedProvince === province}
                      onChange={(e) => {
                        setSelectedProvince(e.target.value);
                        setSelectedCity(
                          provinceValues[e.target.value].cities[0]
                        );
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={province} className="text-sm">
                      {province}
                    </label>
                  </div>
                ))}
              </div>
              <div className="w-1/2">
                <h3 className="text-lg font-medium mb-2">Select City</h3>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
                >
                  {provinceValues[selectedProvince].cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-1/2 grid grid-cols-4 pl-16">
              <div className="col-span-2">
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                  Tax Values Overview
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-6 col-span-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">GST</h3>
                  <p className="text-sm text-gray-900">
                    {taxes.gst.toFixed(2)} PKR
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    Sales Tax
                  </h3>
                  <p className="text-sm text-gray-900">
                    {taxes.salesTax.toFixed(2)} PKR
                  </p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">
                    Surcharges
                  </h3>
                  <p className="text-sm text-gray-900">
                    {taxes.surcharges.toFixed(2)} PKR
                  </p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">
                    Fuel Price Adjustment
                  </h3>
                  <p className="text-sm text-gray-900">
                    {taxes.fuelPriceAdjustment.toFixed(2)} PKR
                  </p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">
                    Income Tax
                  </h3>
                  <p className="text-sm text-gray-900">
                    {taxes.incomeTax.toFixed(2)} PKR
                  </p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">
                    Excise Duty
                  </h3>
                  <p className="text-sm text-gray-900">
                    {taxes.exciseDuty.toFixed(2)} PKR
                  </p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">
                    PHL Surcharge
                  </h3>
                  <p className="text-sm text-gray-900">
                    {taxes.PHLSurcharge.toFixed(2)} PKR
                  </p>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700">
                    TV License
                  </h3>
                  <p className="text-sm text-gray-900">
                    {taxes.TVLicense.toFixed(2)} PKR
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="shadow-xl bg-gray-100 p-4 rounded-lg my-6 flex justify-evenly items-center">
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                Total Tax Values:{" "}
                {taxes.gst +
                  taxes.salesTax +
                  taxes.surcharges +
                  taxes.fuelPriceAdjustment +
                  taxes.PHLSurcharge +
                  taxes.TVLicense +
                  taxes.exciseDuty +
                  taxes.incomeTax}
              </h2>
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                Total Bill Values:{" "}
                {baseValue +
                  taxes.gst +
                  taxes.salesTax +
                  taxes.surcharges +
                  taxes.fuelPriceAdjustment +
                  taxes.PHLSurcharge +
                  taxes.TVLicense +
                  taxes.exciseDuty +
                  taxes.incomeTax}
              </h2>
            </div>
          </section>

          {/* City Selection */}

          {/* Save Button */}
          <div className="text-end">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-32">
              Save
            </button>
          </div>
        </main>

        <footer className="py-4 text-center bg-gray-50 mt-6">
          <p className="text-sm text-gray-500">&copy; 2025 Energy AI Inc.</p>
        </footer>
      </div>
    </>
  );
}
