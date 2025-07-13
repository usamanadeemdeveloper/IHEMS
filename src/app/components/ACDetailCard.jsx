import { MdFlashOn } from "react-icons/md";
import StatItem from "./shared/StateItem";

export default function ACDetailCard({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-green-200 space-y-4 transition hover:shadow-lg">
      <h2 className="text-lg font-semibold text-green-700 text-center flex items-center justify-center gap-1">
        <MdFlashOn className="w-5 h-5 text-green-600" />
        AC Stats
      </h2>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <StatItem label="Voltage" value={data?.volt} unit="V" />
        <StatItem label="Current" value={data?.amp} unit="A" />
        <StatItem label="Power" value={data?.pow} unit="W" />
        <StatItem label="Frequency" value={data?.frq} unit="Hz" />
      </div>
    </div>
  );
}