import ForecastCard from "./ForecastCard";
import DetailedDayAnalysis from "./DetailedDayAnalysis";

export default function ForecastPanel({ capacity, weather }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        5-Day Solar Generation Forecast
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {weather.map((day, idx) => (
          <ForecastCard key={idx} day={day} capacity={capacity} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Detailed Analysis
        </h3>
        <div className="space-y-4">
          {weather.map((day, idx) => (
            <DetailedDayAnalysis key={idx} day={day} capacity={capacity} />
          ))}
        </div>
      </div>
    </div>
  );
}
