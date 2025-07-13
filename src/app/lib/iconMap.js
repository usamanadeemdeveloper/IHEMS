import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiDayCloudy,
  WiCloudy,
  WiStormShowers,
  WiSnow,
  WiFog,
} from "react-icons/wi";

export const iconMap = {
  sun: WiDaySunny,
  cloudy: WiCloudy,
  "partly-cloudy": WiDayCloudy,
  "cloud-sun": WiDayCloudy,
  cloud: WiCloud,
  rain: WiRain,
  storm: WiStormShowers,
  snow: WiSnow,
  fog: WiFog,
  default: WiCloud,
};