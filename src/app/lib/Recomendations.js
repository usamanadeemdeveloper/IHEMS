export const RECOMMENDATION_SETS = [
  [
    "Try raising your AC temperature slightly to reduce energy usage.",
    "Run heavy appliances like washing machines during off-peak hours.",
    "Unplug idle electronics to avoid phantom energy drain.",
  ],
  [
    "Keep your solar panels clean for better efficiency.",
    "Use energy-saving bulbs and turn off lights in unused rooms.",
    "Close windows and doors while the AC is running to conserve energy.",
  ],
  [
    "Use ceiling fans to help circulate cool air more efficiently.",
    "Schedule laundry and dishwashing during daytime to use solar power (if available).",
    "Consider switching off your router at night to save energy.",
  ],
  [
    "Avoid using electric water heaters during peak hours.",
    "Use smart plugs to cut power to devices when not in use.",
    "Allow natural light during the day to reduce lighting needs.",
  ],
];
export function getRecommendationsForUser(userId) {
  // Use a hash or modulo trick to assign consistent set to each user
  const index = userId?.length ? userId.charCodeAt(0) % RECOMMENDATION_SETS.length : 0;
  return RECOMMENDATION_SETS[index];
}