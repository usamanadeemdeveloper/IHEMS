"use client";

import { useBlynkDashboard } from "../hooks/useBlynkDashboard";
import { GAUGE_PINS, SWITCH_PINS } from "../lib/blynkPins";
import { MdDownload, MdLoop, MdRefresh, MdTrendingUp } from "react-icons/md";
import ToggleSwitch from "./ui/ToggleSwitch";
import GaugeWidget from "./GaugeWidget";
import GlobalLoader from "./ui/Loader";
import PredictedUsage from "./shared/PredictedUsage";
import Button from "./ui/Button";

export default function BlynkDashboard() {
  const {
    switchStates,
    gaugeValues,
    loading,
    initialLoading,
    prediction,
    loadingPrediction,
    loadData,
    handleToggle,
    handleDownload,
  } = useBlynkDashboard();

  return (
    <div className="min-h-screen bg-gray-50 p-10 mx-auto">
      {initialLoading ? (
        <GlobalLoader />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Energy Consumption Dashboard
            </h2>
            <div className="flex gap-4">
              <Button
                onClick={loadData}
                icon={<MdRefresh size={20} />}
                loading={loading}
                variant="primary"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </Button>

              <Button
                onClick={handleDownload}
                loading={loadingPrediction}
                icon={<MdDownload size={20} />}
              >
                Download Consumption
              </Button>
            </div>
          </div>

          {/* Switches */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {SWITCH_PINS.map((sw) => (
              <div
                key={sw.pin}
                className="bg-white px-4 py-2 rounded shadow border"
              >
                <label
                  htmlFor={`switch-${sw.pin}`}
                  className="text-gray-800 flex items-center justify-between"
                >
                  {sw.label}
                  <ToggleSwitch
                    id={`switch-${sw.pin}`}
                    checked={!!switchStates[sw.pin]}
                    onChange={(val) => handleToggle(sw.pin, val)}
                  />
                </label>
              </div>
            ))}
          </div>

          {/* Prediction */}
          {prediction && <PredictedUsage prediction={prediction} loading={loadingPrediction} />}

          {/* Gauges */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {GAUGE_PINS.map((g) => (
              <GaugeWidget
                key={g.pin}
                label={g.label}
                unit={g.unit}
                max={g.max}
                value={gaugeValues[g.pin] || 0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
