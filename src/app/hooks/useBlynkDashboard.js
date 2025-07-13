"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchMultiplePins, isDeviceOnline, updatePin } from "../services/blynkService";
import { GAUGE_PINS, SWITCH_PINS } from "../lib/blynkPins";
import { fetchPredictionFromGauges } from "../services/predictionService";


export function useBlynkDashboard() {
  const [switchStates, setSwitchStates] = useState({});
  const [gaugeValues, setGaugeValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setPrediction(null);
      setDownloadCount(0);
      const isOnline = await isDeviceOnline();
      if (!isOnline) toast.error("Device is offline. Data may be outdated.", { id: 'fetch' });

      const [switchResults, gaugeResults] = await Promise.all([
        fetchMultiplePins(SWITCH_PINS.map((s) => s.pin)),
        fetchMultiplePins(GAUGE_PINS.map((g) => g.pin)),
      ]);

      const switches = {};
      SWITCH_PINS.forEach((s, i) => {
        const value = switchResults[i];
        if (value === undefined || value === "400") {
          toast.error(`Pin ${s.pin} failed. May not exist.`);
        } else {
          switches[s.pin] = value === "1";
        }
      });

      const gauges = {};
      GAUGE_PINS.forEach((g, i) => {
        const value = gaugeResults[i];
        if (value === undefined || value === "400") {
          toast.error(`Gauge ${g.pin} failed. May not exist.`);
        } else {
          gauges[g.pin] = parseFloat(value) || 0;
        }
      });

      setSwitchStates(switches);
      setGaugeValues(gauges);
    } catch (err) {
      toast.error("Failed to fetch data from Blynk");
      console.error(err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  const handleToggle = useCallback(
    async (pin, newState) => {
      const isOnline = await isDeviceOnline();
      if (!isOnline) return toast.error("Device is offline.", { id: 'update' });

      setSwitchStates((prev) => ({ ...prev, [pin]: newState }));

      const { success, message } = await updatePin(pin, newState ? 1 : 0);
      if (!success) {
        toast.error(`Failed to update ${pin}: ${message}`);
        setSwitchStates((prev) => ({ ...prev, [pin]: !newState }));
      } else {
        toast.success(`${message} updated ${pin} to ${newState ? "ON" : "OFF"}`);
        const latestValue = await fetchMultiplePins([pin]);
        setSwitchStates((prev) => ({
          ...prev,
          [pin]: latestValue[0] === "1",
        }));
      }
    },
    []
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDownload = () => {
    const rows = [["Pin", "Label", "Value"]];
    GAUGE_PINS.forEach((g) => {
      rows.push([g.pin, g.label, gaugeValues[g.pin] || 0]);
    });

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dateStr = new Date().toISOString().split("T")[0];
    a.download = `energy-consumption-${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const newCount = downloadCount + 1;
    setDownloadCount(newCount);

    if (newCount >= 6) {
      getPrediction();
    }
  };

  const getPrediction = async () => {
  try {
    setLoadingPrediction(true);
    const result = await fetchPredictionFromGauges(gaugeValues);
    setPrediction(result);
    toast.success("Prediction calculated from live gauge data");
  } catch (err) {
    toast.error("Failed to fetch prediction");
  } finally {
    setLoadingPrediction(false);
  }
};


  return {
    switchStates,
    gaugeValues,
    loading,
    prediction,
    loadingPrediction,
    initialLoading,
    loadData,
    handleToggle,
    handleDownload,
  };
}
