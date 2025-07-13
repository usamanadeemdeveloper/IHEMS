export const SWITCH_PINS = [
  { label: "rm1", pin: "v0" },
  { label: "rm2", pin: "v1" },
  { label: "r1 fan", pin: "v2" },
  { label: "r2 fan", pin: "v3" },
  { label: "r3 fan", pin: "v4" },
  { label: "r1 light", pin: "v5" },
  { label: "r2 light", pin: "v6" },
  { label: "r3 light", pin: "v7" },
  { label: "r2 ac", pin: "v8" },
];

export const GAUGE_PINS = [
  { label: "temp", pin: "v16", unit: "°C", max: 100 },
  { label: "kwh", pin: "v19", unit: "kWh", max: 9999 },
  { label: "ac amp", pin: "v17", unit: "A", max: 30 },
  { label: "ac power", pin: "v18", unit: "W", max: 5000 },
  { label: "ac voltage", pin: "v14", unit: "V", max: 300 },
  { label: "dc amp", pin: "v15", unit: "A", max: 10 },
  { label: "dc volt", pin: "v20", unit: "V", max: 50 },
  { label: "ac frq", pin: "v21", unit: "Hz", max: 60 },
  { label: "pir", pin: "v22", unit: "", max: 1 },
];
