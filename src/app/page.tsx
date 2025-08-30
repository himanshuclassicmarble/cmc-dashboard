"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

const apps = [
  {
    name: "Dashboard",
    href: "/card-test-v5",
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7v6h6v6" />
      </svg>
    ),
  },
  {
    name: "Reports",
    href: "/crm-route",
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M9 17v-6h13M5 7h4v12H5z" />
      </svg>
    ),
  },
  {
    name: "Application Image",
    href: "/appln",
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4
                 4-1.8 4-4-1.8-4-4-4zm0 0V4m0 16v-4m8-4h4M4 12H0"
        />
      </svg>
    ),
  },
  {
    name: "Application",
    href: "/appln",
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M12 8v8m-4-4h8" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="mb-8 text-2xl font-bold text-gray-800 dark:text-gray-200">
        Launchpad
      </h1>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
        {apps.map((app) => (
          <Link
            key={app.name}
            href={app.href}
            className={cn(
              "group flex h-24 w-24 flex-col items-center justify-center rounded-3xl bg-white shadow-lg transition-all duration-300",
              "hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "dark:bg-gray-800 dark:shadow-gray-700/50",
            )}
            aria-label={`Open ${app.name}`}
          >
            <div className="text-gray-600 dark:text-gray-300 group-hover:text-primary">
              {app.icon}
            </div>
            <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">
              {app.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
