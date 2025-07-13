import { VISUAL_CROSSING } from "../config/apiConfig";
import { convertConditionToIcon, estimateSunHours } from "../utils/solarCalc";

export async function fetchWeatherData(location) {
  const encodedLocation = encodeURIComponent(location);
  const { BASE_URL, API_KEY } = VISUAL_CROSSING;
  const url = `${BASE_URL}/${encodedLocation}?unitGroup=metric&key=${API_KEY}&contentType=json&include=current`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await res.json();

  // Use real-time current conditions for "Today"
  const today = {
    day: "Today",
    condition: data.currentConditions.conditions,
    temp: data.currentConditions.temp,
    cloudCover: data.currentConditions.cloudcover,
    sunshineHours: estimateSunHours(data.currentConditions), // if works with current
    icon: convertConditionToIcon(data.currentConditions.conditions),
  };

  // Use forecast for the next 4 days
  const forecast = data.days.slice(1, 5).map((day, index) => ({
    day: `Day ${index + 2}`,
    condition: day.conditions,
    temp: day.temp,
    cloudCover: day.cloudcover,
    sunshineHours: estimateSunHours(day),
    icon: convertConditionToIcon(day.conditions),
  }));

  return [today, ...forecast];
}
