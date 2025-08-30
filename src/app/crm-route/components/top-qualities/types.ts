// New types for QualityTop15
export interface QualityMetric {
  quality: string;
  qty: number;
  rev: number;
  arv: number;
}

export interface TopQualitiesProps {
  qualities: QualityMetric[];
}
