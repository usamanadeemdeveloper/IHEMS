"use client";
import { cn } from "@/app/utils/ui.tils";
import { MdRefresh } from "react-icons/md";


export default function Button({
  children,
  className,
  variant = "primary",
  loading = false,
  icon,
  disabled,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    secondary:
      "bg-white text-green-700 border border-green-600 hover:bg-green-50 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-100",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        disabled || loading ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <MdRefresh className="animate-spin" size={20} />}
      {!loading && icon}
      {children}
    </button>
  );
}
