export type HoldSoldDataItem = {
  day: string;
  sold: number;
};

export type HoldSoldData = HoldSoldDataItem[];

export type TotalHeld = {
  holdQuantity: number;
  holdNumbers: number;
};

export type TotalSold = {
  soldQuantity: number;
  soldNumbers: number;
};
