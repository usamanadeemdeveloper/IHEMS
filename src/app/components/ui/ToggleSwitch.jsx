export default function ToggleSwitch({ checked, onChange, id }) {
  return (
    <div className="relative inline-flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-600 rounded-full transition-colors duration-300"></div>
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-full"></div>
    </div>
  );
}
