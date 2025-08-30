// New types for ZoneSaleCard
export interface ZoneMetric {
  zone: string;
  qty: number | null;
  rev: number | null;
  arv: number | null;
}

export interface ZoneSaleCardProps {
  zoneData: ZoneMetric[];
}
