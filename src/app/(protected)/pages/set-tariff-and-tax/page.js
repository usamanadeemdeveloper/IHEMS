// pages/set-tariff-and-tax.js
export default function SetTariffAndTax() {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="py-4 bg-white shadow-md">
          <nav className="flex justify-between items-center max-w-7xl mx-auto px-4">
            <h1 className="text-xl font-semibold">Energen</h1>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-black">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Energy Insights</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Tariff</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">FAQ</a></li>
            </ul>
          </nav>
        </header>
  
        <main className="max-w-5xl mx-auto py-8 px-4 bg-white shadow-md mt-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Set Tariff & Tax</h2>
              <p className="text-sm text-gray-600 mb-6">
                Set energy tariffs, tax percentage and surcharge
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Select City</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Energy Tariff (PKR/kWh)</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GST (Percentage)</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Surcharges (Percentage)</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">
                  Save
                </button>
              </form>
            </div>
  
            {/* Right Section */}
            <div className="col-span-1 bg-gray-50 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-medium mb-2">Estimated Unit Price (PKR/kWh)</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Energy</span>
                  <span>13.5</span>
                </li>
                <li className="flex justify-between">
                  <span>GST</span>
                  <span>2.295</span>
                </li>
                <li className="flex justify-between">
                  <span>Surcharges</span>
                  <span>0.945</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
  
        <footer className="py-4 text-center bg-gray-50 mt-6">
          <p className="text-sm text-gray-500">&copy; 2023 Energen</p>
        </footer>
      </div>
    );
  }
  