export async function uploadBills(userId, bills) {
  const res = await fetch("/api/prediction/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bills }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to upload bills");
  return data;
}

export async function fetchPrediction(months = 1) {
  const res = await fetch(`/api/prediction/auto?months=${months}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch prediction");
  return data.prediction;
}

export async function fetchPredictionFromGauges(gaugeValues) {
  const res = await fetch("/api/prediction/from-gauges", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gaugeValues),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch prediction");
  return data.prediction;
}


