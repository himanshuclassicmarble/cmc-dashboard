import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { LGDataCardProps, Metric } from "./types";

// 🔹 Format values
const formatNumber = (
  value: number | undefined,
  type: "qty" | "rev" | "arv" | "percent",
) => {
  if (value === undefined || value === null || isNaN(value)) return "—";
  switch (type) {
    case "qty":
    case "rev":
    case "arv":
      return Math.round(value).toString();
    case "percent":
      return `${Math.round(value)}%`;
    default:
      return value.toString();
  }
};

// 🔹 Reusable cell
const renderCell = (
  metric: Metric | undefined,
  type: "qty" | "rev" | "arv" | "percent",
) => (
  <TableCell className="border border-border text-right text-[11px] p-1">
    {formatNumber(metric?.value, type)}
  </TableCell>
);

const QuarterComponent = ({ quartorToYear = [] }: LGDataCardProps) => {
  const renderMetricRow = (
    label: string,
    unit: string | undefined,
    tgt: Metric,
    act: Metric,
    ach: Metric | undefined,
    type: "qty" | "rev" | "arv",
  ) => (
    <TableRow className="hover:bg-muted/20 border border-border text-[11px]">
      <TableCell className="bg-primary/20 p-1 text-center font-semibold">
        {label}{" "}
        {unit && (
          <span className="font-light text-muted-foreground">({unit})</span>
        )}
      </TableCell>

      {renderCell(tgt, type)}
      {renderCell(act, type)}
      {ach ? (
        renderCell(ach, "percent")
      ) : (
        <TableCell className="border-r border-border text-right text-[11px] text-muted-foreground p-1">
          —
        </TableCell>
      )}
    </TableRow>
  );

  return (
    <TableBody>
      {quartorToYear.length > 0 ? (
        quartorToYear.map((data, index) => (
          <React.Fragment key={`${data.table}-${index}`}>
            {/* Quarter Header Row */}
            <TableRow>
              <TableCell
                colSpan={4}
                className="p-1 text-[11px] font-semibold text-center bg-primary/20"
              >
                {data.table} Performance
              </TableCell>
            </TableRow>

            {renderMetricRow(
              "Qty.",
              "K",
              data.tgt_qty,
              data.act_qty,
              data.qty_ach,
              "qty",
            )}
            {renderMetricRow(
              "Rev.",
              "Cr.",
              data.tgt_rev,
              data.act_rev,
              data.rev_ach,
              "rev",
            )}
            {renderMetricRow(
              "ARV.",
              undefined,
              data.tgt_avg,
              data.act_avg,
              undefined,
              "arv",
            )}
          </React.Fragment>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="p-1 text-center text-[11px]">
            No quarterly data available
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default QuarterComponent;
