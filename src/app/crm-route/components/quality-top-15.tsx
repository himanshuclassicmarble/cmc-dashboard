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

const QualityTop15 = () => {
  const QualityTop15Data = [
    { quality: "COR.GRY", qty: 11.79, rev: 0.28, arv: 241 },
    { quality: "ANT.SUP.WHT", qty: 5.93, rev: 0.19, arv: 320 },
    { quality: "BLSM.PRLA", qty: 4.89, rev: 0.12, arv: 242 },
    { quality: "APOLLO.GRY", qty: 4.55, rev: 0.1, arv: 227 },
    { quality: "CARTIER.GRY", qty: 3.77, rev: 0.22, arv: 585 },
    { quality: "CRM.TRS", qty: 3.75, rev: 0.12, arv: 311 },
    { quality: "CRSTL.WHT.WARM.1", qty: 3.38, rev: 0.16, arv: 475 },
    { quality: "BURBERY.GRY", qty: 3.04, rev: 0.08, arv: 250 },
    { quality: "NEW.ANTIQ.BGE", qty: 2.73, rev: 0.05, arv: 200 },
    { quality: "GRAFITO", qty: 2.17, rev: 0.06, arv: 283 },
    { quality: "ASKA.WHT", qty: 2.01, rev: 0.1, arv: 510 },
    { quality: "MIX", qty: 2.0, rev: 0.0, arv: 10 },
    { quality: "ULTRA.WHT", qty: 1.91, rev: 0.06, arv: 300 },
    { quality: "CRM.DVA", qty: 1.53, rev: 0.04, arv: 290 },
    { quality: "BOTTOCHINO", qty: 1.5, rev: 0.03, arv: 226 },
  ];

  const total = { qty: 54.96, rev: 1.63, arv: 295.87 };

  return (
    <Card className="p-1 gap-1">
      <CardContent className="p-0">
        <div className=" flex flex-row gap-2 px-4 py-2 font-semibold">
          <Table2Icon className="size-6 text-primary" />
          TOP 15 QUALITY WISE SALES - Q2
        </div>
        {/* Table */}
        <Table className="rounded-xl">
          <TableHeader>
            <TableRow className="bg-primary text-xs text-primary-foreground">
              <TableHead className="w-[40%] whitespace-normal">
                Quality
              </TableHead>
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
            {QualityTop15Data.map((z) => (
              <TableRow className="text-xs" key={z.quality}>
                <TableCell>{z.quality}</TableCell>
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

export default QualityTop15;
