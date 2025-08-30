import { ColorGroup } from "./types";

export const topColors: ColorGroup[] = [
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

// Grand Total
export const grandTotal = { qty: 82.45, rev: 3.11, perOfRev: 100, ARV: 377 };
