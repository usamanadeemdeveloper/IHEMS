"use client";
import { useState } from "react";
import LocationForm from "./LocationForm";
import ResultDisplay from "./ResultDisplay";
import ForecastPanel from "./ForecastPanel";
import { fetchWeatherData } from "../services/fetchWeather";
import toast from "react-hot-toast";

export default function SolarPredictor() {
  const [capacity, setCapacity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState([]);

  const handleSubmit = async (cap, loc) => {
    try {
      setLoading(true);
      setCapacity(cap);
      setLocation(loc);
      const liveWeather = await fetchWeatherData(loc);
      setWeather(liveWeather);
    } catch (err) {
      toast.error(`Failed to load weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="gradient-bg min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Solar Energy Generation Predictor
            </h1>
            <p className="text-xl text-gray-600">
              Estimate your solar panel output based on weather forecasts
            </p>
          </header>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <LocationForm onSubmit={handleSubmit} />
              </div>
              <div className="md:w-1/2 bg-blue-50 p-8 flex flex-col justify-center">
                {capacity && location && (
                  <ResultDisplay
                    capacity={capacity}
                    location={location}
                    weather={weather}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          </div>
          {weather.length > 0 && (
            <ForecastPanel capacity={capacity} weather={weather} />
          )}
        </div>
      </main>
    </>
  );
}
