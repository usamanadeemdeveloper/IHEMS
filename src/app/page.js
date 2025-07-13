import BarChart from "./components/charts";
import RecommendationsCard from "./components/RecommendationsCard";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-8 pt-0 my-3">
        {/* Header */}
        <div className="text-center text-2xl font-bold mb-8">
          INTELLIGENT HOME ENERGY MANAGEMENT SYSTEM FOR POWER CONSUMPTION
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-800 text-white text-center p-4 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold">43 UNITS</h2>
            <p>Total Weekly Units</p>
          </div>

          <div className="bg-emerald-800 text-white text-center p-4 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold">1293.07 Rs</h2>
            <p>Total Weekly Spend</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Average Daily Usage</h2>
            <p>6 Units</p>
            <p className="text-sm text-gray-500">
              6.5 Units compared to previous week
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Average Daily Spend</h2>
            <p>180.42 Rs</p>
            <p className="text-sm text-gray-500">
              290.06 Rs compared to previous week
            </p>
          </div>
        </div>
        {/* 💡 Recommendations Card */}
        <div className="flex justify-center w-full">
          <RecommendationsCard />
        </div>

        {/* Dashboard Section */}
        <div className="mt-8">
          <BarChart />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="font-semibold text-lg">Target Budget: 180 Rs / Day</p>
        </div>
      </main>

    </div>
  );
}
