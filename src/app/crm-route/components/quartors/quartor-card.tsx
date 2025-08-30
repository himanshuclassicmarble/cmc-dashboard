import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table2Icon } from "lucide-react";
import { QuartorData, Metric } from "./types";

// 🔹 Formatting helper
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

// 🔹 Cell renderer
const renderCell = (
  metric: Metric | undefined,
  type: "qty" | "rev" | "arv" | "percent",
) => (
  <TableCell className="border border-border p-1 text-right text-[11px]">
    {formatNumber(metric?.value, type)}
  </TableCell>
);

// 🔹 Generic row renderer
const DataRow = ({
  label,
  unit,
  tgt,
  act,
  ach,
  type,
  showAch = true,
}: {
  label: string;
  unit?: string;
  tgt: Metric;
  act: Metric;
  ach?: Metric;
  type: "qty" | "rev" | "arv" | "percent";
  showAch?: boolean;
}) => (
  <TableRow className="text-[11px] border border-border">
    <TableCell className="bg-primary/20 p-1 text-center font-semibold">
      {label}{" "}
      {unit && (
        <span className="font-light text-muted-foreground">({unit})</span>
      )}
    </TableCell>
    {renderCell(tgt, type)}
    {renderCell(act, type)}
    {showAch ? (
      ach?.value !== undefined ? (
        renderCell(ach, "percent")
      ) : (
        <TableCell className="p-1 text-center text-[11px] text-muted-foreground">
          –
        </TableCell>
      )
    ) : (
      <TableCell className="p-1 text-center text-[11px] text-muted-foreground">
        –
      </TableCell>
    )}
  </TableRow>
);

interface QuartorCardProps {
  quartorData: QuartorData[];
}

const QuartorCard = ({ quartorData }: QuartorCardProps) => {
  if (!quartorData.length) {
    return (
      <div className="p-3 text-center text-[11px] text-muted-foreground">
        No quarterly data available
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {quartorData.map((data, index) => (
        <div
          key={`${data.table}-${index}`}
          className="overflow-hidden border border-border rounded-lg"
        >
          {/* Title Bar */}
          <div className="flex items-center gap-2 px-3 py-1 border-b border-border bg-muted/40">
            <Table2Icon className="size-4 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-foreground">
              {data.table}
            </span>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-primary text-[11px] text-primary-foreground">
                <TableHead className="w-[80px] p-1 text-center">-</TableHead>
                <TableHead className="p-1 text-center">Tgt.</TableHead>
                <TableHead className="p-1 text-center">Act.</TableHead>
                <TableHead className="p-1 text-center">Ach.</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <DataRow
                label="Qty."
                unit="K"
                tgt={data.tgt_qty}
                act={data.act_qty}
                ach={data.qty_ach}
                type="qty"
              />
              <DataRow
                label="Rev."
                unit="Cr."
                tgt={data.tgt_rev}
                act={data.act_rev}
                ach={data.rev_ach}
                type="rev"
              />
              <DataRow
                label="ARV."
                tgt={data.tgt_avg}
                act={data.act_avg}
                type="arv"
                showAch={false}
              />
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default QuartorCard;
