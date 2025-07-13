"use client";

import { useEffect, useState } from "react";
import { getPin } from "../services/blynkService";

export default function TotalUnitCard() {
  const roomNames = ["ROOM 1", "ROOM 2", "ROOM 3"];
  const [sharedKwh, setSharedKwh] = useState(0);

  const roomProportions = {
    "ROOM 1": 0.3,
    "ROOM 2": 0.45,
    "ROOM 3": 0.25,
  };

  useEffect(() => {
    async function fetchKwh() {
      try {
        const raw = await getPin("v19");
        setSharedKwh(parseFloat(raw || 0));
      } catch (err) {
        console.error("Failed to fetch kWh from v19", err);
      }
    }

    fetchKwh();
  }, []);

  const total = sharedKwh;

  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-green-200 transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-green-700 mb-4 text-center">
        ⚡ Energy Usage (kWh)
      </h2>

      <table className="w-full text-sm text-gray-700">
        <tbody className="divide-y divide-gray-200">
          {roomNames.map((room) => (
            <tr key={room} className="py-1">
              <td className="capitalize">{room}</td>
              <td className="text-right font-semibold text-green-600">
                {(sharedKwh * (roomProportions[room] || 0)).toFixed(2)}
              </td>
            </tr>
          ))}

          <tr className="border-t border-gray-300 font-bold">
            <td className="pt-2">Total</td>
            <td className="text-right text-emerald-600 pt-2">
              {total.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
