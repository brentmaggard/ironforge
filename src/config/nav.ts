// src/config/nav.ts
import {
  Dumbbell, Calendar, BarChart3, LineChart, Calculator, TrendingUp, Activity, Settings,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  /** Show in the mobile bottom tab bar */
  mobile?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "workouts",  label: "Workouts",          href: "/workouts",  icon: Dumbbell,   mobile: true },
  { id: "programs",  label: "Programs",          href: "/programs",  icon: Calendar,   mobile: true },
  { id: "history",   label: "Workout History",   href: "/history",   icon: BarChart3 },
  { id: "progress",  label: "Progress Charts",   href: "/progress",  icon: LineChart,  mobile: true },
  { id: "analytics", label: "Analytics",         href: "/analytics", icon: BarChart3 },
  { id: "calculator",label: "Plate Calculator",  href: "/calculator",icon: Calculator },
  { id: "goals",     label: "Goals",             href: "/goals",     icon: TrendingUp, mobile: true },
  { id: "exercises", label: "Exercises",         href: "/exercises", icon: Activity },
  { id: "settings",  label: "Settings",          href: "/settings",  icon: Settings,   mobile: true },
];