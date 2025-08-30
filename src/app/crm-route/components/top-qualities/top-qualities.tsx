import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table2Icon } from "lucide-react";
import { TopQualitiesProps } from "./types";

const TopQualities = ({ qualities }: TopQualitiesProps) => {
  const total = { qty: 54.96, rev: 1.63, arv: 296 };

  return (
    <div className="gap-1">
      <div className="overflow-hidden border border-border rounded-lg">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-muted/40">
          <Table2Icon className="size-4 text-primary" />
          <span className="text-xs font-semibold tracking-wide text-foreground">
            Top 15 Quality-Wise Sales – Q2
          </span>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-[11px] text-primary-foreground">
              <TableHead className="w-[40%] p-1 text-left">Quality</TableHead>
              <TableHead className="w-[20%] p-1 text-right">Qty (K)</TableHead>
              <TableHead className="w-[20%] p-1 text-right">Rev (Cr)</TableHead>
              <TableHead className="w-[20%] p-1 text-right">ARV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualities.length > 0 ? (
              qualities.map((q) => (
                <TableRow
                  className="border border-border text-[11px]"
                  key={q.quality}
                >
                  <TableCell className="p-1 border-r border-border">
                    {q.quality}
                  </TableCell>
                  <TableCell className="p-1 border-r border-border text-right">
                    {q.qty.toFixed(2)}
                  </TableCell>
                  <TableCell className="p-1 border-r border-border text-right">
                    {q.rev.toFixed(2)}
                  </TableCell>
                  <TableCell className="p-1 border-r border-border text-right">
                    {Math.round(q.arv)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="p-1 text-center text-[11px]">
                  No quality data available
                </TableCell>
              </TableRow>
            )}

            {/* Total */}
            <TableRow className="bg-primary/20 text-[11px] font-bold">
              <TableCell className="p-1">TOTAL</TableCell>
              <TableCell className="p-1 text-right">
                {total.qty.toFixed(2)}
              </TableCell>
              <TableCell className="p-1 text-right">
                {total.rev.toFixed(2)}
              </TableCell>
              <TableCell className="p-1 text-right">{total.arv}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TopQualities;
