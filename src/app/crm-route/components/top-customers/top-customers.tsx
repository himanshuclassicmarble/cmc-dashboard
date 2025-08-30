import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table2Icon } from "lucide-react";
import { CustomerMetric } from "./types";

interface CustomerProps {
  customers: CustomerMetric[];
}

const TopCustomers = ({ customers }: CustomerProps) => {
  // TODO: Replace this data with your defined data.
  const total = { qty: 50.25, rev: 1.65, arv: 328 };

  // Formatters
  const formatDecimal = (val: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  const formatInteger = (val: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="gap-1">
      <div className="overflow-hidden border border-border rounded-lg">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-muted/40">
          <Table2Icon className="size-4 text-primary" />
          <span className="text-xs font-semibold tracking-wide text-foreground">
            Top 15 Customer-Wise Sales – Q2
          </span>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-primary text-[11px] text-primary-foreground">
              <TableHead className="w-[40%] p-1 text-left">Customer</TableHead>
              <TableHead className="w-[20%] p-1 text-right">Qty (K)</TableHead>
              <TableHead className="w-[20%] p-1 text-right">Rev (Cr)</TableHead>
              <TableHead className="w-[20%] p-1 text-right">ARV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((c) => (
              <TableRow
                className="border border-border text-[11px]"
                key={c.customer}
              >
                <TableCell className="p-1 border-r border-border">
                  {c.customer}
                </TableCell>
                <TableCell className="p-1 border-r border-border text-right">
                  {formatDecimal(c.qty)}
                </TableCell>
                <TableCell className="p-1 border-r border-border text-right ">
                  {formatDecimal(c.rev)}
                </TableCell>
                <TableCell className="p-1 border-r border-border text-right">
                  {formatInteger(c.arv)}
                </TableCell>
              </TableRow>
            ))}

            {/* Total */}
            <TableRow className="bg-primary/20 text-[11px] font-bold">
              <TableCell className="p-1">TOTAL</TableCell>
              <TableCell className="p-1 text-right">
                {formatDecimal(total.qty)}
              </TableCell>
              <TableCell className="p-1 text-right">
                {formatDecimal(total.rev)}
              </TableCell>
              <TableCell className="p-1 text-right">
                {formatInteger(total.arv)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TopCustomers;
