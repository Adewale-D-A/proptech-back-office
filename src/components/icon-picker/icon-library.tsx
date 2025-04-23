import {
  Tv,
  WavesLadder,
  PlugZap,
  AirVent,
  WashingMachine,
  Wifi,
  Martini,
  Accessibility,
  CookingPot,
  Heater,
  Dumbbell,
  LucideIcon,
} from "lucide-react";

export interface iconPack {
  label: string;
  icon: LucideIcon;
  value: string;
}

export const iconList = [
  {
    label: "Tv",
    icon: Tv,
    value: "tv",
  },
  {
    label: "Pool",
    icon: WavesLadder,
    value: "pool",
  },
  {
    label: "Electricity",
    icon: PlugZap,
    value: "electricity",
  },
  {
    label: "Air Conditioner",
    icon: AirVent,
    value: "air conditioner",
  },
  {
    label: "Washing Machine",
    icon: WashingMachine,
    value: "washing machine",
  },
  {
    label: "Wifi",
    icon: Wifi,
    value: "wifi",
  },
  {
    label: "Bar",
    icon: Martini,
    value: "bar",
  },
  {
    label: "Wheel Chair",
    icon: Accessibility,
    value: "wheel chair",
  },
  {
    label: "Cooking Pot",
    icon: CookingPot,
    value: "cooking pot",
  },
  {
    label: "Heater",
    icon: Heater,
    value: "heater",
  },
  {
    label: "Dumbbell",
    icon: Dumbbell,
    value: "dumbbell",
  },
];
