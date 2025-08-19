import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table2Icon } from "lucide-react";

const ZoneSaleCard = () => {
  const zoneData = [
    { zone: "West Zone 1", qty: 47.66, rev: 1.58, arv: 331 },
    { zone: "West Zone 2", qty: 18.33, rev: 0.47, arv: 259 },
    { zone: "South Zone", qty: 14.76, rev: 0.64, arv: 435 },
    { zone: "East Zone", qty: 1.69, rev: 0.41, arv: 2445 },
  ];

  const total = { qty: 82.45, rev: 3.11, arv: 377 };

  return (
    <Card className="p-1 gap-1">
      <CardContent className="p-0">
        <div className=" flex flex-row gap-2 px-4 py-2 font-semibold">
          <Table2Icon className="size-6 text-primary" />
          Zone Wise Sales Summary - Q2
        </div>
        {/* Table */}
        <Table className="rounded-xl">
          <TableHeader>
            <TableRow className="bg-primary text-xs text-primary-foreground">
              <TableHead className="w-[40%] whitespace-normal">Zone</TableHead>
              <TableHead className="w-[20%] whitespace-normal">
                Cur Qrtr Qty (000)
              </TableHead>
              <TableHead className="w-[20%] whitespace-normal">
                Cur Qrtr Rev (Cr)
              </TableHead>
              <TableHead className="w-[20%] whitespace-normal">ARV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zoneData.map((z) => (
              <TableRow className="text-xs" key={z.zone}>
                <TableCell>{z.zone}</TableCell>
                <TableCell>{z.qty}</TableCell>
                <TableCell>{z.rev}</TableCell>
                <TableCell>{z.arv}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold text-xs bg-primary/20">
              <TableCell>Total</TableCell>
              <TableCell>{total.qty}</TableCell>
              <TableCell>{total.rev}</TableCell>
              <TableCell>{total.arv}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ZoneSaleCard;
