export default function StatItem({ label, value, unit }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span>{label}:</span>
      <strong>
        {value ?? "--"}
        {unit}
      </strong>
    </div>
  );
}
