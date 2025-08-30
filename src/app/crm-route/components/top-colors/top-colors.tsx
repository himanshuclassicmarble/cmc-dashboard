import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { BarChart3 } from "lucide-react";
import { Fragment } from "react";
import { ColorGroup } from "./types";

interface ColorProps {
  colors: ColorGroup[];
}

// 🔹 Number formatting helper
const formatNumber = (
  value: number | undefined,
  type: "qty" | "rev" | "arv" | "percent",
) => {
  if (value === undefined || value === null || isNaN(value)) return "—";
  switch (type) {
    case "qty":
    case "rev":
      return value.toFixed(2);
    case "percent":
      return `${value.toFixed(1)}%`;
    case "arv":
      return Math.round(value).toString();
    default:
      return value.toString();
  }
};

const TopColors = ({ colors }: ColorProps) => {
  // 🔹 Grand Total Calculation
  const grandTotal = colors.reduce(
    (acc, group) => {
      const groupTotal = group.total || { qty: 0, rev: 0, perOfRev: 0, ARV: 0 };
      return {
        qty: acc.qty + groupTotal.qty,
        rev: acc.rev + groupTotal.rev,
        perOfRev: acc.perOfRev + groupTotal.perOfRev,
        ARV: acc.ARV + (groupTotal.ARV || 0),
      };
    },
    { qty: 0, rev: 0, perOfRev: 0, ARV: 0 },
  );

  return (
    <div className="gap-1">
      <div className="overflow-hidden border border-border rounded-lg">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-muted/40">
          <BarChart3 className="size-4 text-primary" />
          <span className="text-xs font-semibold tracking-wide text-foreground">
            Top 10 Color-Wise Sales – Q2
          </span>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-[11px] text-primary-foreground">
              <TableHead className="w-[25%] p-1 ">Color Group</TableHead>
              <TableHead className="w-[25%] p-1 ">Color</TableHead>
              <TableHead className="w-[15%] p-1 text-right ">Qty (K)</TableHead>
              <TableHead className="w-[15%] p-1 text-right ">
                Rev (Cr)
              </TableHead>
              <TableHead className="w-[15%] p-1 text-right ">
                % of Rev
              </TableHead>
              <TableHead className="w-[10%] p-1 text-right">ARV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colors.length > 0 ? (
              colors.map((group) => (
                <Fragment key={group.colorGroup}>
                  {/* Colors inside each group */}
                  {group.colors.map((c, idx) => (
                    <TableRow className="text-[11px]" key={c.colorName}>
                      {/* Show group name only for the first row of each group (rowspan-like effect) */}
                      {idx === 0 && (
                        <TableCell
                          rowSpan={group.colors.length + (group.total ? 1 : 0)}
                          className="p-1 font-semibold border-r border-border align-top whitespace-normal break-words max-w-[120px]"
                        >
                          {group.colorGroup}
                        </TableCell>
                      )}
                      <TableCell className="p-1 border-r border-border">
                        {c.colorName}
                      </TableCell>
                      <TableCell className="p-1 text-right border-r border-border">
                        {formatNumber(c.currQtr.qty, "qty")}
                      </TableCell>
                      <TableCell className="p-1 text-right border-r border-border">
                        {formatNumber(c.currQtr.rev, "rev")}
                      </TableCell>
                      <TableCell className="p-1 text-right border-r border-border">
                        {formatNumber(c.perOfRev, "percent")}
                      </TableCell>
                      <TableCell className="p-1 text-right">
                        {formatNumber(c.ARV, "arv")}
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Group Total */}
                  {group.total && (
                    <TableRow className="bg-muted text-[11px] font-semibold">
                      <TableCell
                        colSpan={1}
                        className="p-1 text-center border-r border-border"
                      >
                        Total
                      </TableCell>
                      <TableCell className="p-1 text-right border-r border-border">
                        {formatNumber(group.total.qty, "qty")}
                      </TableCell>
                      <TableCell className="p-1 text-right border-r border-border">
                        {formatNumber(group.total.rev, "rev")}
                      </TableCell>
                      <TableCell className="p-1 text-right border-r border-border">
                        {formatNumber(group.total.perOfRev, "percent")}
                      </TableCell>
                      <TableCell className="p-1 text-right">
                        {formatNumber(group.total.ARV, "arv")}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="p-1 text-center text-[11px]">
                  No data available
                </TableCell>
              </TableRow>
            )}

            {/* Grand Total */}
            <TableRow className="bg-primary/20 text-[11px] font-bold">
              <TableCell className="p-1" colSpan={2}>
                TOTAL
              </TableCell>
              <TableCell className="p-1 text-right border-r border-border">
                {formatNumber(grandTotal.qty, "qty")}
              </TableCell>
              <TableCell className="p-1 text-right border-r border-border">
                {formatNumber(grandTotal.rev, "rev")}
              </TableCell>
              <TableCell className="p-1 text-right border-r border-border">
                {formatNumber(grandTotal.perOfRev, "percent")}
              </TableCell>
              <TableCell className="p-1 text-right">
                {formatNumber(grandTotal.ARV, "arv")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TopColors;
