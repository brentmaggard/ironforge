"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dumbbell, Menu, X, Timer, User,
  Calendar, BarChart3, LineChart, Activity, TrendingUp, Settings, Calculator,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { id: "workouts", label: "Workouts", icon: Dumbbell },
    { id: "programs", label: "Programs", icon: Calendar },
    { id: "history", label: "Workout History", icon: BarChart3 },
    { id: "progress", label: "Progress Charts", icon: LineChart },
    { id: "analytics", label: "Analytics Dashboard", icon: BarChart3 },
    { id: "calculator", label: "Plate Calculator", icon: Calculator },
    { id: "goals", label: "Goals", icon: TrendingUp },
    { id: "exercises", label: "Exercises", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-dvh bg-gray-50 grid grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr] md:grid-cols-[260px_1fr]">
      {/* Top bar */}
      <header className="col-span-full sticky top-0 z-30 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen((s) => !s)} className="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
              <Menu size={22} />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <Dumbbell className="text-white" size={18} />
              </span>
              <span className="text-lg font-semibold text-gray-900">IronForge</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Timer">
              <Timer size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Account">
              <User size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-dvh w-64 transform border-r bg-white transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b md:hidden flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const href = `/${id}`;
            const isActive = pathname === href;
            return (
              <Link
                key={id}
                href={href}
                className={`block rounded-lg px-3 py-2 transition-colors flex items-center gap-3 ${
                  isActive ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content renders the matched route page */}
      <main className="min-w-0 p-4 md:p-8">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden sticky bottom-0 z-30 border-t bg-white">
        <ul className="grid grid-cols-5 text-xs">
          {navItems
            .filter((n) => ["workouts", "programs", "progress", "goals", "settings"].includes(n.id))
            .map(({ id, label, icon: Icon }) => {
              const href = `/${id}`;
              const isActive = pathname === href;
              return (
                <li key={id}>
                  <Link
                    href={href}
                    className={`flex h-12 w-full flex-col items-center justify-center ${
                      isActive ? "text-blue-700" : "text-gray-600"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={18} />
                    <span className="mt-0.5">{label.split(" ")[0]}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}