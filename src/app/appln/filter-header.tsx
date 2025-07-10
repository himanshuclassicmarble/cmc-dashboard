"use client";

import React from "react";
import { FilterSelect } from "./filter-select";

const FilterHeader = ({ filterOptions }: { filterOptions: string[] }) => {
  return (
    <header className="bg-card flex items-center justify-between p-1 border border-border rounded-md ">
      <FilterSelect filterOptions={filterOptions} />
    </header>
  );
};

export default FilterHeader;
