"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import FilterSelectProps from "./types";

export function FilterSelect({ filterOptions }: FilterSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedAppln = searchParams.get("appln") ?? "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("appln");
    } else {
      params.set("appln", value);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={selectedAppln} onValueChange={handleChange}>
      <SelectTrigger className="p-2 w-full text-xs">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="text-xs">
          <SelectLabel className="font-bold">Application Types</SelectLabel>
          <SelectItem value="all" className="text-[calc(xs-3px)]">
            All Applications
          </SelectItem>
          {filterOptions.map((option) => (
            <SelectItem
              className="text-[calc(xs-3px)]"
              key={option}
              value={option}
            >
              {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
