import {
  MdDashboard,
  MdAttachMoney,
  MdBarChart,
  MdMeetingRoom,
  MdWbSunny,
  MdFlashOn,
  MdSettings,
  MdDeviceHub,
  MdCalculate,
  MdQueryStats,
} from "react-icons/md";

export const NAV_LINKS = [
  {
    href: "/",
    label: "Dashboard",
    icon: MdDashboard,
  },
  // {
  //   href: "/pages/tariffs-and-taxes",
  //   label: "Tariffs And Taxes",
  //   icon: MdAttachMoney,
  // },
  {
    href: "/pages/data-streams",
    label: "Datastreams",
    icon: MdBarChart,
  },
  {
    href: "/pages/room-dashboard",
    label: "Room Dashboard",
    icon: MdMeetingRoom,
  },
  {
    href: "/pages/solar-predictor",
    label: "Solar Predictor",
    icon: MdWbSunny,
  },
  {
    href: "/pages/electricity-consumption",
    label: "Electricity Consumption Predictor",
    icon: MdFlashOn,
  },
  {
    href: "/pages/user-based-settings",
    label: "User Preference Form",
    icon: MdSettings,
  },
  {
    href: "/pages/blynk-dashboard",
    label: "Energy Consumption Dashboard",
    icon: MdDeviceHub,
  },
  {
    href: "/pages/energy-calculator",
    label: "Energy Calculator",
    icon: MdCalculate,
  },
  {
    href: "/pages/prediction",
    label: "Prediction",
    icon: MdQueryStats,
  },
];
