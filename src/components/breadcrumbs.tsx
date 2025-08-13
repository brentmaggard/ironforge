"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/nav";

const labelByHref = new Map(NAV_ITEMS.map(n => [n.href, n.label]));

export default function Breadcrumbs() {
  const pathname = usePathname();
  // split: "/workouts" -> ["workouts"], "/programs/week/1" -> ["programs","week","1"]
  const parts = pathname.split("/").filter(Boolean);

  // Build cumulative hrefs so each crumb links upward
  const crumbs = parts.map((_, i) => "/" + parts.slice(0, i + 1).join("/"));

  return (
    <nav aria-label="Breadcrumb" className="px-4 md:px-8 pt-3">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        <li>
          <Link href="/workouts" className="hover:text-gray-900">Dashboard</Link>
        </li>
        {crumbs.map((href, i) => {
          const isLast = i === crumbs.length - 1;
          const label = labelByHref.get(href) || decodeURIComponent(parts[i]).replace(/-/g, " ");
          return (
            <li key={href} className="flex items-center gap-2">
              <span className="text-gray-400">/</span>
              {isLast ? (
                <span className="font-medium text-gray-900">{label}</span>
              ) : (
                <Link href={href} className="hover:text-gray-900">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}