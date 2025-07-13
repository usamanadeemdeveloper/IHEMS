import { iconMap } from "../lib/iconMap";
import { calculateDailyGeneration } from "../utils/solarCalc";

export default function ForecastCard({ day, capacity }) {
  const Icon = iconMap[day.icon?.toLowerCase()] || iconMap["default"];
  const dailyGen = calculateDailyGeneration(
    capacity,
    day.sunshineHours,
    day.cloudCover
  );

  return (
    <div className="weather-card bg-white rounded-lg shadow-md p-4 text-center hover:-translate-y-1 hover:shadow-xl transition-all">
      <h4 className="font-semibold text-gray-800 mb-2">{day.day}</h4>
      <div className="flex justify-center text-5xl text-green-500 mb-2">
        <Icon />
      </div>
      <p className="text-gray-600 mb-1">{day.condition}</p>
      <p className="text-gray-700 font-medium">{day.temp.toFixed(1)}°C</p>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">Solar Output</p>
        {dailyGen > 0 ? (
          <p className="text-green-600 font-semibold">
            {dailyGen.toFixed(1)} kWh
          </p>
        ) : (
          <p className="text-gray-400">No output</p>
        )}
      </div>
    </div>
  );
}
