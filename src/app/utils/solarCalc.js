export function calculateDailyGeneration(capacity, sunshineHours, cloudCover) {
  const sunshineFactor = (sunshineHours ?? 0) / 10;
  const efficiencyReduction = (cloudCover / 100) * 0.5;
  return capacity * 5 * sunshineFactor * (1 - efficiencyReduction);
}


export function estimateSunHours(day) {
  const cloud = day.cloudcover || 0;
  const base = 10; // max sun hours possible
  return Math.round(base * (1 - cloud / 100));
}

export function convertConditionToIcon(condition) {
  const map = {
    Sunny: "sun",
    Clear: "sun",
    "Partially cloudy": "cloud-sun",
    "Partly cloudy": "cloud-sun",
    Cloudy: "cloud",
    Overcast: "cloud",
    Rain: "cloud-rain",
    Showers: "cloud-rain",
    Thunderstorm: "bolt",
  };

  return map[condition] || "cloud";
}
