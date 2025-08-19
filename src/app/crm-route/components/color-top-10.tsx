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
import { BarChart3 } from "lucide-react";
import { Fragment } from "react";

type ColorMetric = {
  colorName: string;
  currQtr: {
    qty: number;
    rev: number;
  };
  perOfRev: number;
  ARV: number;
};

type ColorGroup = {
  colorGroup: string;
  colors: ColorMetric[];
  total?: { qty: number; rev: number; perOfRev: number; ARV: number };
};

const ColorTop10 = () => {
  const Top10color: ColorGroup[] = [
    {
      colorGroup: "WHITE & EXOTIC",
      colors: [
        {
          colorName: "EXOTIC",
          currQtr: { qty: -0.06, rev: -0.04 },
          perOfRev: -1.41,
          ARV: 7032,
        },
        {
          colorName: "WHITE",
          currQtr: { qty: 16.13, rev: 1.12 },
          perOfRev: 35.87,
          ARV: 692,
        },
      ],
      total: { qty: 16.07, rev: 1.07, perOfRev: 34.46, ARV: 667 },
    },
    {
      colorGroup: "OTHERS",
      colors: [
        {
          colorName: "BEIGE",
          currQtr: { qty: 22.05, rev: 0.64 },
          perOfRev: 20.68,
          ARV: 292,
        },
        {
          colorName: "GREY",
          currQtr: { qty: 37.59, rev: 1.11 },
          perOfRev: 35.71,
          ARV: 296,
        },
        {
          colorName: "OTHERS",
          currQtr: { qty: 4.64, rev: 0.28 },
          perOfRev: 8.97,
          ARV: 602,
        },
      ],
      total: { qty: 64.28, rev: 2.03, perOfRev: 65.36, ARV: 316 },
    },
    {
      colorGroup: "MULTICOLOR",
      colors: [
        {
          colorName: "MULTICOLOR",
          currQtr: { qty: 2.09, rev: 0.01 },
          perOfRev: 0.18,
          ARV: 27,
        },
      ],
      total: { qty: 2.09, rev: 0.01, perOfRev: 0.18, ARV: 27 },
    },
  ];

  // Grand Total (manual)
  const grandTotal = { qty: 82.45, rev: 3.11, perOfRev: 100, ARV: 377 };

  return (
    <div className="p-1 gap-1">
      <div className="p-0">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/40 rounded-t-lg">
          <BarChart3 className="size-5 text-primary" />
          <span className="font-semibold text-base tracking-wide">
            Top 10 Color-Wise Sales – Q2
          </span>
        </div>

        {/* Table */}
        <Table className="space-y-1">
          <TableHeader>
            <TableRow className="bg-primary text-xs text-primary-foreground">
              <TableHead className="w-[30%] whitespace-normal p-1">
                Color Group
              </TableHead>
              <TableHead className="w-[20%] whitespace-normal p-1">
                Cur Qtr Qty (000)
              </TableHead>
              <TableHead className="w-[20%] whitespace-normal p-1">
                Cur Qtr Rev (Cr)
              </TableHead>
              <TableHead className="w-[20%] whitespace-normal p-1">
                % of Rev
              </TableHead>
              <TableHead className="w-[10%] whitespace-normal p-1">
                ARV
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Top10color.map((group) => (
              <Fragment key={group.colorGroup}>
                {/* Group Name */}
                <TableRow
                  key={group.colorGroup}
                  className="bg-muted/50 font-semibold text-xs p-1"
                >
                  <TableCell colSpan={5} className="p-1">
                    {group.colorGroup}
                  </TableCell>
                </TableRow>

                {/* Colors */}
                {group.colors.map((c) => (
                  <TableRow className="text-xs p-1" key={c.colorName}>
                    <TableCell className="p-1">{c.colorName}</TableCell>
                    <TableCell className="p-1">{c.currQtr.qty}</TableCell>
                    <TableCell className="p-1">{c.currQtr.rev}</TableCell>
                    <TableCell className="p-1">{c.perOfRev}%</TableCell>
                    <TableCell className="p-1">{c.ARV}</TableCell>
                  </TableRow>
                ))}

                {/* Group Total */}
                {group.total && (
                  <TableRow className="font-bold text-xs bg-muted p-1">
                    <TableCell className="p-1">
                      {group.colorGroup} - TOTAL
                    </TableCell>
                    <TableCell className="p-1">{group.total.qty}</TableCell>
                    <TableCell className="p-1">{group.total.rev}</TableCell>
                    <TableCell className="p-1">
                      {group.total.perOfRev}%
                    </TableCell>
                    <TableCell className="p-1">{group.total.ARV}</TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}

            {/* Grand Total */}
            <TableRow className="font-bold text-xs bg-primary/20 p-1">
              <TableCell className="p-1">TOTAL</TableCell>
              <TableCell className="p-1">{grandTotal.qty}</TableCell>
              <TableCell className="p-1">{grandTotal.rev}</TableCell>
              <TableCell className="p-1">{grandTotal.perOfRev}%</TableCell>
              <TableCell className="p-1">{grandTotal.ARV}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ColorTop10;
