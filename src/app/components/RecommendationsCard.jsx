"use client";

import { useUser } from "@clerk/nextjs";
import { getRecommendationsForUser } from "../lib/Recomendations";
import { useEffect, useState } from "react";

export default function RecommendationsCard() {
  const { user } = useUser();
  const tips = getRecommendationsForUser(user?.id || "guest");
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userPreferences");
    if (stored) {
      setUserPreferences(JSON.parse(stored));
    } else {
      setUserPreferences({});
    }
  }, []);

  if (!userPreferences || userPreferences.recommendations === false) {
    return null;
  }

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-blue-100 pe-16">
      <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
      <ul className="list-disc space-y-2 text-gray-800 pl-5">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
