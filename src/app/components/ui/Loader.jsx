"use client";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-opacity-60" />
    </div>
  );
}
