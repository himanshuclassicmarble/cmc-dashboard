import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { LeadGeneratorData, Metric } from "../lg-data";
import { Table2Icon } from "lucide-react";

interface LGDataCardProps {
  lgData: LeadGeneratorData[];
}

const LGDataCard = ({ lgData }: LGDataCardProps) => {
  const renderCell = (metric: Metric) => (
    <TableCell className="text-center">
      {metric.value.toString()}
      {metric.unit && (
        <span className="ml-1 text-xs text-muted-foreground">
          {metric.unit}
        </span>
      )}
    </TableCell>
  );

  return (
    <div className="w-full space-y-4">
      {lgData.map((data) => (
        <Card key={data.table} className="overflow-hidden p-1 gap-1">
          {/* Header */}
          <div className="flex flex-row items-center gap-2 px-4 py-2 font-semibold border-b border-border">
            <Table2Icon className="size-6 text-primary" />
            {data.table}
          </div>

          <CardContent className="p-0">
            <Table className="border border-border">
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="w-[80px]"></TableHead>
                  <TableHead className="text-center ">Tgt</TableHead>
                  <TableHead className="text-center ">Act</TableHead>
                  <TableHead className="text-center ">Ach</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Qty Row */}
                <TableRow>
                  <TableCell className="bg-primary text-center">Qty.</TableCell>
                  {renderCell(data.tgt_qty)}
                  {renderCell(data.act_qty)}
                  {renderCell(data.qty_ach)}
                </TableRow>

                {/* Rev Row */}
                <TableRow>
                  <TableCell className="bg-primary text-center">Rev.</TableCell>
                  {renderCell(data.tgt_rev)}
                  {renderCell(data.act_rev)}
                  {renderCell(data.rev_ach)}
                </TableRow>

                {/* Avg Row */}
                <TableRow>
                  <TableCell className="bg-primary text-center">Avg.</TableCell>
                  {renderCell(data.tgt_avg)}
                  {renderCell(data.act_avg)}
                  <TableCell className="text-center ">-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LGDataCard;
