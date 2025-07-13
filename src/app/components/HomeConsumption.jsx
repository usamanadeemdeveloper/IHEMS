import React, { useState } from "react";
import DrawerComponent from "./drawer";

const rooms = [
  {
    name: "Room 1",
    devices: [
      { name: "Fan", consumption: 12 },
      { name: "Bulb", consumption: 8 },
      { name: "AC", consumption: 25 },
    ],
  },
  {
    name: "Room 2",
    devices: [
      { name: "Fan", consumption: 21 },
      { name: "Bulb", consumption: 12 },
      { name: "AC", consumption: 52 },
    ],
  },
  {
    name: "Room 3",
    devices: [
      { name: "Fan", consumption: 10 },
      { name: "Bulb", consumption: 5 },
      { name: "AC", consumption: 29 },
    ],
  },
];

const HomeConsumption = () => {
  const [expandedRoomIndex, setExpandedRoomIndex] = useState(null);

  const toggleDetails = (index) => {
    if (expandedRoomIndex === index) {
      setExpandedRoomIndex(null); // Close the details if the same room is clicked again
    } else {
      setExpandedRoomIndex(index); // Open the details for the clicked room
    }
  };

  return (
    <>
    <DrawerComponent/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 my-">
        {rooms.map((room, index) => {
          const totalConsumption = room.devices.reduce(
            (sum, device) => sum + device.consumption,
            0
          );
          const isExpanded = expandedRoomIndex === index;

          return (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {room.name}
              </h2>
              {isExpanded && (
                <div className="mt-4 space-y-2">
                  {room.devices.map((device, idx) => (
                    <p key={idx} className="text-gray-600 text-lg">
                      {device.name}:{" "}
                      <span className="font-semibold">
                        {device.consumption} units
                      </span>
                    </p>
                  ))}
                  <p className="text-green-600 font-bold text-lg">
                    Total Consumption:{" "}
                    <span className="text-2xl">
                      {totalConsumption.toFixed(2)} units
                    </span>
                  </p>
                </div>
              )}
              <button
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md text-lg font-semibold transition-colors duration-200 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleDetails(index)}
              >
                {isExpanded ? "Hide Details" : "Show Details"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeConsumption;
