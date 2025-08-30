import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table2Icon } from "lucide-react";
import { ZoneSaleCardProps } from "./types";

const ZoneSaleCard = ({ zoneData }: ZoneSaleCardProps) => {
  const total = { qty: 82.45, rev: 3.11, arv: 377 };

  return (
    <div className="gap-1">
      <div className="overflow-hidden border border-border rounded-lg">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-muted/40">
          <Table2Icon className="size-4 text-primary" />
          <span className="text-xs font-semibold tracking-wide text-foreground">
            Zone-Wise Sales Summary – Q2
          </span>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-[11px] text-primary-foreground">
              <TableHead className="w-[40%] p-1 text-left">Zone</TableHead>
              <TableHead className="w-[20%] p-1 text-right">Qty (K)</TableHead>
              <TableHead className="w-[20%] p-1 text-right">Rev (Cr)</TableHead>
              <TableHead className="w-[20%] p-1 text-right">ARV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zoneData.length > 0 ? (
              zoneData.map((z) => (
                <TableRow className="text-[11px]" key={z.zone}>
                  <TableCell className="p-1">{z.zone}</TableCell>
                  <TableCell className="p-1 text-right">
                    {z.qty !== null ? z.qty.toFixed(2) : "_"}
                  </TableCell>
                  <TableCell className="p-1 text-right">
                    {z.rev !== null ? z.rev.toFixed(2) : "_"}
                  </TableCell>
                  <TableCell className="p-1 text-right">
                    {z.arv !== null ? Math.round(z.arv) : "_"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="p-1 text-center text-[11px]">
                  No zone data available
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

export default ZoneSaleCard;
