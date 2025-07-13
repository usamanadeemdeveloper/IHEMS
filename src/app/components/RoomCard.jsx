import { useEffect, useState } from "react";
import { getPin, isDeviceOnline, updatePin } from "../services/blynkService";
import toast from "react-hot-toast";
import Button from "./ui/Button";

export default function RoomCard({ roomName, data, pins }) {
  const [state, setState] = useState(data);

  useEffect(() => {
    if (!data) return;
    setState(data);
  }, [data]);

  const toggle = async (key) => {
    const online = await isDeviceOnline();
    if (!online) {
      toast.error("Device is offline. Please check your connection.");
    }

    const newValue = !state[key];
    setState((prev) => ({ ...prev, [key]: newValue }));

    if (pins[key] && online) {
      const result = await updatePin(pins[key], newValue);
      if (result.success) {
        const confirmed = await getPin(pins[key]);
        setState((prev) => ({ ...prev, [key]: confirmed }));
        toast.success(`${key.toUpperCase()} updated`);
      } else {
        toast.error(`Failed to update ${key}: ${result.message}`);
        setState((prev) => ({ ...prev, [key]: !newValue }));
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-green-200 space-y-3 transition hover:shadow-lg">
      <h2 className="text-xl font-semibold text-green-700 text-center">
        {roomName}
      </h2>

      {state?.temp != null && (
        <p className="text-center text-gray-600 text-sm">
          Temp: <span className="font-semibold">{state.temp}°C</span>
        </p>
      )}

      <div className="flex justify-center flex-wrap gap-6">
        {["mode", "light", "fan", "ac"].map(
          (key) =>
            state?.[key] != null && (
              <RoomButton
                key={key}
                label={key.toUpperCase()}
                active={state[key]}
                onClick={() => toggle(key)}
              />
            )
        )}
      </div>
    </div>
  );
}

const RoomButton = ({ label, active, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="w-16 h-16 rounded-full font-bold"
      variant={active ? "primary" : "secondary"}
    >
      {label}
    </Button>
  );
};
