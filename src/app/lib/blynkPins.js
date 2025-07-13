export const SWITCH_PINS = [
  { label: "rm1", pin: "v0" },
  { label: "rm2", pin: "v3" },
  { label: "r1 fan", pin: "v1" },
  { label: "r2 fan", pin: "v5" },
  { label: "r3 fan", pin: "v7" },
  { label: "r1 light", pin: "v2" },
  { label: "r2 light", pin: "v4" },
  { label: "r3 light", pin: "v8" },
  { label: "r2 ac", pin: "v6" },
];

export const GAUGE_PINS = [
  { label: "temp", pin: "v16", unit: "°C", max: 100 },
  { label: "kwh", pin: "v19", unit: "kWh", max: 9999 },
  { label: "ac amp", pin: "v11", unit: "A", max: 30 },
  { label: "ac power", pin: "v12", unit: "W", max: 5000 },
  { label: "ac voltage", pin: "v10", unit: "V", max: 300 },
  { label: "dc amp", pin: "v15", unit: "A", max: 10 },
  { label: "dc volt", pin: "v14", unit: "V", max: 50 },
  { label: "ac frq", pin: "v13", unit: "Hz", max: 60 },
  { label: "pir", pin: "v18", unit: "", max: 1 },
];
