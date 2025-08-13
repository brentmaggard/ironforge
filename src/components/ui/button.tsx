"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "subtle" | "danger" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  subtle:  "border border-gray-300 text-gray-800 hover:bg-gray-100",
  danger:  "border border-red-600 text-red-600 hover:bg-red-50",
  ghost:   "text-gray-700 hover:bg-gray-100",
};

export default function Button({
  className, variant = "primary", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, VARIANTS[variant], className)} {...props} />;
}