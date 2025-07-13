"use client";

import { useEffect, useState } from "react";
import ACDetailCard from "./ACDetailCard";
import StatusBadge from "./StatusBadge";
import BatteryDetailCard from "./BatteryDetailCard";
import RoomCard from "./RoomCard";
import roomConfig from "../lib/rooms";
import { acPins, batteryPins } from "../lib/acBatteryPins";
import { fetchACBatteryData, fetchRoomStates } from "../services/blynkService";
import TotalUnitCard from "./TotalUnitCard";
import GlobalLoader from "./ui/Loader";

export default function DashboardPage() {
  const [roomStates, setRoomStates] = useState({});
  const [batteryData, setBatteryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [acData, setAcData] = useState({});

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [rooms, ac, battery] = await Promise.all([
          fetchRoomStates(roomConfig),
          fetchACBatteryData(acPins),
          fetchACBatteryData(batteryPins),
        ]);
        setRoomStates(rooms);
        setAcData(ac);
        setBatteryData(battery);
      } catch (error) {
        console.error("Error loading data:", error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="max-w-[95%] mx-auto text-gray-800 p-4 space-y-6">
      {loading ? (
        <GlobalLoader />
      ) : (
        <>
          {/* Top Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <ACDetailCard data={acData} />
            <StatusBadge />
            <BatteryDetailCard data={batteryData} />
          </section>

          {/* Rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomConfig.map((room) => (
              <RoomCard
                key={room.name}
                roomName={room.name}
                data={roomStates[room.name] || {}}
                pins={room.pins}
              />
            ))}
          </div>

          {/* Total Unit */}
          <TotalUnitCard />
        </>
      )}
    </div>
  );
}
