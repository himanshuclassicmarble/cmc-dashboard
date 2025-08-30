"use client";

import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LGDataCardProps } from "./types";
import QuarterComponent from "./quartor-cmpt";

const QuarterTable = ({ quartorToYear }: LGDataCardProps) => {
  return (
    <div className="w-full">
      <div className="rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-[11px] text-primary-foreground">
              <TableHead className="w-[80px] p-1 text-center" scope="col">
                -
              </TableHead>
              <TableHead className="p-1 text-center" scope="col">
                Tgt.
              </TableHead>
              <TableHead className="p-1 text-center" scope="col">
                Act.
              </TableHead>
              <TableHead className="p-1 text-center" scope="col">
                Ach.
              </TableHead>
            </TableRow>
          </TableHeader>
          <QuarterComponent quartorToYear={quartorToYear} />
        </Table>
      </div>
    </div>
  );
};

export default QuarterTable;
