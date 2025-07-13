import { BLYNK } from "../config/apiConfig";
import { metadata } from "../lib/metadata";

const { BASE_URL, BLYNK_TOKEN } = BLYNK;

export async function updatePin(pin, value) {
  const url = `${BASE_URL}/update?token=${BLYNK_TOKEN}&pin=${pin}&value=${value ? 1 : 0}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { success: false, message: `HTTP ${res.status}` };
    }

    return { success: true, message: "Pin updated successfully" };
  } catch (err) {
    console.error(`Error updating pin ${pin}:`, err);
    return { success: false, message: err.message };
  }
}



export async function getPin(pin) {
  const url = `${BASE_URL}/get?token=${BLYNK_TOKEN}&pin=${pin}`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    try {
      const parsed = JSON.parse(text);
      if (parsed?.error) {
        console.warn(`Blynk error for pin ${pin}:`, parsed.error.message);
        return null;
      }
      return Number(parsed);
    } catch {
      return isNaN(text) ? text : Number(text);
    }
  } catch (err) {
    console.error(`Error fetching pin ${pin}:`, err);
    throw new Error(`Failed to fetch pin ${pin}`);
  }
}

export async function fetchRoomStates(roomConfig) {
  const state = {};

  for (const room of roomConfig) {
    const roomState = {};
    for (const [key, pin] of Object.entries(room.pins)) {
      const value = await getPin(pin);
      if (value !== null) {
        roomState[key] = value;
      }
    }
    state[room.name] = roomState;
  }

  return state;
}

export const fetchBlynkValues = async () => {
  const pinParams = metadata.map((m) => `&${m.pin}=get`).join("");
  const url = `${BASE_URL}/get?token=${BLYNK_TOKEN}${pinParams}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch values from Blynk");
    return await res.json();
  } catch (err) {
    console.error("Error fetching Blynk metadata pins:", err);
    return {};
  }
};

export async function fetchACBatteryData(pins) {
  const data = {};
  for (const [key, pin] of Object.entries(pins)) {
    const value = await getPin(pin);
    if (value !== null) {
      data[key] = value;
    }
  }
  return data;
}

export async function isDeviceOnline() {
  const url = `${BASE_URL}/isHardwareConnected?token=${BLYNK_TOKEN}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    return text === "true";
  } catch (err) {
    console.error("Error checking device status:", err);
    return false;
  }
}

export async function fetchMultiplePins(pins) {
  return Promise.all(
    pins.map(async (pin) => {
      try {
        const res = await fetch(`${BASE_URL}/get?token=${BLYNK_TOKEN}&${pin}`);
        return await res.text();
      } catch {
        return "0";
      }
    })
  );
}