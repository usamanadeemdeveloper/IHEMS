import { MdTrendingUp } from "react-icons/md";

function PredictedUsage({ prediction, loading }) {
  // Support both field formats
  const units = prediction?.estimatedUnits ?? prediction?.nextMonthUnits ?? 0;

  const cost = prediction?.predictedCost ?? 0;

  const source = prediction?.source;

  return (
    <div className="my-7 bg-green-50 border border-green-300 rounded p-4 shadow-sm text-sm text-green-900 space-y-1">
      <h3 className="font-semibold flex items-center gap-2 text-lg">
        <MdTrendingUp /> Predicted Usage
      </h3>

      <p>
        <span className="font-semibold">Predicted Units:</span>{" "}
        {loading ? "Loading..." : Number(units).toFixed(2)} kWh
      </p>

      <p>
        <span className="font-semibold">Predicted Cost:</span> Rs{" "}
        {loading ? "Loading..." : Number(cost).toFixed(2)}
      </p>

      {source && (
        <p className="text-xs italic text-green-700">Source: {loading ? "Loading..." : source}</p>
      )}
    </div>
  );
}

export default PredictedUsage;
