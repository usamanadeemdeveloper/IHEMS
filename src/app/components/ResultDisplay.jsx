"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WiDaySunny } from "react-icons/wi";

export default function ResultDisplay({ capacity, location, weather, loading }) {
  const [dailyAvg, setDailyAvg] = useState(0);

  useEffect(() => {
    if (loading || !capacity || !weather?.length) {
      setDailyAvg(0);
      return;
    }

    const total = weather.reduce((sum, day) => {
      const sunshineFactor = (day.sunshineHours || 0) / 10;
      const efficiencyReduction = (day.cloudCover / 100) * 0.5;
      return sum + capacity * 5 * sunshineFactor * (1 - efficiencyReduction);
    }, 0);

    setDailyAvg(total / weather.length);
  }, [capacity, location, weather, loading]);

  const cityAbbr = location?.split(",")[0]?.substring(0, 2).toUpperCase() || "??";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 text-lg">
        <span className="animate-pulse">Fetching weather...</span>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <Image
          src={`https://placehold.co/100x100?text=${cityAbbr}`}
          alt={`${location} avatar`}
          className="rounded-full"
          height={70}
          width={70}
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
        <p className="text-gray-600">Solar System: {capacity} kW</p>
      </div>
      <div>
        <div className="flex justify-center mb-2">
          <WiDaySunny className="text-yellow-500 text-5xl animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Estimated Generation</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {dailyAvg.toFixed(1)} kWh/day
        </p>
        <p className="text-gray-600 mt-1">
          ≈ {(dailyAvg * 30).toFixed(0)} kWh/month
        </p>
      </div>
    </div>
  );
}
