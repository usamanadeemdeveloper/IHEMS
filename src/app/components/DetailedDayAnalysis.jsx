import { calculateDailyGeneration } from "../utils/solarCalc";

export default function DetailedDayAnalysis({ day, capacity }) {
  const dailyGen = calculateDailyGeneration(
    capacity,
    day.sunshineHours,
    day.cloudCover
  );

  return (
    <div className="bg-green-50 rounded-lg p-4">
      <h4 className="font-semibold text-gray-800">{day.day} Analysis</h4>
      <p className="text-sm text-gray-600 mt-1">
        With {day.sunshineHours}h sun and {day.cloudCover}% clouds, your{" "}
        {capacity}kW system may generate{" "}
        <span className="font-medium">
          {dailyGen <= 0 ? "no output" : `${dailyGen.toFixed(1)} kWh`}
        </span>
        .
      </p>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{
              width: `${(dailyGen / (capacity * 5)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
