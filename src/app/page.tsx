"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Link
        href="./appln"
        className={cn(
          "group flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-lg transition-all duration-300",
          "hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "dark:bg-gray-800 dark:shadow-gray-700/50",
        )}
        aria-label="Open Application"
      >
        {/* Simple SVG icon resembling an iPhone app */}
        <svg
          className="h-12 w-12 text-gray-600 dark:text-gray-300 group-hover:text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <path d="M12 8v8m-4-4h8" />
        </svg>
      </Link>
    </div>
  );
}
