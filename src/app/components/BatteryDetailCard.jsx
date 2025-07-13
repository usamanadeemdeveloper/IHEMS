import {
  MdBattery0Bar,
  MdBattery1Bar,
  MdBattery2Bar,
  MdBattery3Bar,
  MdBattery4Bar,
  MdBattery5Bar,
  MdBattery6Bar,
  MdBatteryAlert,
} from "react-icons/md";
import StatItem from "./shared/StateItem";

export default function BatteryDetailCard({ data }) {
  const voltage = data?.volt ?? 0;
  const BatteryIcon = getBatteryIcon(voltage);
  const iconColor = getBatteryColor(voltage);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-green-200 space-y-4 transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-green-700 text-center flex items-center justify-center gap-1">
        <BatteryIcon className={`w-6 h-6 ${iconColor}`} />
        Battery Stats
      </h2>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 ">
        <StatItem label="Voltage" value={data?.volt} unit="V" />
        <StatItem label="Current" value={data?.amp} unit="A" />
      </div>
    </div>
  );
}

function getBatteryIcon(voltage) {
  if (voltage >= 13.0) return MdBattery6Bar;
  if (voltage >= 12.7) return MdBattery5Bar;
  if (voltage >= 12.4) return MdBattery4Bar;
  if (voltage >= 12.0) return MdBattery3Bar;
  if (voltage >= 11.5) return MdBattery2Bar;
  if (voltage >= 11.0) return MdBattery1Bar;
  if (voltage > 0) return MdBattery0Bar;
  return MdBatteryAlert;
}

function getBatteryColor(voltage) {
  if (voltage >= 12.4) return "text-green-600";
  if (voltage >= 11.5) return "text-yellow-500";
  if (voltage > 0) return "text-orange-500";
  return "text-red-600";
}
