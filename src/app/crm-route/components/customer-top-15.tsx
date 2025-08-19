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

type CustomerMetric = {
  customer: string;
  qty: number; // Cur Qtr Qty (000)
  rev: number; // Cur Qtr Rev (Cr)
  arv: number; // ARV
};

const CustomerTop15 = () => {
  const CustomerTop15Data: CustomerMetric[] = [
    { customer: "Leofil Metals", qty: 5.75, rev: 0.18, arv: 321 },
    { customer: "Shyam Infra", qty: 5.22, rev: 0.12, arv: 225 },
    { customer: "Suprita Sura Reddy", qty: 4.28, rev: 0.25, arv: 575 },
    { customer: "Atharva Textile Market", qty: 4.27, rev: 0.1, arv: 225 },
    { customer: "Iconic Marbles", qty: 3.38, rev: 0.16, arv: 475 },
    { customer: "Vaijul Popatbhai Desai", qty: 3.31, rev: 0.08, arv: 239 },
    { customer: "Deepak Kantibhai Chauhan", qty: 3.28, rev: 0.13, arv: 382 },
    { customer: "Rahul Jain", qty: 3.13, rev: 0.07, arv: 230 },
    { customer: "Octane Fuels", qty: 3.11, rev: 0.08, arv: 254 },
    { customer: "Lakshmi Construction", qty: 2.81, rev: 0.17, arv: 591 },
    { customer: "Payal", qty: 2.73, rev: 0.05, arv: 200 },
    { customer: "Dawkar Vilas Gopinath", qty: 2.34, rev: 0.05, arv: 230 },
    { customer: "Nareshkumar Maniklal Shah", qty: 2.32, rev: 0.06, arv: 242 },
    { customer: "Jitendrakumar Maniklal Shah", qty: 2.32, rev: 0.06, arv: 242 },
    { customer: "Vaibhav Enterprises", qty: 2.01, rev: 0.1, arv: 510 },
  ];

  const total = { qty: 50.25, rev: 1.65, arv: 328 };

  return (
    <Card className="p-1 gap-1">
      <CardContent className="p-0">
        <div className=" flex flex-row gap-2 px-4 py-2 font-semibold">
          <Table2Icon className="size-6 text-primary" />
          TOP 15 CUSTOMER WISE SALES - Q2
        </div>
        {/* Table */}
        <Table className="rounded-xl">
          <TableHeader>
            <TableRow className="bg-primary text-xs text-primary-foreground">
              <TableHead className="w-[40%] whitespace-normal">
                Customer
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
            {CustomerTop15Data.map((z) => (
              <TableRow className="text-xs" key={z.customer}>
                <TableCell>{z.customer}</TableCell>
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

export default CustomerTop15;
